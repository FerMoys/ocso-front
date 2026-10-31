import { API_URL } from "@/app/constants";
import { Manager } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

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
                    tags: [`dashboard:managers/${id}`]
                },
        });

        if (!response.ok) {
            throw new Error("No se pudo obtener la información del gerente");
        }

        const manager: Manager = await response.json();

        return (
            /* Agregamos max-w-none para romper cualquier límite de ancho predeterminado de NextUI */
            <Card className="w-full max-w-none min-h-[500px] shadow-lg border border-default-200">
                <CardHeader className="bg-[#FFB336]/20 py-4">
                    <h3 className="text-2xl font-bold text-center w-full text-gray-800">
                        {manager.managerFullName}
                    </h3>
                </CardHeader>
                <Divider />
                <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 items-stretch flex-1">

                    <div className="flex flex-col gap-4 justify-center">
                        <div>
                            <p className="text-lg text-gray-500">Email:</p>
                            <p className="text-base font-semibold text-gray-800 break-all">{manager.managerEmail}</p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-500">Teléfono:</p>
                            <p className="text-base font-semibold text-gray-800">{manager.managerPhoneNumber}</p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-500">Tienda asignada:</p>
                            {manager.location && (
                                <Link
                                    href={{
                                        pathname: "/dashboard",
                                        query: {
                                            store: manager.location.locationId,
                                        },
                                    }}
                                >
                                    <p className="text-base font-semibold text-[#F74C39]">
                                        {manager.location.locationName}
                                    </p>
                                </Link>
                            )}

                        </div>
                    </div>

                   <div className="w-full min-h-[280px] h-72 md:h-full rounded-lg overflow-hidden shadow-inner border border-gray-200">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.428588537674!2d-100.4501!3d20.7068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMjDCsDQyJzI0LjUiTiAxMDAvMjcnMDAuNCJX!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx"
                        ></iframe>
                    </div>
                </CardBody>
            </Card>
        );
    } catch (error) {
        return (
            <p className="text-red-500 font-medium">
                No fue posible cargar la información del manager.
            </p>
        );
    }
}