import LogoutButton from "@/components/LogoutButton"
import { getServerSession } from "next-auth";


export default async function Page(){
    const session = await getServerSession();

    return (
        <div>
            <p>Sección Privada</p>
            <p>{session?.user?.email}</p>
            <p>{session?.user?.name}</p>
            <div>
                <LogoutButton/>
            </div>
        </div>
    );
}