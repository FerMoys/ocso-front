import { API_URL } from "@/app/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import EmployeeCard from "./_components/EmployeeCard";

const EmployeesPage = async () => {
    const response = await fetch(`${API_URL}/employees`, {
        headers: {
            ...(await authHeaders())
        }
    })
    const employees: Employee[] = await response.json()

    return(
        <>
        {/*
            employees.map((employee:Employee) => {
                return <h1> {employee.employeeName}</h1>
            })
        */}
        <EmployeeCard/>
        </>
    )
}

export default EmployeesPage;