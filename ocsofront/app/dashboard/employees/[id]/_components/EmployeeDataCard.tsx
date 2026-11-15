import { Employee } from "@/entities";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import Link from "next/link";

export default function EmployeeDataCard({employee}: {employee:Employee}){
    return(
          <Card className="w-full lg:w-[400px] shadow-md bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center">
                <CardHeader className="flex flex-col items-center pb-2">
                    <div className="relative size-40 rounded-full overflow-hidden shadow-inner mb-4 border-4 border-[#FFB336]/30">
                        <Image 
                            src={employee.employeePhoto} 
                            alt={`${employee.employeeName} photo`}
                            className="object-cover w-full h-full size-40"
                        />
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 text-center">
                        {employee.employeeName} {employee.employeeLastName}
                    </h1>
                </CardHeader>

                <Divider className="my-2" />

                <CardBody className="flex flex-col gap-3 w-full text-sm text-gray-600 px-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400">Correo electrónico</span>
                        <span className="font-semibold text-gray-700">{employee.employeeEmail || "No registrado"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400">Número de teléfono</span>
                        <span className="font-semibold text-gray-700">{employee.employeePhoneNumber || "No registrado"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400">Tienda</span>
                        <Link 
                            className="underline text-[#F74C39] hover:opacity-80 transition-opacity" 
                            href={`/dashboard?store=${employee.location.locationId}`}
                        >
                            <span className="font-semibold text-gray-700">
                                {employee.location.locationName || "Sin nombre"}
                            </span>
                        </Link>
                    </div>
                </CardBody>
            </Card>
    )
}