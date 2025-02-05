"use client";

import { signIn } from "next-auth/react";

export default function GoogleButton(){
    return (
        <button
        className="border border-slate-300 rounded px-5 py-4 flex items-center"
        onClick={() => signIn("google")}
        >
        Ingresar con Google                
        </button>
    );
}