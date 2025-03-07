// src/pages/api/ingresos-egresos.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Simulando ingresos y egresos
    const datos = [
      { id: 1, tipo: "Ingreso", monto: 5000 },
      { id: 2, tipo: "Egreso", monto: 2000 },
    ];
    res.status(200).json(datos);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
