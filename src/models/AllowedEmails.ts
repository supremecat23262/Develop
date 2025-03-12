import mongoose, { Schema, Document } from "mongoose";

// Definir la interfaz para el documento
export interface IAllowedEmail extends Document {
  email: string;
  approved: boolean;
  createdAt: Date;
  lastLogin: Date | null;
}

// Definir el esquema con índices y validaciones
const AllowedEmailSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, "El email es requerido"],
    unique: true,
    lowercase: true,
    trim: true,
    index: true // Crear índice para optimizar búsquedas
  },
  approved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true // Índice para ordenar por fecha
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true, // Añade createdAt y updatedAt 
  collection: 'allowedemails' // Nombre explícito de la colección
});

// Crear índice compuesto para consultas comunes
AllowedEmailSchema.index({ approved: 1, createdAt: -1 });

// Prevenir la recreación del modelo en desarrollo (hot reload)
const AllowedEmail = mongoose.models.AllowedEmail || 
  mongoose.model<IAllowedEmail>("AllowedEmail", AllowedEmailSchema);

export default AllowedEmail;