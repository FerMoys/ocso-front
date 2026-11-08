import { Employee } from "@/entities";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";

export default function EmployeeCard({ employee }: { employee: Employee }) {
    return (
        <Link 
            href={{ pathname: `/dashboard/employees/${employee.id}` }}
            className="block transition-transform duration-300 ease-in-out hover:scale-105 w-full sm:w-[300px]"
        >
            <Card
                className="h-72 w-full border-2 border-transparent hover:border-[#F74C39] transition-all shadow-md hover:shadow-xl bg-white flex flex-col justify-between relative"
            >
                <div>
                    <CardHeader className="text-gray-900 font-bold text-lg pt-4 pb-2">
                        {`${employee.employeeName} ${employee.employeeLastName}`}
                    </CardHeader>

                    <Divider />

                    <CardBody className="py-3 flex flex-col gap-1">
                        <p className="text-sm text-gray-700">
                            Correo: <span className="font-normal">{employee.employeeEmail}</span>
                        </p>
                        <p className="text-sm text-gray-700">
                            Número de teléfono: <span className="font-normal">{employee.employeePhoneNumber}</span>
                        </p>
                    </CardBody>
                </div>

                <CardFooter className="py-2 px-4 pb-4">
                    <Link href={`/dashboard/employees/${employee.id}`}>
                    <Button variant="bordered" size="sm" radius="full" className="text-white border-white/80 font-medium">
                        Actualizar datos
                    </Button>
                    </Link>
                </CardFooter>
            </Card>
        </Link>
    );
}