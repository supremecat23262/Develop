import mongoose from "mongoose";

// Definir la interfaz para el caché
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Definir una interfaz específica para extender el objeto global
interface CustomGlobal {
  mongooseCache?: MongooseCache;
}

// Definir un objeto global para el caché con un tipo específico
const globalCache = global as unknown as CustomGlobal;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Falta la variable de entorno MONGODB_URI");
}

// Inicializar el caché solo una vez
if (!globalCache.mongooseCache) {
  globalCache.mongooseCache = { conn: null, promise: null };
}

const cached = globalCache.mongooseCache;

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

const disconnectFromDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log("🔌 Desconectado de MongoDB");
  }
};

export { connectToDatabase, disconnectFromDatabase };

