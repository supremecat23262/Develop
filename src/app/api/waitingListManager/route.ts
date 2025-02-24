// src/app/api/waitingListManager/route.ts
import AllowedEmail from "@/models/AllowedEmails";
import { connectToDatabase } from "@/lib/connectToDataBase";
import { NextResponse } from "next/server"; 

export const config = {
  runtime: 'nodejs', // Asegura que usa Node.js y no Edge
  maxDuration: 30,   // 30 segundos de timeout, dependiendo de tus necesidades
};

export async function POST(req: Request) {
  // Conectar a la base de datos
  await connectToDatabase();
  console.log("Solicitud a /api/waitingListManager recibida");

  try {
    const body = await req.json(); // Obtener el cuerpo de la solicitud
    const { email, approved, deleteAfterApproval } = body; // Incluye la opción deleteAfterApproval

    if (approved) {
      // Si el estado es "aprobado", actualiza el correo
      const updatedEmail = await AllowedEmail.findOneAndUpdate(
        { email },
        { approved },
        { new: true }
      );

      if (updatedEmail) {
        // Si deleteAfterApproval es verdadero, se elimina después de aprobar
        if (deleteAfterApproval) {
          const deletedEmail = await AllowedEmail.findOneAndDelete({ email });

          if (deletedEmail) {
            return NextResponse.json(
              { message: "Correo aprobado y eliminado", email: deletedEmail },
              { status: 200 }
            );
          } else {
            return NextResponse.json(
              { message: "Error al eliminar correo después de aprobación" },
              { status: 500 }
            );
          }
        }
        
        return NextResponse.json(
          { message: "Correo aprobado", email: updatedEmail },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Correo no encontrado" },
          { status: 404 }
        );
      }
    } else {
      // Si el estado es "no aprobado", elimina el correo
      const deletedEmail = await AllowedEmail.findOneAndDelete({ email });

      if (deletedEmail) {
        return NextResponse.json(
          { message: "Correo eliminado", email: deletedEmail },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Correo no encontrado para eliminar" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    // Respuesta en caso de error
    return NextResponse.json(
      { message: "Error al actualizar", error },
      { status: 500 }
    );
  }
}
