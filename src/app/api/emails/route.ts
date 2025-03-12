import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectToDataBase";
import AllowedEmail from "@/models/AllowedEmails";

export const config = {
  runtime: "nodejs",
  maxDuration: 30, // Reducido a 30 segundos
};

// Definir la interfaz para los emails
interface EmailDocument {
  email: string;
  approved: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

// 📌 GET: Obtener todos los correos con manejo de errores mejorado
export async function GET() {
  try {
    const start = Date.now();
    
    // Timeout para toda la operación
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout al procesar la solicitud")), 25000)
    );
    
    // Conexión con timeout - la conexión se establece pero no necesitamos guardarla en una variable
    await Promise.race([
      connectToDatabase(),
      timeout
    ]);
    
    console.log(`📌 Conexión establecida en ${Date.now() - start} ms`);
    
    // Consulta optimizada: proyección para reducir datos y uso de índices
    const emails = await Promise.race([
      AllowedEmail.find({}, 'email approved createdAt lastLogin -_id')
        .lean() // Usa .lean() para queries de solo lectura (más eficiente)
        .limit(100)
        .maxTimeMS(5000),
      timeout
    ]) as EmailDocument[];
    
    console.log(`📌 Consulta ejecutada en ${Date.now() - start} ms total`);
    
    return NextResponse.json({
      emails: emails.map(({ email, approved, createdAt, lastLogin }) => ({
        email,
        approved,
        createdAt,
        lastLogin,
      })),
      time: Date.now() - start
    });
  } catch (error) {
    console.error("❌ Error al obtener los correos:", error);
    
    // Mensaje de error específico según el tipo de error
    let errorMessage = "Error al obtener los correos";
    let status = 500;
    
    if (error instanceof Error) {
      if (error.message.includes("Timeout")) {
        errorMessage = "La solicitud tardó demasiado tiempo en completarse";
        status = 504; // Gateway Timeout
      }
    }
    
    return NextResponse.json({ error: errorMessage }, { status });
  }
}

// 📌 POST: Agregar un correo con verificación de duplicados
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: "El email es requerido" },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Verificar primero si el email ya existe
    const existingEmail = await AllowedEmail.findOne({ email }).lean();
    if (existingEmail) {
      return NextResponse.json(
        { error: "El correo electrónico ya existe" },
        { status: 409 }
      );
    }
    
    // Usar create en lugar de new + save (más eficiente)
    await AllowedEmail.create({ email });
    
    return NextResponse.json({ message: "Correo agregado con éxito" });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}