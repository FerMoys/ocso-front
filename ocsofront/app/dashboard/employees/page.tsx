import { API_URL } from "@/app/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "./_components/EmployeeCard";
import EmployeePhotoCard from "./_components/EmployeePhotoCard";
import AddEmployeeButton from "./_components/AddEmployeeButton";

const EmployeesPage = async () => {
    const response = await fetch(`${API_URL}/employees`, {
        headers: {
            ...(await authHeaders())
        }
    })
    const employees: Employee[] = await response.json()

    return (
        <div className="flex flex-col h-[90vh] gap-4 overflow-y-auto p-10">

            {/* Botón en la esquina superior derecha */}
            <div className="flex w-full justify-end">
            <AddEmployeeButton />
            </div>

            {/* Tarjetas de empleados */}
            <div className="flex flex-wrap gap-4">
            {employees.map((employee: Employee) => {
                if (employee.employeePhoto != null) {
                return (
                    <EmployeePhotoCard
                    key={employee.id}
                    employee={employee}
                    />
                );
                } else {
                return (
                    <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    />
                );
                }
            })}
            </div>

        </div>
    );
}

export default EmployeesPage;