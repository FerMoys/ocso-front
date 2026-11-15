"use client";
import updateUser from "@/actions/users/update";
import { User } from "@/entities";
import { Button, Input } from "@nextui-org/react";
import { generate } from "generate-password";
import { useState } from "react";
import { LuEye } from "react-icons/lu";

export default function FormUpdateUserEmployee({user}:{user:User}){
    const {userId} = user;
    const updateUserById = updateUser.bind(null, userId);
        
        const [password, setPassword] = useState<string>("");
        const [visible, setVisible] = useState<boolean>(false);
    
        return (
            <form action={updateUserById} className="flex flex-col gap-4">
                <Input 
                defaultValue={user.userEmail}
                    name="userEmail" 
                    label="Correo de cuenta" 
                    variant="bordered" 
                    radius="lg" 
                    isRequired 
                />
                <Input 
                    value={password}
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
                    type="button"
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
                        Actualizar Usuario
                    </Button>
                </div>
            </form>
        );
}