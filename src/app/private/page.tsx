// app/private/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import WaitingListManager from "@/components/WaitingListManager";
import AddEmailForm from "@/components/AddEmailForm";
import Sidebar from "@/components/SideBar";
import DeleteInactiveEmailsButton from "@/components/DeleteInactiveEmailButton";
import UpdateLastLogin from "@/components/UpdateLastLoign"; 

export default async function PrivatePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Actualiza la última conexión */}
      <UpdateLastLogin email={session?.user?.email ?? undefined} />

      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal que ocupa el resto de la pantalla */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Sección Privada</h1>
        <p className="mb-2">Email: {session?.user?.email}</p>
        <p className="mb-4">Nombre: {session?.user?.name}</p>
        <LogoutButton />
        <WaitingListManager />
        <AddEmailForm />
        <DeleteInactiveEmailsButton />
      </div>
    </div>
  );
}
