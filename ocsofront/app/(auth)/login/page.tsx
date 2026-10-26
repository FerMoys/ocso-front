'use client';
import { API_URL } from "@/app/constants";
import { Button} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Link from "next/link"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage(){
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter();
    const handleSubmit = async (e: any) => {
         e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            let authData: any = {}
            authData.userEmail = formData.get("userEmail")
            authData.userPassword = formData.get("userPassword")

            const response = await fetch(`${API_URL}/auth/login`, {
                method:"POST",
                body: JSON.stringify(authData),
                credentials: 'include'
            });
            console.log('Estado:', response.status);
            console.log('Antes de redirigir');
            router.push('/dashboard');
            console.log("Login exitoso:", response);
            if (response.status === 201) router.push('/dashboard');
            setSubmitting(false);
        } catch (e) {
            setSubmitting(false);
        }
    }

    return(
        <form className="bg-[#FFB336] text-[#FFFFFF] px-10 py-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <p className="text-2xl my-4 font-bold text-center">Iniciar Sesión</p>
                
                <div className="flex flex-col gap-3 my-4">
                <Input label="Email" name="userEmail" type="email" isRequired={true} size="sm" />
                <Input label="Contraseña" name="userPassword" type="password" isRequired={true} size="sm" />
                </div>
                
               <div className="flex flex-col items-center gap-2">
                    <Button 
                        type="submit" 
                        isDisabled={submitting}
                        isLoading={submitting}
                        className="bg-[#F74C39] text-[#FFFFFF] font-semibold w-full"
                    > 
                        {submitting ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>
                    <p className="text-sm my-4">
                        ¿No tienes una cuenta? <Link href="/signup" className="underline font-semibold text-blue-600">Regístrate</Link> 
                    </p>
                </div>
        </form>
    )
}