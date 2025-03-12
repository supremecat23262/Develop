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

/**
 * Conexión optimizada a MongoDB con caché de conexión
 */
const connectToDatabase = async (): Promise<typeof mongoose> => {
  // Si ya tenemos una conexión activa y lista, la reutilizamos
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Si hay un error con la conexión anterior, la resetea
  if (mongoose.connection.readyState === 2) {
    console.log("🔄 Conexión en progreso, esperando...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return connectToDatabase(); // Intenta de nuevo
  }

  if (mongoose.connection.readyState === 3) {
    console.log("🔄 Desconectando conexión anterior...");
    await mongoose.connection.close();
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const connectionOptions = {
      dbName: "nombre_de_tu_bd",
      bufferCommands: false,
      connectTimeoutMS: 10000, // 10 segundos de timeout
      socketTimeoutMS: 45000,   // 45 segundos para operaciones socket
      serverSelectionTimeoutMS: 10000, // 10 segundos para selección de servidor
      maxPoolSize: 10, // Incrementa el pool de conexiones
      minPoolSize: 3  // Mantiene un mínimo de conexiones abiertas
    };

    console.log("📡 Estableciendo nueva conexión");
    cached.promise = mongoose
      .connect(MONGODB_URI, connectionOptions)
      .then((mongoose) => {
        console.log("✅ Conectado a MongoDB");
        
        // Configurar índices para optimizar búsquedas
        mongoose.connection.once('open', async () => {
          try {
            // Este código se ejecutará solo cuando la conexión esté abierta
            // Usamos el modelo directamente en lugar de manipular la colección
            // No es necesario verificar si la colección existe, Mongoose la creará si hace falta
            const AllowedEmail = mongoose.models.AllowedEmail;
            
            if (AllowedEmail) {
              // Verificar si ya existen los índices necesarios
              const modelIndexes = AllowedEmail.schema.indexes();
              const hasEmailIndex = modelIndexes.some(([fields]) => fields.email === 1);
              
              if (!hasEmailIndex) {
                // Crear índice si no existe
                AllowedEmail.schema.index({ email: 1 }, { unique: true, background: true });
                // Sincronizar los índices con MongoDB
                await AllowedEmail.syncIndexes();
                console.log("✅ Índice creado para email en allowedemails");
              }
            } else {
              console.log("ℹ️ Modelo AllowedEmail aún no está disponible");
            }
          } catch (error) {
            console.error("⚠️ Error al crear índices:", error);
          }
        });
        
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Error al conectar a MongoDB:", error);
        cached.promise = null; // Resetear la promesa para permitir nuevos intentos
        throw error;
      });
  }

  try {
    cached.conn = await Promise.race([
      cached.promise,
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error("Timeout al conectar a MongoDB")), 15000)
      )
    ]);
    return cached.conn;
  } catch (error) {
    console.error("⏱️ Timeout o error en la conexión:", error);
    cached.promise = null;
    throw error;
  }
};

export { connectToDatabase };