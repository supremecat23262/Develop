"use client";

import GoogleButton from "@/components/GoogleButton";


export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-slate-200 flex justify-center items-center">
        <div className="flex items-center flex-col max-w-xl px-16 py-4 rounded-md bg-white">
          <h1 className="text-2xl font-600 text-center">Google Auth</h1>
          <hr className="w-full my-8"/>
          <GoogleButton/>
        </div>
      </div>
    </main>
  );
}