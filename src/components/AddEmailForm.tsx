"use client";

import { useState } from "react";

export default function AddEmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    // Validación: el correo es obligatorio
    if (!email) {
      setError("El correo electrónico es obligatorio.");
      return;
    }

    // Validación: el correo debe tener el dominio @steamhub.com.mx
    if (!email.endsWith("@steamhub.com.mx")) {
      setError("El correo debe ser del dominio @steamhub.com.mx.");
      return;
    }

    // (Opcional) Validación adicional del formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("El correo no tiene un formato válido.");
      return;
    }

    try {
      const res = await fetch("/api/add-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setEmail(""); // Limpiar el campo tras el envío correcto
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Agregar Correo Electrónico</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Agregar
        </button>
      </form>

      {error && <p className="mt-2 text-red-500">{error}</p>}
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
}
