import { API_URL } from "@/app/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import FormUpdateEmployee from "./_components/FormUpdateEmployee";
import EmployeeDataCard from "./_components/EmployeeDataCard";

export default async function EmployeePage({ params }: { params: { id: string } }) {
    const responseEmployee = await fetch(`${API_URL}/employees/${params.id}`, {
        headers: {
            ...(await authHeaders())
        }
    });
    const employee: Employee = await responseEmployee.json();

    return (
        <div className="w-full min-h-[90vh] p-8 flex flex-col lg:flex-row gap-8 items-start bg-gray-50/50">
          <EmployeeDataCard employee={employee}/>
            <div className="flex-1 w-full flex justify-center lg:justify-start">
                <FormUpdateEmployee employee={employee} />
            </div>
        </div>
    );
}