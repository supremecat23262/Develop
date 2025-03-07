import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/SideBar";
import DashboardCards from "@/components/DashboardCards";
import IngresosEgresosSection from "@/components/IngresoEgresos";
import PotentialClients from "@/components/PotentialClients";
import ProfileSection from "@/components/ProfileSection";

export default async function DashBoardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
    return null; // Evita renderizar contenido si no hay sesión
  }

  // Tipado explícito de usuario
  const user: {
    name: string;
    email: string;
    image: string;
  } = {
    name: session.user.name ?? "Usuario",
    email: session.user.email ?? "Sin correo",
    image: session.user.image ?? "/default-profile.png",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Sección superior: componente de perfil con imagen y botón de cerrar sesión */}
        <ProfileSection user={user} />

        {/* Sección de tarjetas del dashboard */}
        <div className="bg-white shadow-md p-4">
          <DashboardCards />
        </div>

        {/* Contenido principal */}
        <IngresosEgresosSection />
        <PotentialClients />
      </div>
    </div>
  );
}
