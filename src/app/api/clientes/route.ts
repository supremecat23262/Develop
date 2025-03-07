// src/pages/api/clientes.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Simulando datos de clientes (puedes conectar con una base de datos)
    const clientes = [
      { id: 1, nombre: "Cliente 1", email: "cliente1@example.com" },
      { id: 2, nombre: "Cliente 2", email: "cliente2@example.com" },
    ];
    res.status(200).json(clientes);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
