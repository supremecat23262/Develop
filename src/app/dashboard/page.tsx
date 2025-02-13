import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import WaitingListManager from "@/components/WaitingListManager";
import AddEmailForm from "@/components/AddEmailForm";
import Sidebar from "@/components/SideBar";
import DashboardCards from "@/components/DashboardCards";
import IngresosEgresosSection from "@/components/IngresoEgresos";
import PotentialClients from "@/components/PotentialClients";

export default async function PrivatePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Sección superior con DashboardCards */}
        <div className="bg-white shadow-md p-4">
          <DashboardCards />
        </div>

        {/* Contenido principal */}
        <IngresosEgresosSection/>
        <PotentialClients/>

        </div>
      </div>
  );
}
