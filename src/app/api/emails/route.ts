import { NextResponse } from "next/server";
import  {connectToDatabase}  from "@/lib/connectToDataBase";
import AllowedEmail  from "@/models/AllowedEmails";

export const config = {
  runtime: 'nodejs', // Asegura que usa Node.js y no Edge
  maxDuration: 30,   // 30 segundos de timeout, dependiendo de tus necesidades
};

// 📌 GET: Obtener todos los correos
export async function GET() {
  try {
    await connectToDatabase();

    // Obtener todos los correos de la base de datos
    const emails = await AllowedEmail.find({}).limit(100); // Máximo 100 registros
    console.log("📌 Correos encontrados en la base de datos:", emails); // Depuración

    return NextResponse.json({
      emails: emails.map(({ email, approved, createdAt, lastLogin }) => ({ 
        email, 
        approved, 
        createdAt, 
        lastLogin 
      })),
    });
  } catch (error) {
    console.error("❌ Error al obtener los correos:", error);
    return NextResponse.json(
      { error: "Error al obtener los correos" },
      { status: 500 }
    );
  }
}

// 📌 POST: Agregar un correo con timestamp automático
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "El email es requerido" }, { status: 400 });
    }

    const newEmail = new AllowedEmail({ email });
    await newEmail.save();

    return NextResponse.json({ message: "Correo agregado con éxito" });
  } catch (error) {
    console.error("❌ Error:", error);
  
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

