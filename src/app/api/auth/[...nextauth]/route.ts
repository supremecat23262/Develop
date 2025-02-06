import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

// Configuración de autenticación
const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl + "/dashboard";
        },
    },
};

// Manejo de rutas API en Next.js con App Router (Next.js 14)
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
