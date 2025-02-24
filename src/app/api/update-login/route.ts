// app/api/update-login/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectToDataBase";
import AllowedEmail from "@/models/AllowedEmails";

export const config = {
  runtime: "nodejs", // Asegura que se utiliza Node.js en lugar de Edge
  maxDuration: 30, // Timeout ajustable
};

// 📌 PATCH: Actualizar última conexión del usuario
export async function PATCH(req: Request) {
  try {
    // Conexión a la base de datos
    await connectToDatabase();

    // Extraemos el email desde el cuerpo de la solicitud
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "El email es requerido" }, { status: 400 });
    }

    // Buscamos al usuario y actualizamos su última conexión
    const updatedUser = await AllowedEmail.findOneAndUpdate(
      { email },
      { lastLogin: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "El email no existe" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Última conexión actualizada",
      lastLogin: updatedUser.lastLogin,
    });
  } catch (error) {
    console.error("❌ Error al actualizar la última conexión:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
