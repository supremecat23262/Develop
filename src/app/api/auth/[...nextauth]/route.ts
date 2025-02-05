import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Exportando como GET y POST para manejar las solicitudes HTTP correctamente
export const GET = (req, res) => {
    return NextAuth(req, res, {
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
    });
};

export const POST = (req, res) => {
    return NextAuth(req, res, {
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
    });
};
