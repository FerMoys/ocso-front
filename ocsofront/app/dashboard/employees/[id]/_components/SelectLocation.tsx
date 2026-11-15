"use client";

import { Location } from "@/entities";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectLocation({stores} : {stores: Location[]}){
    return(
        <Select label="Tienda" name="location">
            {
                stores.map((store: Location) => (
                    <SelectItem key={String(store.locationId)}>
                        {store.locationName}
                    </SelectItem>
                ))
            }
        </Select>
    )
}