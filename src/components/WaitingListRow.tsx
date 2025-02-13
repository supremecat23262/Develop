// components/WaitingListRow.tsx
"use client";

interface WaitingListRowProps {
  email: string;
  approved: boolean;
  onUpdate: (email: string, approved: boolean) => void;
}

export default function WaitingListRow({
  email,
  approved,
  onUpdate,
}: WaitingListRowProps) {
  return (
    <tr>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">{approved ? "Aprobado" : "Pendiente"}</td>
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
          <span className="text-sm text-gray-600">Sin acciones</span>
        )}
      </td>
    </tr>
  );
}
