import { API_URL, TOKEN_NAME } from "@/app/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";


export default async function LocationCard({store}: {store: string | string[] | undefined}){
    if(!store) return null;
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

    const { data } = await axios.get<Location>(
    `${API_URL}/locations/${store}`,
    {
        headers: {
        ...authHeaders()
        },
    }
    );

    return (
        <Card>
            <CardHeader>
                <p className="w-full">
                Tienda: <b>{data.locationName}</b>
            </p>
            </CardHeader>
             <Divider/>
              <CardBody>  
                <p className="w-full"> Manager:
                    <Link href={{pathname: '/dashboard/manager'}}>
                    <b>{data.manager?.managerFullName}</b> 
                    </Link>    
                </p>

              </CardBody>
        </Card>
    )
}