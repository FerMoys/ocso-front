import { Employee } from "@/entities";
import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default async function EmployeeCard() {
    try {
        const response = await fetch(
            `${API_URL}/employees`,
            {
                method: "GET",
                headers: {
                    ...(await authHeaders())
                },
                next: {
                    tags: ["dashboard:employees"]
                }
            }
        );
        const data: Employee[] = await response.json();

        return (
            <div className="flex flex-col gap-4">
                {data?.map((employee: Employee) => {
                    return (
                        <Link 
                            key={employee.id}
                            href={{ pathname: `/dashboard/employees/${employee.id}` }}
                            className="block transition-transform duration-300 ease-in-out hover:scale-105"
                        >
                            <Card
                                className="w-full border-2 border-transparent hover:border-[#F74C39] transition-all shadow-md hover:shadow-xl bg-white"
                            >
                                <CardHeader className="bg-[#FFB336]/10 text-gray-800 font-semibold">
                                    <p className="w-full">
                                        Nombre: <span className="text-[#F74C39]">{`${employee.employeeName} ${employee.employeeLastName}`}</span>
                                    </p>
                                </CardHeader>

                                <Divider />

                                <CardBody className="py-3">
                                    <p className="text-large text-gray-600 w-full">
                                        Email: <b>{employee.employeeEmail}</b>
                                    </p>
                                    <p className="text-large text-gray-600 w-full mt-1">
                                        Foto: <b>{employee.employeePhoto}</b>
                                    </p>
                                    <p className="text-large text-gray-600 w-full mt-1">
                                        Teléfono: <b>{employee.employeePhoneNumber}</b>
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