"use server";

import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProvider(formData: FormData){
    const providerId = formData.get("deleteValue");
    if (!providerId) return;
    
    await fetch(`${API_URL}/providers/${providerId}`, {
        method: "DELETE",
        headers: {
            ...(await authHeaders()),
        }
    });

    revalidateTag("dashboard:providers");
    redirect("/dashboard/providers");
}