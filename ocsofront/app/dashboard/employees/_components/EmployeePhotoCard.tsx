'use client';

import { Employee } from "@/entities";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function EmployeePhotoCard({ employee }: { employee: Employee }) {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/dashboard/employees/${employee.id}`);
    };

    return (
        <Card
            isPressable
            onPress={handleNavigate}
            className="h-72 w-full sm:w-[300px] border-2 border-transparent hover:border-[#F74C39] transition-all shadow-md hover:shadow-xl bg-white relative overflow-hidden cursor-pointer"
        >
            <CardHeader className="absolute top-0 z-10 bg-gradient-to-b from-black/70 to-transparent text-white pt-3 pb-4">
                <p className="font-bold text-lg text-left">
                    {`${employee.employeeName} ${employee.employeeLastName}`}
                </p>
            </CardHeader>

            <Image 
                className="z-0 object-cover h-72 w-full"
                src={employee.employeePhoto} 
                alt="Employee photo"
            />

            <CardFooter className="absolute bottom-0 z-10 py-2 px-4 bg-gradient-to-t from-black/60 to-transparent">
                <Button 
                    variant="bordered" 
                    size="sm" 
                    radius="full" 
                    className="text-white border-white/80 font-medium"
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