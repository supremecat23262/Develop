"use client";

import { useEffect, useState } from "react";
import WaitingListTable, { WaitingUser } from "./WaitingListTable";

export default function WaitingListManager() {
  const [waitingUsers, setWaitingUsers] = useState<WaitingUser[]>([]);

  // Función para obtener la lista de correos del endpoint
  const fetchWaitingList = async () => {
    try {
      const res = await fetch("/api/add-email", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const emails: string[] = data.emails || [];
        // Convertir los correos a un formato de usuarios
        const users: WaitingUser[] = emails.map((email) => ({
          email,
          approved: false, // Puedes agregar la lógica de aprobación aquí
        }));
        setWaitingUsers(users);
      }
    } catch (error) {
      console.error("Error al obtener la lista de espera:", error);
    }
  };

  // Llama al fetch al montar el componente
  useEffect(() => {
    fetchWaitingList();
  }, []);

  // Event handler para actualizar el estado de un correo
  const handleUpdate = async (email: string, approved: boolean) => {
    try {
      const res = await fetch("/api/waitingList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, approved }),
      });
      if (res.ok) {
        fetchWaitingList();
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  return (
    <div>
      <WaitingListTable users={waitingUsers} onUpdate={handleUpdate} />
    </div>
  );
}
