import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Si ya está conectado, no reconectar
  }

  try {
    // Asegúrate de que tu URI esté correctamente configurada en .env
    await mongoose.connect(process.env.MONGODB_URI!); // Conecta sin las opciones obsoletas
    console.log("✅ Conectado a MongoDB correctamente");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB", error);
    throw error;
  }
};
