// app/private/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import WaitingListManager from "@/components/WaitingListManager";
import AddEmailForm from "@/components/AddEmailForm";

export default async function PrivatePage() {
  const session = await getServerSession();

  if (!session) {
    // Redirige si no hay sesión
    redirect("/");
  }

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-2xl font-bold mb-4">Sección Privada</h1>
      <p className="mb-2">Email: {session?.user?.email}</p>
      <p className="mb-4">Nombre: {session?.user?.name}</p>
      <LogoutButton />
      <WaitingListManager />
      <AddEmailForm/>
      
    </div>
  );
}
