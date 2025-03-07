// src/app/api/clientes/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Simulando datos de clientes (puedes conectar con una base de datos)
  const clientes = [
    { id: 1, nombre: "Cliente 1", email: "cliente1@example.com" },
    { id: 2, nombre: "Cliente 2", email: "cliente2@example.com" },
  ];

  return NextResponse.json(clientes);
}
