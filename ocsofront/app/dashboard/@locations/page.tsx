
import { API_URL } from "@/app/constants";
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocations";

import EmployeesLocation from "./_components/EmployeesLocation";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import { authHeaders } from "@/helpers/authHeaders";
import FormUpdateLocation from "./_components/FormUpdateLocation";

const LocationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  try {
    const response = await fetch(`${API_URL}/locations`, {
      headers: {
        ...(await authHeaders()),
      },
      next: {
        tags: ["dashboard:locations"],
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las tiendas");
    }

    const data: Location[] = await response.json();

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
      <div className="flex w-full min-h-[90vh] flex-row gap-6 bg-gray-50 p-6">

        {/* COLUMNA IZQUIERDA: 25% */}
        <aside className="w-1/4 min-w-0 flex flex-col gap-4 border-r pr-4">

          <h2 className="text-lg font-bold">
            Tiendas y empleados
          </h2>

          <SelectLocation
            locations={data}
            store={store}
          />

          {store && (
            <div className="w-full min-w-0">
              <h3 className="mb-3 font-semibold">
                Empleados registrados
              </h3>

              <div className="max-h-[65vh] overflow-y-auto pr-2">
                <EmployeesLocation store={store} />
              </div>
            </div>
          )}
        </aside>

        {/* COLUMNA DERECHA: 75% */}
        <main className="w-3/4 min-w-0 flex flex-col gap-6">

          {store ? (
            <>

              <FormNewLocation store={store} />
            <div className="flex flex-row flex-wrap justify-center items-center gap-4">

              <FormUpdateLocation store={store} />

              <DeleteLocationButton store={store} />
            </div>
            </>
          ) : (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-gray-500">
                Selecciona una tienda para consultar su información
                y administrar sus datos.
              </p>
            </div>
          )}

        </main>
      </div>
    );

  } catch (error) {
    console.error("Error en LocationsPage:", error);

    return (
      <p className="text-red-500">
        No fue posible cargar las tiendas.
      </p>
    );
  }
};

export default LocationsPage;
