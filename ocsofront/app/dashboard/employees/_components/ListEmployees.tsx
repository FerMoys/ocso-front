
"use client";

import { Employee, Location } from "@/entities";
import EmployeePhotoCard from "./EmployeePhotoCard";
import EmployeeCard from "./EmployeeCard";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function ListEmployees({
    employees,
    locations
}: {
    employees: Employee[];
    locations: Location[];
}) {

    const [filter, setFilter] = useState<string>("all");

    // Filtrar empleados por tienda
    const filteredEmployees = employees.filter((employee: Employee) => {

        if (filter === "all") {
            return true;
        }

        return String(employee.location?.locationId) === filter;
    });

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* Selector de tiendas */}
            <div className="w-full sm:w-72">
                <Select
                label="Tiendas"
                selectedKeys={filter ? [filter] : []}
                onChange={(e) => setFilter(e.target.value)}
                >
                {locations.map((location) => (
                    <SelectItem key={String(location.locationId)}>
                    {location.locationName}
                    </SelectItem>
                ))}
                </Select>
            </div>

            {/* Listado de empleados */}
            <div className="flex flex-wrap gap-4">

                {filteredEmployees.length > 0 ? (

                    filteredEmployees.map((employee: Employee) => {

                        if (employee.employeePhoto != null) {
                            return (
                                <EmployeePhotoCard
                                    key={employee.id}
                                    employee={employee}
                                />
                            );
                        }

                        return (
                            <EmployeeCard
                                key={employee.id}
                                employee={employee}
                            />
                        );
                    })

                ) : (
                    <p className="text-gray-500 text-sm">
                        No hay empleados registrados en esta tienda.
                    </p>
                )}

            </div>

        </div>
    );
}
