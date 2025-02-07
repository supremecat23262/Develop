"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center space-y-4">
      {session ? (
        <div className="flex flex-col items-center space-y-2">
          <p className="text-lg font-medium text-gray-800">
            ¡Bienvenido, {session.user?.name}!
          </p>
          <button
            onClick={() => signOut()}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 transition duration-200"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-green-700 transition duration-200"
        >
          Iniciar sesión con Google
        </button>
      )}
    </div>
  );
}
