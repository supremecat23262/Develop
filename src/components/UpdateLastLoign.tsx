// src/components/UpdateLastLogin.tsx
"use client";

import { useEffect } from "react";

const UpdateLastLogin = ({ email }: { email?: string }) => {
  useEffect(() => {
    // Si no hay email, no hacer nada
    if (!email) return;
    
    // Flag para evitar actualizar estados si el componente se desmonta
    let isMounted = true;
    // Controller para cancelar la petición si el componente se desmonta
    const controller = new AbortController();
    
    const updateLastLogin = async () => {
      try {
        const response = await fetch("/api/update-login", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          signal: controller.signal, // Para poder cancelar la petición
          // Establecemos un timeout de 10 segundos
          cache: "no-store",
        });
        
        if (!isMounted) return;
        
        if (!response.ok) {
          // Si la respuesta no es exitosa, logueamos el error pero no interrumpimos la UI
          console.error(`Error actualizando login: ${response.status} ${response.statusText}`);
          return;
        }
        
        console.log("✅ Login actualizado correctamente");
      } catch (error) {
        // Solo logueamos si el componente sigue montado y no es una cancelación
        if (isMounted && !(error instanceof DOMException && error.name === 'AbortError')) {
          console.error("Error al actualizar última conexión:", error);
        }
      }
    };
    
    // Añadimos un pequeño retraso para asegurar que la página haya cargado completamente
    const timeoutId = setTimeout(updateLastLogin, 500);
    
    // Limpieza cuando el componente se desmonte
    return () => {
      isMounted = false;
      controller.abort(); // Cancelamos la petición pendiente
      clearTimeout(timeoutId); // Limpiamos el timeout
    };
  }, [email]); // Solo se ejecuta cuando cambia el email

  return null; // No renderiza nada
};

export default UpdateLastLogin;