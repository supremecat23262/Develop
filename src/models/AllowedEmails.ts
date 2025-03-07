import mongoose from "mongoose";

const AllowedEmailSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/.+@.+\..+/, 'Por favor ingresa un correo electrónico válido'] // Expresión regular más general
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Fecha de creación por defecto
  },
  lastLogin: { 
    type: Date // Fecha de última conexión
  },
  approved: { 
    type: Boolean, 
    default: false // Estado de aprobación (por defecto: pendiente)
  }
});


export default mongoose.models.AllowedEmail || mongoose.model("AllowedEmail", AllowedEmailSchema);
