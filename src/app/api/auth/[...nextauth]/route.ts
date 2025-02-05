import NextAuth from "next-auth";
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async redirect({ baseUrl }) {
            return `${baseUrl}/dashboard`;
        },
    },
};

// Exportando como GET y POST para manejar las solicitudes HTTP correctamente
const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
