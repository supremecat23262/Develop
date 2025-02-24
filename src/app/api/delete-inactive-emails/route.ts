import { NextResponse } from "next/server";
import  {connectToDatabase}  from "@/lib/connectToDataBase";
import AllowedEmail from "@/models/AllowedEmails";
//90 dias
// 📌 DELETE: Eliminar correos inactivos
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { days } = await req.json(); // Número de días sin conexión
    if (!days) {
      return NextResponse.json({ error: "Se requiere un número de días" }, { status: 400 });
    }

    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - days); // Fecha límite

    // 📌 Eliminar correos que no han iniciado sesión desde la fecha límite
    const result = await AllowedEmail.deleteMany({
      lastLogin: { $lt: thresholdDate }
    });

    return NextResponse.json({
      message: "Correos eliminados con éxito",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error("❌ Error al eliminar correos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
