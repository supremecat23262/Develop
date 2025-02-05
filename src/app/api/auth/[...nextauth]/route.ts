import NextAuth, {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async redirect({baseUrl}) {
            return `${baseUrl}/dashboard`;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};