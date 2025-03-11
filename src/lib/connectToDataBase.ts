import mongoose from "mongoose";

// Definir la interfaz para el caché
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

interface CustomGlobal {
  mongooseCache?: MongooseCache;
}

const globalCache = global as unknown as CustomGlobal;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Falta la variable de entorno MONGODB_URI");
}

if (!globalCache.mongooseCache) {
  globalCache.mongooseCache = { conn: null, promise: null };
}

const cached = globalCache.mongooseCache;

const connectToDatabase = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log("✅ Reutilizando conexión existente");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("📡 Estableciendo nueva conexión");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "nombre_de_tu_bd",
        bufferCommands: false,
        connectTimeoutMS: 30000, // 30 segundos de timeout
      })
      .then((mongoose) => {
        console.log("✅ Conectado a MongoDB");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Error al conectar a MongoDB:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export { connectToDatabase };
