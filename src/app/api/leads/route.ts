// src/app/api/leads/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Simulando leads
  const leads = [
    { id: 1, nombre: "Lead 1", email: "lead1@example.com" },
    { id: 2, nombre: "Lead 2", email: "lead2@example.com" },
  ];

  return NextResponse.json(leads);
}
