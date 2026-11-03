// app/dashboard/providers/page.tsx
import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import ProviderCard from "./_components/ProviderCard";
import { Provider } from "@/entities";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";

const ProviderPage = async () => {
    try {
        const response = await fetch(`${API_URL}/providers`, {
            headers: {
                ...(await authHeaders()) // <-- Añadidos los paréntesis ()
            },
            next: {
                tags: ["dashboard:providers"]
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener los proveedores del servidor");
        }

        const providers: Provider[] = await response.json();

        // Validamos que sea un arreglo antes de mapear
        if (!Array.isArray(providers)) {
            return (
                <p className="text-red-500 font-medium">
                    La respuesta del servidor no tiene el formato correcto.
                </p>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
                <Button className="w-fit" color="primary">
                    <LuPlus size="20"/>
                </Button>
                {providers.map((provider: Provider) => (
                    <Link href= {{pathname: `/dashboard/providers/${provider.providerId}`}}>
                    <ProviderCard provider={provider} key={provider.providerId} />
                    </Link>
                ))}
            </div>
        );
    } catch (error) {
        return (
            <p className="text-red-500 font-medium">
                No fue posible cargar los proveedores. Inténtalo más tarde.
            </p>
        );
    }
};

export default ProviderPage;