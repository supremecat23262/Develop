import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
            return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Asegura la encriptación de sesiones
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
