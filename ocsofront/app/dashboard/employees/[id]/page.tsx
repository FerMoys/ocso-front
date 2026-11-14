import { API_URL } from "@/app/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "../_components/EmployeeCard";
import { Card, CardBody, CardHeader, Divider, Form, Image } from "@nextui-org/react";
import FormUpdateEmployee from "./_components/FormUpdateEmployee";


export default async function EmployeePage({params}:{params: {id:string}}){
    const responseEmployee = await fetch(`${API_URL}/employees/${params.id}`, {
        headers: {
            ...(await authHeaders())
        }
    })
    const employee: Employee = await responseEmployee.json()
    return (
        <div className="w-full h-[90vh] flex flex-row">
            <div>
                 <Card
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
                    </Card>
                <>
                <Image src={employee.employeePhoto}
                className="object-cover"
                classNames={{
                    img: "size-60"
                }}
                />
                </>
            </div>
            <FormUpdateEmployee employee={employee}/>

        </div>
    )
}