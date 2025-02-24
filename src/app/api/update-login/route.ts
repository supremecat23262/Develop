import { NextResponse } from "next/server";
import  {connectToDatabase} from "@/lib/connectToDataBase";
import AllowedEmail from "@/models/AllowedEmails";

// 📌 PATCH: Actualizar última conexión del usuario
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "El email es requerido" }, { status: 400 });
    }

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
