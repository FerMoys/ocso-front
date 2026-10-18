import axios from "axios";
import {cookies} from "next/headers"
import {TOKEN_NAME} from "@/app/constants"

const CountPage = async () => {
    const userCookies = cookies()
    const token = userCookies.get(TOKEN_NAME)?.value
    const countLocations = await axios.get("http://127.0.0.1:3003/locations",{
        headers: {
            Authorization: `Bearer ${token}`
        }
})
    return `Hay ${countLocations?.data?.length} tiendas`;
}

export default CountPage;