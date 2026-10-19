import { API_URL, TOKEN_NAME } from "@/app/constants";
import { Location } from "@/entities";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";


export default async function LocationCard({store}: {store: string | string[] | undefined}){
    if(!store) return null;
    const token = cookies().get(TOKEN_NAME)?.value;
    const {data} = await axios.get<Location>(`${API_URL}/locations/${store}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

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

              </CardBody>x
        </Card>
    )
}