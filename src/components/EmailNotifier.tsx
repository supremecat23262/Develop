"use client";

import { useState } from "react";

export default function EmailNotifier() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("approved"); // "approved" o "rejected"
  const [message, setMessage] = useState("");

  const handleNotify = async () => {
    try {
      const res = await fetch("/api/notifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, approved: status === "approved" }),
      });
      if (res.ok) {
        setMessage("Notificación enviada exitosamente.");
      } else {
        setMessage("Error al enviar la notificación.");
      }
    } catch (error) {
      console.error("Error al enviar notificación:", error);
      setMessage("Error al enviar la notificación.");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2">Notificar al correo</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="email"
          placeholder="Ingrese el correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-auto"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="approved">Aprobada</option>
          <option value="rejected">Rechazada</option>
        </select>
        <button
          onClick={handleNotify}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Enviar Notificación
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
