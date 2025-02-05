import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next"; // Tipos correctos para las rutas API

// Aquí se definen las opciones de autenticación
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async redirect({ baseUrl }) {
            return `${baseUrl}/dashboard`; // Redirección después de iniciar sesión
        },
    },
};

// Handler para la ruta GET
export const GET = (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOptions); // Pasa req y res junto con authOptions
};

// Handler para la ruta POST
export const POST = (req: NextApiRequest, res: NextApiResponse) => {
    return NextAuth(req, res, authOptions); // Pasa req y res junto con authOptions
};
