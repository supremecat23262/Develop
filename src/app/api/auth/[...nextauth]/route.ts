import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";  // Importa los tipos de Next.js

// Exportando como GET y POST para manejar las solicitudes HTTP correctamente
export const GET = (req: NextApiRequest, res: NextApiResponse) => {
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

export const POST = (req: NextApiRequest, res: NextApiResponse) => {
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
