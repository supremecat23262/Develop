// src/components/WaitingListTable.tsx
"use client";

import WaitingListRow from "@/components/WaitingListRow";

export interface WaitingUser {
  email: string;
  approved: boolean;
}

interface WaitingListTableProps {
  users?: WaitingUser[];
  onUpdate: (email: string, approved: boolean) => void;
}

export default function WaitingListTable({
  users = [],
  onUpdate,
}: WaitingListTableProps) {
  return (
    <table className="min-w-full mb-4 border">
      <thead>
        <tr>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Estado</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <WaitingListRow
              key={user.email}
              email={user.email}
              approved={user.approved}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-center py-4">
              No hay usuarios en la lista de espera.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
