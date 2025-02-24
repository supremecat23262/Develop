import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Falta la variable de entorno MONGODB_URI");
}

let cached = globalThis.mongoose || { conn: null, promise: null };

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
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export { connectToDatabase };
