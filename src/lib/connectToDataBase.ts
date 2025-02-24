import mongoose from "mongoose";

// Define una interfaz para el tipo de la caché de mongoose
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extiende el tipo global para incluir nuestra propiedad mongoose
declare global {
  const mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Falta la variable de entorno MONGODB_URI");
}

// Inicializa la caché global si no existe
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

// Usa la caché global
const cached = global.mongoose as MongooseCache;

const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "nombre_de_tu_bd",
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("✅ Conectado a MongoDB");
      return mongoose;
    }).catch((error) => {
      console.error("❌ Error al conectar a MongoDB:", error);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export { connectToDatabase };