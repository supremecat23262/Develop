"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => signOut()}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition duration-200"
      >
        Cerrar sesión
      </button>
      <p className="mt-2 text-gray-600 text-xs italic">
        ¿Listo para salir?
      </p>
    </div>
  );
}
