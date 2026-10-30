import { API_URL } from "@/app/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function ManagerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    try {
        const response = await fetch(`${API_URL}/managers/${id}`, {
            headers: {
                ...(await authHeaders()),
            },
            next: {
                tags: [`dasboard:managers:${id}`, "dashboard:managers"]
            }
        });

        if (!response.ok) {
            throw new Error("No se pudo obtener la información del gerente");
        }

        const manager: Manager = await response.json();

        return (
            <Card className="w-full">
                <CardHeader>
                    <p className="w-full">
                        Nombre: <b>{manager.managerFullName}</b>
                    </p>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p className="w-full">
                        Email: <b>{manager.managerEmail}</b>
                    </p>
                    <p className="w-full">
                        Teléfono: <b>{manager.managerPhoneNumber}</b>
                    </p>
                </CardBody>
            </Card>
        );
    } catch (error) {
        return (
            <p className="text-red-500">
                No fue posible cargar la información del manager.
            </p>
        );
    }
}