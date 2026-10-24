import { createLocation } from "@/actions/locations/create";
import { API_URL, TOKEN_NAME } from "@/app/constants";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { cookies } from "next/headers";
import SelectManager from "./SelectManager";

export default async function FormNewLocation(){
    const cookieValue = cookies().get(TOKEN_NAME)?.value;

    if (!cookieValue) {
    throw new Error("No se encontró la sesión. Inicia sesión nuevamente.");
    }

    let session: { user?: unknown; token?: string };

    try {
    const value = cookieValue.startsWith("j:")
        ? cookieValue.slice(2)
        : cookieValue;

    session = JSON.parse(value);
    } catch {
    throw new Error("La cookie de sesión tiene un formato inválido.");
    }

    const token = session.token;

    if (!token) {
    throw new Error("La sesión no contiene un token válido.");
    }
    
    const responseManagers = await axios.get(`${API_URL}/managers`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const responseLocation = await axios.get(`${API_URL}/locations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return(
        <form action={createLocation}>
            <Input label= "Nombre" placeholder="ocso jurikiya" name= "locationName"/>
            <Input label= "Dirección" placeholder="Av. de la Luz S/N" name= "locationAddress"/> 
            <Input label= "Latitud" placeholder="20" name= "locationLat"/> 
            <Input label= "Longitud" placeholder="120" name= "locationLng"/> 
            <SelectManager managers={responseManagers.data} locations={responseLocation.data}/>
            <Button type="submit"> Subir </Button>
        </form>    )
}
