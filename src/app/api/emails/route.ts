import { NextResponse } from "next/server";
import  {connectToDatabase}  from "@/lib/connectToDataBase";
import AllowedEmail from "@/models/AllowedEmails";

export const config = {
  runtime: "nodejs",
  maxDuration: 60, // Aumentar a 60 segundos
};

// 📌 GET: Obtener todos los correos
export async function GET() {
  try {
    const start = Date.now();
    await connectToDatabase();
    console.log(`📌 Conexión establecida en ${Date.now() - start} ms`);

    const emails = await AllowedEmail.find({})
      .limit(100)
      .maxTimeMS(5000); // Límite de 5 segundos para evitar timeout

    console.log(`📌 Consulta ejecutada en ${Date.now() - start} ms`);

    return NextResponse.json({
      emails: emails.map(({ email, approved, createdAt, lastLogin }) => ({
        email,
        approved,
        createdAt,
        lastLogin,
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
      return NextResponse.json(
        { error: "El email es requerido" },
        { status: 400 }
      );
    }

    const newEmail = new AllowedEmail({ email });
    await newEmail.save();

    return NextResponse.json({ message: "Correo agregado con éxito" });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 }
    );
  }
}
