import mongoose, { Schema, Document } from "mongoose";

// Define la interfaz para el correo permitido
export interface IAllowedEmail extends Document {
  email: string;
}

// Crea el esquema para la colección allowedEmails
const AllowedEmailSchema = new Schema<IAllowedEmail>({
  email: {
    type: String,
    required: true,
    unique: true, // Evita duplicados
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valida el formato del correo
  },
});

// Define el modelo y conecta a la colección `allowedEmails` de la base de datos `email`
export default mongoose.models.AllowedEmail ||
  mongoose.model<IAllowedEmail>("AllowedEmail", AllowedEmailSchema, "allowedEmails");
