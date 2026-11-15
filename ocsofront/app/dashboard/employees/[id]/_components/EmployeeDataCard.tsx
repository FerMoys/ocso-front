import { Employee, Location } from "@/entities";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import Link from "next/link";
import DeleteEmployee from "./DeleteEmployee";
import CreateUser from "./CreateUser";
import FormCreateUser from "./FormCreateUser";
import FormUpdateEmployee from "./FormUpdateEmployee";
import FormUpdateUserEmployee from "./FormUpdateUserEmployee";

export default function EmployeeDataCard({employee, locations}: {employee:Employee, locations: Location[]}){
    return(
          <Card className="w-full lg:w-[400px] shadow-md bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center">
                <CardHeader className="flex flex-col items-center pb-2">
                    <div >
                       {/** <Image 
                            src={employee.employeePhoto} 
                            alt={`${employee.employeeName} photo`}
                            className="object-cover w-full h-full size-40"
                        /> */}
                        <CreateUser employeeId={employee.id} photo={employee.employeePhoto}>
                            {
                                !employee.user ? (
                                    <FormCreateUser employeeId={employee.id} />
                                ) : (
                                    <FormUpdateUserEmployee user={employee.user} />
                                )
                            }
                        </CreateUser>
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
                            href={`/dashboard?store=${employee.location?.locationId}`}
                        >
                            <span className="font-semibold text-gray-700">
                                {employee.location?.locationName || "Sin tienda"}
                            </span>
                        </Link>
                        <div className="flex flex-col items-center">
                        <DeleteEmployee id={employee.id}/>
                        </div>
                    </div>
                </CardBody>
            </Card>
    )
}