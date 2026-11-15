import { Input, Button } from "@nextui-org/react";
import SelectStore from "./SelectStore";
import { Location } from "@/entities";

export default function FormCreateManager({ stores }: { stores: Location[] }) {
    return (
        <form className="flex flex-col gap-4">
            <Input 
                name="managerFullName" 
                label="Nombre completo" 
                variant="bordered" 
                radius="lg" 
                isRequired 
            />
            <Input 
                name="managerSalary" 
                label="Salario" 
                type="number"
                variant="bordered" 
                radius="lg" 
                isRequired 
            />
            <Input 
                name="managerEmail" 
                label="Correo electrónico" 
                type="email"
                variant="bordered" 
                radius="lg" 
                isRequired 
            />
            <Input 
                name="managerPhoneNumber" 
                label="Número de teléfono" 
                variant="bordered" 
                radius="lg" 
                isRequired 
            />
            <div className="pt-1">
                <SelectStore stores={stores} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <Button 
                    color="primary" 
                    type="submit" 
                    className="bg-[#FFB336] text-black font-semibold shadow-md"
                >
                    Registrar Gerente
                </Button>
            </div>
        </form>
    );
}