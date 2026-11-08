"use server";

import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProduct(formData: FormData){
    const productId = formData.get("deleteValue");
    if (!productId) return;
    
    await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
            ...(await authHeaders()),
        }
    });

    revalidateTag("dashboard:products");
    redirect("/dashboard/products");
}