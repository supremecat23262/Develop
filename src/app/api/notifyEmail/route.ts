import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const config = {
  runtime: "nodejs",
  maxDuration: 25, // Reducido para evitar tiempos de espera excesivos
};

export async function POST(req: Request) {
  try {
    const { email, approved } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email es requerido" }, { status: 400 });
    }

    // Verificar las variables de entorno
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("❌ Faltan variables de entorno SMTP");
      return NextResponse.json(
        { message: "Error de configuración del servidor de correo" }, 
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Configuración mejorada de timeouts
      connectionTimeout: 10000, // 10 segundos para conexión
      socketTimeout: 15000,     // 15 segundos para operaciones socket
      greetingTimeout: 10000,   // 10 segundos para saludo
      pool: true,               // Usar pool de conexiones
      maxConnections: 5,        // Máximo 5 conexiones simultáneas
    });

    const subject = approved ? "Solicitud Aprobada" : "Solicitud Rechazada";
    const text = approved
      ? "¡Felicidades! Su solicitud ha sido aprobada."
      : "Lamentablemente, su solicitud ha sido rechazada.";

    // Agregar timeout a la operación de envío de correo
    const sendMailPromise = transporter.sendMail({
      from: `"No Reply" <mario@steamhub.com.mx>`,
      to: email,
      subject,
      text,
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout al enviar el correo")), 20000)
    );

    // Ejecutar con timeout
    const info = await Promise.race([sendMailPromise, timeoutPromise]);

    console.log("Correo enviado:", info.messageId);
    return NextResponse.json({ message: "Correo enviado exitosamente" });
  } catch (error: unknown) {
    let errorMessage = "Error desconocido";
    let status = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Mensajes de error específicos según el problema
      if (errorMessage.includes("Timeout")) {
        status = 504;
        errorMessage = "El servidor de correo no respondió a tiempo";
      } else if (errorMessage.includes("authentication")) {
        errorMessage = "Error de autenticación con el servidor de correo";
      } else if (errorMessage.includes("connection")) {
        errorMessage = "No se pudo conectar al servidor de correo";
      }
    }

    console.error("Error al enviar el correo:", errorMessage);
    return NextResponse.json({ message: `Error: ${errorMessage}` }, { status });
  }
}