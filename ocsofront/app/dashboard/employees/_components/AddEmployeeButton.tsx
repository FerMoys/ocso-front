'use client';
import { useState } from "react";
import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure, 
    Input 
} from "@nextui-org/react";
import { LuPlus } from "react-icons/lu";
import createEmployee from "@/actions/employees/create";

export default function AddEmployeeButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const formData = new FormData(e.currentTarget);
            await createEmployee(formData);
            
            onOpenChange();
        } catch (error) {
            console.error("Error al crear el proveedor:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Button
                onPress={onOpen}
                color="primary"
                className="text-white font-semibold flex items-center gap-2 w-fit"
                aria-label="Agregar empleado"
            >
                <LuPlus size={20} />
                Agregar empleado
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1 text-[#F74C39]">
                                Agregar Nuevo Empleado
                            </ModalHeader>
                            <ModalBody>
                                <Input 
                    label="Nombre" 
                    name="employeeName" 
                    variant="bordered"
                    radius="lg"
                    placeholder="Marco"
                />
                <Input 
                    isRequired={true} 
                    label="Apellidos" 
                    name="employeeLastName"                    variant="bordered"
                    radius="lg"
                    placeholder="Bott"
                />
                <Input 
                    isRequired={true} 
                    label="Correo electrónico" 
                    name="employeeEmail"                 
                    variant="bordered"
                    radius="lg"
                    placeholder="marcosecondhalf@gmail.com"
                />
                <Input 
                    isRequired={true} 
                    label="Num. de Teléfono" 
                    name="employeePhoneNumber"  
                    variant="bordered"
                    radius="lg"
                    placeholder="4421345678"
                />
                
                <div className="flex flex-col gap-1.5 pt-1">
                    <label className="text-xs font-semibold text-gray-600 ml-1">Actualizar Fotografía</label>
                    <input 
                        type="file" 
                        name="employeePhoto"
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFB336]/20 file:text-[#F74C39] hover:file:bg-[#FFB336]/30 text-sm text-gray-500 cursor-pointer"
                    />
                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button 
                                    color="primary" 
                                    type="submit" 
                                    isLoading={submitting}
                                    className="bg-[#FFB336] text-black font-semibold"
                                >
                                    Guardar Empleado
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}