// src/components/NotificationSlider.tsx
"use client";

import { useEffect, useState } from "react";

interface NotificationSliderProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

export default function NotificationSlider({
  message,
  visible,
  onClose,
}: NotificationSliderProps) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000); // Se muestra 3 segundos
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded transition-transform duration-500
        ${show ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {message}
    </div>
  );
}
