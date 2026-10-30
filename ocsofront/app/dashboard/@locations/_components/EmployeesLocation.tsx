import { Employee } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function EmployeesLocation({
    store,
}: {
    store: string;
}) {
    try {
        const response = await fetch(
            `${API_URL}/employees/location/${store}`,
            {
                method: "GET",
                headers:{
                ...(await authHeaders())
            },
            next:{
                tags:["dashboard:locations", "dashboard:locations:employees"]
            }
        });
        const data: Employee[] = await response.json()

        return data?.map((employee: Employee) => {
            const fullName =
                `${employee.employeeName} ${employee.employeeLastName}`;

            return (
                <Card
                    key={employee.employeeEmail}
                    className="my-4 w-full"
                >
                    <CardHeader>
                        <p className="w-full">
                            Nombre: <b>{fullName}</b>
                        </p>
                    </CardHeader>

                    <Divider />

                    <CardBody>
                        <p className="w-full">
                            Email: <b>{employee.employeeEmail}</b>
                        </p>

                        <p className="w-full">
                            Teléfono:{" "}
                            <b>{employee.employeePhoneNumber}</b>
                        </p>
                    </CardBody>
                </Card>
            );
        });
    } catch (error) {

        return (
            <p className="text-red-500">
                No fue posible cargar los empleados. Inténtalo más tarde.
            </p>
        );
    }
}
