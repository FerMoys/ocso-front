// app/dashboard/managers/[id]/page.tsx
import { API_URL } from "@/app/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import ManagerDetailPage from "../_components/ManagerDetailPage";
import FormUpdateManager from "../_components/FormUpdateManager";
import UpdateManager from "../_components/UpdateManager";

export default async function ManagerPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await fetch(`${API_URL}/managers/${id}`, {
        headers: {
            ...(await authHeaders()),
        },
        next: {
            tags: [`dashboard:managers:${id}`, "dashboard:managers"],
        },
    });

    if (!response.ok) {
        throw new Error("No se pudo obtener la información del gerente");
    }

    const manager: Manager = await response.json();

    return (
        <div className="w-full flex flex-col gap-6">
            <UpdateManager> 
                <FormUpdateManager manager={manager} />
            </UpdateManager>
            <ManagerDetailPage manager={manager} />
            
        </div>
    );
}