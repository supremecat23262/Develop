// app/page.tsx (Home Page en Next.js con App Router)
"use client";

import GoogleButton from "@/components/GoogleButton";
import Image from 'next/image'; // Importar el componente Image

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('/backGround-Image.png')" }}>
      <div className="flex items-center flex-col max-w-xl px-16 py-4 rounded-md bg-white shadow-lg">
        <Image className="w-36 h-auto" src="/logo.png" alt="logo imagen" width={144} height={144} />
        <h1 className="mb-3 text-gray-500 opacity-50 font-bold">Ingresa ahora</h1>
        <GoogleButton />
      </div>
    </main>
  );
}
