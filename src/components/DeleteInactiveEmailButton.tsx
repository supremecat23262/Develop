"use client";

import { useState } from "react";

const DeleteInactiveEmailsButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const deleteInactiveEmails = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/delete-inactive-emails", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days: 90 }), // Cambia el número de días según tu necesidad
    });

    const data = await response.json();
    setMessage(data.message || "Ocurrió un error");
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={deleteInactiveEmails}
        disabled={loading}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Eliminando..." : "Eliminar correos inactivos"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteInactiveEmailsButton;
