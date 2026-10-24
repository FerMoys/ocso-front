"use server";

import { API_URL, TOKEN_NAME } from "@/app/constants";
import axios from "axios";
import { cookies } from "next/headers";

export default async function deleteLocation(){
    const token = cookies().get(TOKEN_NAME)?.value
    axios.delete(`${API_URL}/locations/`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}