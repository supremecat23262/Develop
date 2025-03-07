// src/app/api/ingresos-egresos/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Simulando ingresos y egresos
  const datos = [
    { id: 1, tipo: "Ingreso", monto: 5000 },
    { id: 2, tipo: "Egreso", monto: 2000 },
  ];

  return NextResponse.json(datos);
}
