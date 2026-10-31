
import { Manager } from "@/entities";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Divider,
} from "@nextui-org/react";
import Link from "next/link";
import DeleteManagerButton from "../_components/DeleteManagerButton";

export default function ManagerDetailPage({
    manager,
}: {
    manager: Manager;
}) {
    return (
        <Card className="w-full max-w-none shadow-lg border border-default-200">

            {/* Encabezado */}
            <CardHeader className="bg-[#FFB336]/20 py-4 flex justify-between items-center px-6">
                <h3 className="text-2xl font-bold text-gray-800">
                    {manager.managerFullName}
                </h3>
            </CardHeader>

            <Divider />

            {/* Información del manager y mapa */}
            <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 items-stretch">

                {/* Información del manager */}
                <div className="flex flex-col gap-4 justify-center">
                    <div>
                        <p className="text-lg text-gray-500">Email:</p>
                        <p className="text-base font-semibold text-gray-800 break-all">
                            {manager.managerEmail}
                        </p>
                    </div>

                    <div>
                        <p className="text-lg text-gray-500">Teléfono:</p>
                        <p className="text-base font-semibold text-gray-800">
                            {manager.managerPhoneNumber}
                        </p>
                    </div>

                    <div>
                        <p className="text-lg text-gray-500">
                            Tienda asignada:
                        </p>

                        {manager.location ? (
                            <Link
                                href={{
                                    pathname: "/dashboard",
                                    query: {
                                        store: manager.location.locationId,
                                    },
                                }}
                            >
                                <p className="text-base font-semibold text-[#F74C39] hover:underline">
                                    {manager.location.locationName}
                                </p>
                            </Link>
                        ) : (
                            <p className="text-base text-gray-500">
                                Sin tienda asignada
                            </p>
                        )}
                    </div>
                </div>

                {/* Mini mapa */}
                <div className="w-full min-h-[250px] h-64 md:h-full rounded-lg overflow-hidden shadow-inner border border-gray-200">
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.428588537674!2d-100.4501!3d20.7068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMjDCsDQyJzI0LjUiTiAxMDAvMjcnMDAuNCJX!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx"
                    />
                </div>

            </CardBody>

            <Divider />

            {/* Botón para eliminar */}
            <CardFooter className="flex justify-end bg-default-50 px-6 py-3">
                <DeleteManagerButton
                    managerId={manager.managerId}
                />
            </CardFooter>

        </Card>
    );
}
