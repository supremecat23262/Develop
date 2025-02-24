// src/components/WaitingListManager.tsx
"use client";

import { useEffect, useState } from "react";
import WaitingListTable, { WaitingUser } from "./WaitingListTable";

export default function WaitingListManager() {
  const [waitingUsers, setWaitingUsers] = useState<WaitingUser[]>([]);

  // Función para obtener la lista de correos desde el backend
  const fetchWaitingList = async () => {
    try {
      const res = await fetch("/api/emails", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const emails: { email: string; approved: boolean }[] = data.emails || [];
        setWaitingUsers(emails);
      }
    } catch (error) {
      console.error("Error al obtener la lista de espera:", error);
    }
  };

  // Llama al fetch cuando el componente se monta
  useEffect(() => {
    fetchWaitingList();
  }, []);

  // Handler para actualizar el estado de aprobación o rechazo
  const handleUpdate = async (email: string, approved: boolean) => {
    try {
      const res = await fetch("/api/waitingListManager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, approved }),
      });

      const text = await res.text(); // Obtener respuesta como texto
      console.log("Respuesta del servidor:", text);

      if (res.ok) {
        const data = JSON.parse(text); // Parsear respuesta como JSON si es válido
        console.log(data);
        fetchWaitingList(); // Vuelve a cargar la lista de usuarios después de la actualización
      } else {
        console.error("Error en la respuesta de la API", text);
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  // Handler para eliminar un correo
  const handleDelete = async (email: string) => {
    try {
      const res = await fetch("/api/waitingListManager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, approved: false }), // Enviamos el estado "rechazado" para eliminar
      });

      const text = await res.text(); // Obtener respuesta como texto
      console.log("Respuesta del servidor:", text);

      if (res.ok) {
        const data = JSON.parse(text); // Parsear respuesta como JSON si es válido
        console.log(data);
        fetchWaitingList(); // Vuelve a cargar la lista de usuarios después de la eliminación
      } else {
        console.error("Error al eliminar el correo", text);
      }
    } catch (error) {
      console.error("Error al eliminar el correo:", error);
    }
  };

  return (
    <div>
      <WaitingListTable
        users={waitingUsers}
        onUpdate={handleUpdate}
        onDelete={handleDelete} // Pasamos la función de eliminar
      />
    </div>
  );
}
