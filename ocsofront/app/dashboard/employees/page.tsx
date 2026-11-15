
import { API_URL } from "@/app/constants";
import { Employee, Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";

import EmployeeCard from "./_components/EmployeeCard";
import EmployeePhotoCard from "./_components/EmployeePhotoCard";
import AddEmployeeButton from "./_components/AddEmployeeButton";
import ListEmployees from "./_components/ListEmployees";

const EmployeesPage = async () => {

    // Obtener empleados
    const responseEmployees = await fetch(`${API_URL}/employees`, {
        headers: {
            ...(await authHeaders())
        },
        cache: "no-store"
    });

    const employees: Employee[] = await responseEmployees.json();

    // Obtener tiendas
    const responseLocations = await fetch(`${API_URL}/locations`, {
        headers: {
            ...(await authHeaders())
        },
        cache: "no-store"
    });

    const locations: Location[] = await responseLocations.json();

    return (
        <div className="flex flex-col h-[90vh] gap-4 overflow-y-auto p-10">
            <div className="flex w-full justify-end">
                <AddEmployeeButton stores={locations} />
            </div>

            <div className="flex flex-wrap gap-4">
               <ListEmployees employees={employees} locations={locations}/>
            </div>

        </div>
    );
};

export default EmployeesPage;
