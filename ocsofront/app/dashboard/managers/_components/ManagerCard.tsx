import { Manager } from "@/entities";
import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default async function ManagerCard() {
    try {
        const response = await fetch(
            `${API_URL}/managers`,
            {
                method: "GET",
                headers: {
                    ...(await authHeaders())
                },
                next: {
                    tags: ["dashboard:managers"]
                }
            }
        );
        const data: Manager[] = await response.json();

        return (
            <div className="flex flex-col gap-4">
                {data?.map((manager: Manager) => {
                    return (
                        <Link 
                            key={manager.managerId}
                            href={{ pathname: `/dashboard/managers/${manager.managerId}` }}
                            className="block transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            <Card
                                className="w-full border-2 border-transparent hover:border-[#F74C39] transition-all shadow-md hover:shadow-xl bg-white"
                            >
                                <CardHeader className="bg-[#FFB336]/10 text-gray-800 font-semibold">
                                    <p className="w-full">
                                        Nombre: <span className="text-[#F74C39]">{manager.managerFullName}</span>
                                    </p>
                                </CardHeader>

                                <Divider />

                                <CardBody className="py-3">
                                    <p className="text-sm text-gray-600 w-full">
                                        Email: <b>{manager.managerEmail}</b>
                                    </p>
                                    <p className="text-sm text-gray-600 w-full mt-1">
                                        Teléfono: <b>{manager.managerPhoneNumber}</b>
                                    </p>
                                </CardBody>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        );
    } catch (error) {
        return (
            <p className="text-red-500 font-medium">
                No fue posible cargar los managers. Inténtalo más tarde.
            </p>
        );
    }
}