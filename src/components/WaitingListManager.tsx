"use client";

import { useEffect, useState } from "react";
import WaitingListTable, { WaitingUser } from "./WaitingListTable";
import NotificationSlider from "./NotificationSlider";
import NotificationToggle from "./NotificationToggle";

export default function WaitingListManager() {
  const [waitingUsers, setWaitingUsers] = useState<WaitingUser[]>([]);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Función para enviar la notificación vía API
  const sendNotification = async (email: string, approved: boolean) => {
    try {
      const res = await fetch("/api/notifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, approved }),
      });
      if (res.ok) {
        console.log("Notificación enviada");
      } else {
        console.error("Error al enviar la notificación");
      }
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
    }
  };

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

      const text = await res.text();
      console.log("Respuesta del servidor:", text);

      if (res.ok) {
        if (notificationsEnabled) {
          await sendNotification(email, approved);
          setNotification({
            visible: true,
            message: `Notificación enviada a ${email}: ${approved ? "Aprobada" : "Rechazada"}`,
          });
        }
        fetchWaitingList(); // Recarga la lista de usuarios
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
        body: JSON.stringify({ email, approved: false }),
      });

      const text = await res.text();
      console.log("Respuesta del servidor:", text);

      if (res.ok) {
        if (notificationsEnabled) {
          await sendNotification(email, false);
          setNotification({
            visible: true,
            message: `Notificación de eliminación enviada a ${email}`,
          });
        }
        fetchWaitingList();
      } else {
        console.error("Error al eliminar el correo", text);
      }
    } catch (error) {
      console.error("Error al eliminar el correo:", error);
    }
  };

  return (
    <div>
      {/* Toggle para activar o desactivar notificaciones */}
      <NotificationToggle
        enabled={notificationsEnabled}
        onToggle={setNotificationsEnabled}
      />

      <WaitingListTable
        users={waitingUsers}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <NotificationSlider
        message={notification.message}
        visible={notification.visible}
        onClose={() => setNotification({ visible: false, message: "" })}
      />
    </div>
  );
}
