
"use client";

import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SelectLocation({
  locations,
  store,
}: {
  locations: Location[];
  store: string | string[] | undefined;
}) {
  const router = useRouter();

  return (
    <Select
      placeholder="Selecciona una tienda"
      label="Tienda"
      classNames={{
        mainWrapper:
          "hover:ring-2 ring-[#FFB336] rounded-xl transition-all",
      }}
      selectedKeys={
        store ? [String(store)] : []
      }
      onChange={(e) => {
        const selectedStore = e.target.value;

        if (!selectedStore) {
          router.push("/dashboard");
        } else {
          router.push(
            `/dashboard?store=${encodeURIComponent(selectedStore)}`
          );
        }
      }}
    >
      {locations.map((location) => (
        <SelectItem
          key={String(location.locationId)}
          value={String(location.locationId)}
        >
          {location.locationName}
        </SelectItem>
      ))}
    </Select>
  );
}
