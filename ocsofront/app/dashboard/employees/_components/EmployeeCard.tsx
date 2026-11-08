'use client';

import { Employee } from "@/entities";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function EmployeeCard({ employee }: { employee: Employee }) {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/dashboard/employees/${employee.id}`);
    };

    return (
        <Card
            isPressable
            onPress={handleNavigate}
            className="h-72 w-full sm:w-[300px] border-2 border-transparent hover:border-[#F74C39] transition-all shadow-md hover:shadow-xl bg-white flex flex-col justify-between cursor-pointer"
        >
            <div>
                <CardHeader className="text-gray-900 font-bold text-lg pt-4 pb-2">
                    {`${employee.employeeName} ${employee.employeeLastName}`}
                </CardHeader>

                <Divider />

                <CardBody className="py-3 flex flex-col gap-1 text-left">
                    <p className="text-sm text-gray-700">
                        Correo: <span className="font-normal">{employee.employeeEmail}</span>
                    </p>
                    <p className="text-sm text-gray-700">
                        Número de teléfono: <span className="font-normal">{employee.employeePhoneNumber}</span>
                    </p>
                </CardBody>
            </div>

            <CardFooter className="py-2 px-4 pb-4">
                <Button 
                    variant="bordered" 
                    size="sm" 
                    radius="full" 
                    className="font-medium"
                    onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/employees/${employee.id}`);
                    }}
                >
                    Actualizar datos
                </Button>
            </CardFooter>
        </Card>
    );
}