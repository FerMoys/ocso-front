import { API_URL, TOKEN_NAME } from "@/app/constants";
import { Location } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import Link from "next/link";


export default async function LocationCard({store}: {store: string | string[] | undefined}){
    if(!store) return null;
    const locationId = Array.isArray(store) ? store[0] : store;

    const response = await fetch(
        `${API_URL}/locations/${encodeURIComponent(locationId)}`,
        {
        headers: {...authHeaders()},
        next: {tags:["dashboard:locations", `dashboard:locations/${store}`]}
        }
    );
    const data: Location = await response.json()
    return (
        <Card>
            <CardHeader>
                <p className="w-full gap-2">
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