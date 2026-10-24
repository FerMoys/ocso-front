import axios from "axios";
import { cookies } from "next/headers";
import { API_URL, TOKEN_NAME } from "@/app/constants";
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocations";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";

const LocationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    return (
      <p className="text-red-500">
        No se encontró la sesión. Inicia sesión nuevamente.
      </p>
    );
  }

  try {
    let { data } = await axios.get<Location[]>(
      `${API_URL}/locations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!Array.isArray(data) || data.length === 0) {
      return (
        <p className="text-gray-500">
          No hay tiendas registradas para mostrar.
        </p>
      );
    }

    const params = await searchParams;
    const store =
      typeof params.store === "string" ? params.store : "";

    return (
      <div className="w-full">
        <div className="w-full max-w-md">
          <SelectLocation locations={data} store={store} />
        </div>
        <div>
          <LocationCard store={store}/>
        </div>
        <FormNewLocation/>
      </div>
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error al obtener tiendas:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Error inesperado:", error);
    }

    return (
      <p className="text-red-500">
        No fue posible cargar las tiendas.
      </p>
    );
  }
};

export default LocationsPage;