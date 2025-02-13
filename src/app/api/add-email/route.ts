import { NextResponse } from "next/server";
import mongoose from "mongoose";

// URL de conexión a MongoDB desde las variables de entorno
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Falta la variable de entorno MONGODB_URI");
}

// Conectar a MongoDB (Reutiliza la conexión para evitar múltiples conexiones)
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Ya está conectado
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw error;
  }
};

// Definir el esquema y modelo de la colección
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const AllowedEmail =
  mongoose.models.AllowedEmail || mongoose.model("AllowedEmail", emailSchema);

// Endpoint GET para obtener todos los correos
export async function GET() {
  try {
    await connectToDatabase();

    // Obtener todos los correos de la base de datos
    const emails = await AllowedEmail.find({});
    const emailList = emails.map((emailDoc) => emailDoc.email);

    return NextResponse.json({ emails: emailList });
  } catch (error) {
    console.error("❌ Error al obtener los correos:", error);
    return NextResponse.json(
      { error: "Error al obtener los correos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "El email es requerido" }, { status: 400 });
    }

    // Intentar insertar el correo en la base de datos
    const newEmail = new AllowedEmail({ email });
    await newEmail.save();

    return NextResponse.json({ message: "Correo agregado con éxito" });
  } catch (error: unknown) {
    console.error("❌ Error al agregar el correo:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
