import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import WaitingListManager from "@/components/WaitingListManager";
import AddEmailForm from "@/components/AddEmailForm";
import Sidebar from "@/components/SideBar";
import DeleteInactiveEmailsButton from "@/components/DeleteInactiveEmailButton";
import UpdateLastLogin from "@/components/UpdateLastLoign";
import ProfileSection from "@/components/ProfileSection";

export default async function PrivatePage() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
    return null;
  }

  // Definir user con valores por defecto en caso de que alguna propiedad falte
  const user = {
    name: session.user.name ?? "Usuario",
    email: session.user.email ?? "Sin correo",
    image: session.user.image ?? "/default-profile.png",
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Actualiza la última conexión */}
      <UpdateLastLogin email={user.email} />

      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-1 p-8">
        <ProfileSection user={user} />

        <h1 className="text-2xl font-bold mb-4">Sección Privada</h1>
        <p className="mb-2">Email: {user.email}</p>
        <p className="mb-4">Nombre: {user.name}</p>

        {/* Gestión de la lista de espera y notificaciones */}
        <WaitingListManager />

        <AddEmailForm />
        <DeleteInactiveEmailsButton />
      </div>
    </div>
  );
}
