import updateProvider from "@/actions/providers/update";
import { Provider } from "@/entities";
import { Input, Button } from "@nextui-org/react";

export default function FormUpdateProvider({provider}:{provider: Provider}){
    const {providerId} = provider;
    const updateProviderWithId =updateProvider.bind(null, providerId)
    
    return(
        <form action={updateProviderWithId}
        className="flex flex-wrap gap-4 flex-grow-0">
                    <h1 className="text-xl px-10"> Actualizar datos </h1>
                    <Input className="max-w-[250px]"
                        isRequired
                        label="Nombre completo"
                        defaultValue={provider.providerName}
                        placeholder="Marco Aurelio"
                        name="providerFullName"
                    />
                    <Input className="max-w-[250px]"
                        isRequired
                        label="Correo electrónico"
                        defaultValue={provider.providerEmail}
                        placeholder="provider@ocso.com"
                        name="providerEmail"
                    />
                    <Input className="max-w-[250px]"
                        isRequired
                        label="Número de teléfono"
                        defaultValue={provider.providerPhoneNumber}
                        placeholder="4421435679"
                        name="providerPhoneNumber"
                    />
                    <Button color="primary" type="submit">
                        Actualizar
                    </Button>
                </form>
    )
}