// src/pages/api/leads.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Simulando leads
    const leads = [
      { id: 1, nombre: "Lead 1", email: "lead1@example.com" },
      { id: 2, nombre: "Lead 2", email: "lead2@example.com" },
    ];
    res.status(200).json(leads);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
