'use client';

import { Select, SelectItem } from "@nextui-org/react";
import { Provider } from "@/entities";

interface ProviderSelectProps {
    providers: Provider[];
    defaultProviderId?: string;
}

export default function ProviderSelect({ providers, defaultProviderId }: ProviderSelectProps) {
    // Aseguramos que la llave preseleccionada sea siempre un string válido
    const defaultKeys = defaultProviderId ? [String(defaultProviderId)] : [];

    return (
        <Select
            label="Proveedor"
            name="provider"
            placeholder="Selecciona un proveedor"
            defaultSelectedKeys={defaultKeys}
            isRequired
            size="sm"
            classNames={{
                trigger: "hover:border-[#FFB336]",
            }}
        >
            {providers.map((provider) => (
                <SelectItem key={String(provider.providerId)}>
                    {provider.providerName}
                </SelectItem>
            ))}
        </Select>
    );
}