"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton(){
    return (
        <button
        type="button"
        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semi"
        onClick={() => signOut()}
        >
        Salir                
        </button>
    );
}