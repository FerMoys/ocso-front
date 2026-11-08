import { Employee } from "@/entities";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";

export default function EmployeePhotoCard({ employee }: { employee: Employee }) {
    return (
        <Link 
            href={{ pathname: `/dashboard/employees/${employee.id}` }}
            className="block transition-transform duration-300 ease-in-out hover:scale-105 w-full sm:w-[300px]"
        >
            <Card
                className="h-72 w-full border-2 border-transparent hover:border-[#F74C39] transition-all shadow-md hover:shadow-xl bg-white relative overflow-hidden"
            >
                <CardHeader className="absolute top-0 z-10 bg-gradient-to-b from-black/70 to-transparent text-white pt-3 pb-4">
                    <p className="font-bold text-lg">
                        {`${employee.employeeName} ${employee.employeeLastName}`}
                    </p>
                </CardHeader>

                <Image 
                    className="z-0 object-cover h-72 w-full"
                    src={employee.employeePhoto} 
                    alt="Employee photo"
                />

                <CardFooter className="absolute bottom-0 z-10 py-2 px-4 bg-gradient-to-t from-black/60 to-transparent">
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