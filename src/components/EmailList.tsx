"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function EmailList() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      if (!session || !session.user || !session.accessToken) {
        console.error("⚠️ No se encontró un token de sesión válido.");
        setError("No tienes permisos para ver los correos.");
        return;
      }

      try {
        const response = await fetch("/api/add-email", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${session.accessToken}`, // Enviar el token correcto
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("❌ Error al obtener los correos:", errorData.error);
          setError(errorData.error);
          return;
        }

        const data = await response.json();
        setEmails(data.emails);
      } catch (error) {
        console.error("❌ Error en la solicitud:", error);
        setError("Error al cargar los correos.");
      }
    };

    fetchEmails();
  }, [session]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Correos</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {emails.map((email, index) => (
          <li key={index} className="border-b p-2">{email}</li>
        ))}
      </ul>
    </div>
  );
}
