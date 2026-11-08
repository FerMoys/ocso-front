import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import ProviderCard from "./_components/ProviderCard";
import AddProviderButton from "./_components/AddProviderButton"; // <-- Importamos el componente del modal
import { Provider } from "@/entities";

const ProviderPage = async () => {
    try {
        const response = await fetch(`${API_URL}/providers`, {
            headers: {
                ...(await authHeaders())
            },
            next: {
                tags: ["dashboard:providers"]
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener los proveedores del servidor");
        }

        const providers: Provider[] = await response.json();

        if (!Array.isArray(providers)) {
            return (
                <p className="text-red-500 font-medium">
                    La respuesta del servidor no tiene el formato correcto.
                </p>
            );
        }

        return (
            <div className="w-full p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Proveedores OCSO</h1>
                    {/* Botón que abre el Modal */}
                    <AddProviderButton />
                </div>

                {/* Cuadrícula de proveedores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {providers.map((provider: Provider) => (
                        <ProviderCard provider={provider} key={provider.providerId} />
                    ))}
                </div>
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