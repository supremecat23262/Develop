"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <div>
                    <p>Hola, {session.user?.name}</p>
                    <button onClick={() => signOut()}>Cerrar sesión</button>
                </div>
            ) : (
                <button onClick={() => signIn("google")}>Iniciar sesión con Google</button>
            )}
        </div>
    );
}
