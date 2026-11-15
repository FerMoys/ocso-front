'use client';
import registerEmployee from "@/actions/users/register-employee";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { generate } from "generate-password";
import { LuEye } from "react-icons/lu";

export default function FormCreateUser({ employeeId }: { employeeId: string }) {
    const registerEmployeeById = registerEmployee.bind(null, employeeId);
    
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <form action={registerEmployeeById} className="flex flex-col gap-4">
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