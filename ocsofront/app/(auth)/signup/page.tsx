import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Link from "next/link"; 

export default function SignupPage(){
    return (
        <div className="bg-[#FFB336] text-[#FFFFFF] px-10 py-6 rounded-lg shadow-lg">
            <p className="text-2xl my-4 font-bold text-center">Registrarse</p>
            
            <div className="flex flex-col gap-3 my-4">
               <Input label="Email" type="email" isRequired={true} size="sm" />
               <Input label="Contraseña" type="password" isRequired={true} size="sm" />
               <Input label="Repetir comtraseña" type="password" isRequired={true} size="sm" />
            </div>
            
            <div className="flex flex-col items-center gap-2">
                <Button className="bg-[#F74C39] text-[#FFFFFF] font-semibold w-full"> 
                    Registrarse 
                </Button>
                <p className="text-sm my-4">
                    ¿Ya tienes una cuenta? <Link href="/login" className="underline font-semibold text-blue-600 underline">Inicia Sesión</Link> 
                </p>
            </div>
        </div>
    );
}