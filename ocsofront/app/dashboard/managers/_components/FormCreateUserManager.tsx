'use client';
import registerManager from "@/actions/users/register-manager";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { generate } from "generate-password";
import { LuEye } from "react-icons/lu";

export default function FormCreateUserManager({ managerId }: {managerId: string }) {
    const registerManagerById = registerManager.bind(null, managerId);
    
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <form action={registerManagerById} className="flex flex-col gap-4">
            <Input 
                name="userEmail" 
                label="Correo de cuenta" 
                variant="bordered" 
                radius="lg" 
                isRequired 
            />
            <Input 
                value={password}
                // 2. Agregar onChange para permitir escritura manual y evitar errores de React
                onChange={(e) => setPassword(e.target.value)}
                name="userPassword" 
                label="Contraseña" 
                type={visible ? "text" : "password"} 
                variant="bordered" 
                radius="lg" 
                isRequired 
                endContent={
                    <button 
                        type="button" 
                        onMouseUp={() => setVisible(false)} 
                        onMouseDown={() => setVisible(true)}
                        className="focus:outline-none"
                    >
                        <LuEye size={22} />
                    </button>
                }
            />
            <Button 
                color="danger"
                className="text-white font-semibold shadow-md"
                type="button" // ¡Importante para que no disponga el submit del formulario!
                onPress={() => {
                    setPassword(generate({
                        length: 10,
                        numbers: true,
                        symbols: true,
                        uppercase: true,
                        lowercase: true
                    }));
                }}
            >
                Generar Contraseña
            </Button>
            <div className="flex justify-end gap-2 pt-2">
                <Button 
                    color="primary" 
                    type="submit" 
                    className="bg-[#FFB336] text-black font-semibold shadow-md"
                >
                    Registrar Usuario
                </Button>
            </div>
        </form>
    );
}