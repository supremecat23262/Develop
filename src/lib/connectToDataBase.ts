import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Falta la variable de entorno MONGODB_URI");
}

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

export { connectToDatabase };
