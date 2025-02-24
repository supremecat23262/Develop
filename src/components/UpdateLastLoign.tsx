"use client"; // Indicamos que este archivo es un componente de cliente

import { useEffect } from "react";

const UpdateLastLogin = ({ email }: { email?: string }) => {
  useEffect(() => {
    const updateLastLogin = async () => {
      if (!email) return;
      await fetch("/api/update-login", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    };

    updateLastLogin();
  }, [email]);

  return null; // No renderiza nada
};

export default UpdateLastLogin;
