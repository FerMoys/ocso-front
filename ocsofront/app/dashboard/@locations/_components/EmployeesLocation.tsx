import { Employee } from "@/entities";
import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function EmployeesLocation({
  store,
}: {
  store: string;
}) {
  try {
    const response = await fetch(
      `${API_URL}/employees/location/${encodeURIComponent(store)}`,
      {
        method: "GET",
        headers: {
          ...(await authHeaders()),
        },
        next: {
          tags: ["dashboard:locations", "dashboard:locations:employees"],
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener empleados");
    }

    const data: Employee[] = await response.json();

    if (!data.length) {
      return (
        <p className="text-gray-500 text-sm">
          No hay empleados registrados en esta tienda.
        </p>
      );
    }

    return (
      <div className="flex flex-col gap-3 w-full">
        {data.map((employee: Employee) => {
          const fullName =
            `${employee.employeeName} ${employee.employeeLastName}`;

          return (
            <Card
              key={employee.employeeEmail}
              className="w-full shrink-0"
            >
              <CardHeader>
                <p className="w-full text-sm">
                  Nombre: <b>{fullName}</b>
                </p>
              </CardHeader>

              <Divider />

              <CardBody className="gap-2">
                <p className="text-sm break-all">
                  Email: <b>{employee.employeeEmail}</b>
                </p>

                <p className="text-sm">
                  Teléfono: <b>{employee.employeePhoneNumber}</b>
                </p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  } catch (error) {
    return (
      <p className="text-red-500">
        No fue posible cargar los empleados. Inténtalo más tarde.
      </p>
    );
  }
}