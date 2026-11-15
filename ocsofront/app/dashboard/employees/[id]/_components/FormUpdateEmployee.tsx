import updateEmployee from "@/actions/employees/update";
import { Employee } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import SelectLocation from "./SelectLocation";
import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";

export default async function FormUpdateEmployee({ employee }: { employee: Employee }) {
    const responseLocations = await fetch(`${API_URL}/locations`, {
            headers: {
                ...(await authHeaders())
            }
        })
        const locations = await responseLocations.json()
    
    const {id} = employee;
    const updateEmployeeById = updateEmployee.bind(null, id)
    return (
        <form action={updateEmployeeById} className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-6">
            <div className="border-b pb-4">
                <h2 className="text-xl font-bold text-gray-800">Actualizar Empleado</h2>
            </div>

            <div className="flex flex-col gap-4">
                <Input 
                    label="Nombre" 
                    name="employeeName" 
                    defaultValue={employee.employeeName} 
                    variant="bordered"
                    radius="lg"
                />
                <Input 
                    label="Apellidos" 
                    name="employeeLastName" 
                    defaultValue={employee.employeeLastName} 
                    variant="bordered"
                    radius="lg"
                />
                <Input 
                    label="Correo electrónico" 
                    name="employeeEmail" 
                    defaultValue={employee.employeeEmail} 
                    variant="bordered"
                    radius="lg"
                />
                <Input 
                    label="Num. de Teléfono" 
                    name="employeePhoneNumber" 
                    defaultValue={employee.employeePhoneNumber} 
                    variant="bordered"
                    radius="lg"
                />
                
                <div className="flex flex-col gap-1.5 pt-1">
                    <label className="text-xs font-semibold text-gray-600 ml-1">Actualizar Fotografía</label>
                    <input 
                        type="file" 
                        name="employeePhoto"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFB336]/20 file:text-[#F74C39] hover:file:bg-[#FFB336]/30 text-sm text-gray-500 cursor-pointer"
                    />
                </div>
                <SelectLocation stores={locations}/>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                    type="submit" 
                    className=" text-white font-medium shadow-md hover:opacity-90 transition-opacity"
                    radius="lg"
                    color="primary"
                >
                    Actualizar datos
                </Button>
            </div>
        </form>
    );
}