// app/api/update-login/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/connectToDataBase";
import AllowedEmail from "@/models/AllowedEmails";

export const config = {
  runtime: "nodejs",
  maxDuration: 20, // Reducido a 20 segundos es suficiente
};

// 📌 PATCH: Actualizar última conexión del usuario con manejo de errores mejorado
export async function PATCH(req: Request) {
  try {
    // Establecemos un tiempo límite para la operación completa
    const operationPromise = async () => {
      // Extraemos el email desde el cuerpo de la solicitud
      const { email } = await req.json();

      if (!email) {
        return NextResponse.json({ error: "El email es requerido" }, { status: 400 });
      }

      // Conexión a la base de datos
      await connectToDatabase();

      // Optimización: usar updateOne en lugar de findOneAndUpdate cuando no necesitas el documento actualizado
      const result = await AllowedEmail.updateOne(
        { email },
        { $set: { lastLogin: new Date() } }
      ).maxTimeMS(5000);

      if (result.matchedCount === 0) {
        console.log(`⚠️ No se encontró el email: ${email}`);
        return NextResponse.json({ error: "El email no existe" }, { status: 404 });
      }

      return NextResponse.json({
        message: "Última conexión actualizada",
        lastLogin: new Date()
      });
    };

    // Crear un timeout para toda la operación
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("La operación ha excedido el tiempo límite")), 15000)
    );

    // Ejecutar con tiempo límite
    return await Promise.race([operationPromise(), timeoutPromise]);
  } catch (error) {
    console.error("❌ Error al actualizar la última conexión:", error);
    
    let errorMessage = "Error interno del servidor";
    let status = 500;
    
    if (error instanceof Error) {
      if (error.message.includes("tiempo límite")) {
        errorMessage = "La operación tardó demasiado en completarse";
        status = 504;
      } else if (error.name === 'SyntaxError') {
        errorMessage = "Error en el formato de los datos enviados";
        status = 400;
      }
    }
    
    return NextResponse.json({ error: errorMessage }, { status });
  }
}