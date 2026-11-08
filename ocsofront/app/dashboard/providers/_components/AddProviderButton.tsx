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
import createProvider from "@/actions/providers/create";

export default function AddProviderButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const formData = new FormData(e.currentTarget);
            await createProvider(formData);
            
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
            >
                <LuPlus size="20"/>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1 text-[#F74C39]">
                                Agregar Nuevo Proveedor
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Nombre del Proveedor"
                                    name="providerName"
                                    placeholder="Ej. Coca-Cola"
                                    isRequired
                                    size="sm"
                                />
                                <Input
                                    label="Correo Electrónico"
                                    name="providerEmail"
                                    type="email"
                                    placeholder="proveedor@email.com"
                                    isRequired
                                    size="sm"
                                />
                                <Input
                                    label="Teléfono"
                                    name="providerPhoneNumber"
                                    placeholder="4421234567"
                                    isRequired
                                    size="sm"
                                />
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
                                    Guardar Proveedor
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}