import { createLocation } from "@/actions/locations/create";
import { API_URL, TOKEN_NAME } from "@/app/constants";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { cookies } from "next/headers";
import SelectManager from "./SelectManager";

export default async function FormNewLocation({store,

}: {
    store: string

    }) {
    if (!store) return null;
    const cookieValue = cookies().get(TOKEN_NAME)?.value;

    if (!cookieValue) {
    throw new Error("No se encontró la sesión. Inicia sesión nuevamente.");
    }

    let session: { user?: unknown; token?: string };

    try {
    const value = cookieValue.startsWith("j:")
        ? cookieValue.slice(2)
        : cookieValue;

    session = JSON.parse(value);
    } catch {
    throw new Error("La cookie de sesión tiene un formato inválido.");
    }

    const token = session.token;

    if (!token) {
    throw new Error("La sesión no contiene un token válido.");
    }
    
    const responseManagers = await axios.get(`${API_URL}/managers`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const responseLocation = await axios.get(`${API_URL}/locations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return(
                
        <form
        action={createLocation}
        className="mx-auto w-full max-w-2xl space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8"
        >
        <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#F74C39]">
            </div>

            <div>
            <h2 className="text-xl font-bold text-gray-800">
                Registrar tienda
            </h2>
            <p className="mt-1 text-sm text-gray-500">
                Agrega una nueva sucursal al sistema OCSO.
            </p>
            </div>
        </div>

        {/* Información general */}
        <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Información general
            </h3>

            <Input
            label="Nombre de la tienda"
            placeholder="Ej. OCSO Juriquilla"
            name="locationName"
            isRequired
            variant="bordered"
            radius="lg"
            classNames={{
                inputWrapper:
                "border-gray-200 hover:border-[#F74C39] group-data-[focus=true]:border-[#F74C39]",
                label: "font-medium text-gray-700",
            }}
            />

            <Input
            label="Dirección"
            placeholder="Av. de la Luz S/N"
            name="locationAddress"
            isRequired
            variant="bordered"
            radius="lg"
            classNames={{
                inputWrapper:
                "border-gray-200 hover:border-[#F74C39] group-data-[focus=true]:border-[#F74C39]",
                label: "font-medium text-gray-700",
            }}
            />
        </div>

        {/* Coordenadas */}
        <div className="space-y-4">
            <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Ubicación geográfica
            </h3>
            <p className="mt-1 text-sm text-gray-400">
                Introduce las coordenadas de la sucursal.
            </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
                label="Latitud"
                placeholder="20.7000"
                name="locationLat"
                type="number"
                step="any"
                isRequired
                variant="bordered"
                radius="lg"
                classNames={{
                inputWrapper:
                    "border-gray-200 hover:border-[#F74C39] group-data-[focus=true]:border-[#F74C39]",
                }}
            />

            <Input
                label="Longitud"
                placeholder="-100.4000"
                name="locationLng"
                type="number"
                step="any"
                isRequired
                variant="bordered"
                radius="lg"
                classNames={{
                inputWrapper:
                    "border-gray-200 hover:border-[#F74C39] group-data-[focus=true]:border-[#F74C39]",
                }}
            />
            </div>
        </div>

        {/* Gerente */}
        <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Asignación de gerente
            </h3>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <SelectManager
                managers={responseManagers.data}
                locations={responseLocation.data}
            />
            </div>
        </div>

        {/* Botón */}
        <div className="border-t border-gray-100 pt-5">
            <Button
            type="submit"
            className="h-12 w-full bg-[#F74C39] text-base font-semibold text-white shadow-md transition-all hover:bg-[#DF3D2C] hover:shadow-lg sm:w-auto sm:min-w-48"
            radius="lg"
            >
            Registrar tienda
            </Button>
        </div>
        
        </form>
    )
}
