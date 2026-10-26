import { API_URL, TOKEN_NAME } from "@/app/constants";
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocations";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton";
import { authHeaders} from "@/helpers/authHeaders";

const LocationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {

  try {
    let response = await fetch(
      `${API_URL}/locations`,
      {
        headers: {
          ...authHeaders()
        },
        next:{tags:["dashboard:locations"]}
      }
    );
    let data:Location[] = await response.json()

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
        <FormNewLocation store={store}/>
        <DeleteLocationButton store={store}/>
      </div>
    );
  } catch (error) {

    return (
      <p className="text-red-500">
        No fue posible cargar las tiendas.
      </p>
    );
  }
};

export default LocationsPage;