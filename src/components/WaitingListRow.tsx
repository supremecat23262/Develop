// src/components/WaitingListRow.tsx
"use client";

interface WaitingListRowProps {
  email: string;
  approved: boolean;
  createdAt?: Date | string;
  lastLogin?: Date | string;
  onUpdate: (email: string, approved: boolean) => void;
  onDelete: (email: string) => void;
}

export default function WaitingListRow({
  email,
  approved,
  createdAt,
  lastLogin,
  onUpdate,
  onDelete,
}: WaitingListRowProps) {
  // Función para formatear las fechas
  const formatDate = (date?: Date | string) => {
    if (!date) return "No disponible";
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">{approved ? "Aprobado" : "Pendiente"}</td>
      <td className="border px-4 py-2">{formatDate(createdAt)}</td>
      <td className="border px-4 py-2">{formatDate(lastLogin)}</td>
      <td className="border px-4 py-2">
        {!approved ? (
          <>
            <button
              onClick={() => onUpdate(email, true)}
              className="mr-2 px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition duration-200"
            >
              Aprobar
            </button>
            <button
              onClick={() => onUpdate(email, false)}
              className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-200"
            >
              Rechazar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onDelete(email)}
              className="ml-2 px-3 py-1 rounded-md bg-red-700 text-white hover:bg-red-800 transition duration-200"
            >
              Eliminar
            </button>
          </>
        )}
      </td>
    </tr>
  );
}