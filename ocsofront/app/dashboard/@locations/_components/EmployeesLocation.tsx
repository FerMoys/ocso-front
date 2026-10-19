
import axios from "axios";
import { Employee } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/app/constants";
import { cookies } from "next/headers";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default async function EmployeesLocation({
    store,
}: {
    store: string;
}) {
    const cookieStore = await cookies();

    const allCookies = await cookieStore.getAll();

    console.log(
        "Cookies recibidas:",
        allCookies.map((cookie) => cookie.name)
    );

    console.log("Cookie esperada:", TOKEN_NAME);

    const authCookie = await cookieStore.get(TOKEN_NAME);
    const token = authCookie?.value;

    console.log("¿Token encontrado?:", Boolean(token));

    if (!token) {
        return (
            <p className="text-red-500">
                No se encontró la sesión. Inicia sesión nuevamente.
            </p>
        );
    }



    try {
        const { data } = await axios.get<Employee[]>(
            `${API_URL}/employees/location/${store}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (data.length === 0) {
            return (
                <p className="text-gray-500">
                    No hay empleados registrados en esta ubicación.
                </p>
            );
        }

        return data.map((employee) => {
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
        if (axios.isAxiosError(error)) {
            console.error(
                "Error al obtener empleados:",
                error.response?.status,
                error.response?.data
            );

            if (error.response?.status === 401) {
                return (
                    <p className="text-red-500">
                        Tu sesión no es válida o ha expirado.
                        Inicia sesión nuevamente.
                    </p>
                );
            }
        }

        return (
            <p className="text-red-500">
                No fue posible cargar los empleados. Inténtalo más tarde.
            </p>
        );
    }
}
