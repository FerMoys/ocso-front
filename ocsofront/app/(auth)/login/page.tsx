'use client';
import { API_URL } from "@/app/constants";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link"; 

export default function LoginPage(){
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const userEmail = formData.get("userEmail");
        const userPassword = formData.get("userPassword");

        try {
            const { data } = await axios.post(`${API_URL}/auth/login`, {
                userEmail,      
                userPassword
            });
            
            console.log("Login exitoso:", data);
            
        } catch (error) {
             if (axios.isAxiosError(error)) {
                console.error(
                    "Errores de validación:",
                    JSON.stringify(error.response?.data, null, 2)
                );
            } else {
                console.error(error);
            }
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
                    <Button type="submit" className="bg-[#F74C39] text-[#FFFFFF] font-semibold w-full"> 
                        Iniciar sesión
                    </Button>
                    <p className="text-sm my-4">
                        ¿No tienes una cuenta? <Link href="/signup" className="underline font-semibold text-blue-600">Regístrate</Link> 
                    </p>
                </div>
        </form>
    )
}