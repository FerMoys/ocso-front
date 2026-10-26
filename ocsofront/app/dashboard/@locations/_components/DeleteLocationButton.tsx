import deleteLocation from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";

export default function DeleteLocationButton({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (!store) return null;

  const locationId = Array.isArray(store) ? store[0] : store;

  return (
    <form action={deleteLocation}>
      <input
        type="hidden"
        name="store"
        value={locationId}
      />

      <Button
        type="submit"
        className="h-12 bg-[#F74C39] text-base font-semibold text-white shadow-md transition-all hover:bg-[#DF3D2C] hover:shadow-lg"
        radius="lg"
      >
        Borrar tienda
      </Button>
    </form>
  );
}