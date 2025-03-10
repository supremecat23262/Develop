import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, approved } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email es requerido" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000, // 10 segundos de timeout
    });

    const subject = approved ? "Solicitud Aprobada" : "Solicitud Rechazada";
    const text = approved
      ? "¡Felicidades! Su solicitud ha sido aprobada."
      : "Lamentablemente, su solicitud ha sido rechazada.";

    const info = await transporter.sendMail({
      from: `"No Reply" <mario@steamhub.com.mx>`,
      to: email,
      subject,
      text,
    });

    console.log("Correo enviado:", info.messageId);
    return NextResponse.json({ message: "Correo enviado exitosamente" });
  } catch (error: unknown) {
    let errorMessage = "Error desconocido";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error al enviar el correo:", errorMessage);
    return NextResponse.json({ message: `Error: ${errorMessage}` }, { status: 500 });
  }
}
