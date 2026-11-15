"use server";

import { API_URL } from "@/app/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteEmployee(employeeId:string, formData: FormData) {
    formData.delete("$ACTION_REF_0")
    formData.delete("$ACTION_0:1")
    formData.delete("$ACTION_0:0")
    
    const response = await fetch(`${API_URL}/employees/${employeeId}`,{
        method: "DELETE",
        headers: {
            ...(await authHeaders())
        },
        body: formData,
    })

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al borrar empleado en el backend:", errorData);
        return;
    }

    if(response.status === 200 || response.status === 201) {
        revalidateTag("dashboard:employees");
        redirect("/dashboard/employees")
    }
    return;
}