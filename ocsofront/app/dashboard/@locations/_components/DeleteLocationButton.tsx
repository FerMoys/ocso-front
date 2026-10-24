
import deleteLocation from "@/actions/locations/delete";
import { Button } from "@nextui-org/react";

export default function DeleteLocationButton({
  store,
}: {
  store: string | string[] | undefined;
}) {
  if (!store) return null;

  return (
    <form action={deleteLocation} className="mt-4">
      <input
        type="hidden"
        name="store"
        value={Array.isArray(store) ? store[0] : store}
      />

      <Button
        type="submit"
            className="h-12 w-full bg-[#F74C39] text-base font-semibold text-white shadow-md transition-all hover:bg-[#DF3D2C] hover:shadow-lg sm:w-auto sm:min-w-48"
            radius="lg"
        >
        Borrar tienda
      </Button>
    </form>
  );
}
