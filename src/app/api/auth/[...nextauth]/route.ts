import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub; // Agregar ID del usuario a la sesión
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
        },
    },
    pages: {
        signIn: "/auth/signin", // Personaliza la página de inicio de sesión si la tienes
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
