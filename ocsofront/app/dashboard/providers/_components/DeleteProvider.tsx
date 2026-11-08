'use client';
import { useState } from "react";
import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure 
} from "@nextui-org/react";
import { LuTrash } from "react-icons/lu";
import deleteProvider from "@/actions/providers/delete"; // Ajusta la ruta de importación si es necesario

export default function DeleteProviderButton({ providerId }: { providerId: string }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const formData = new FormData(e.currentTarget);
            await deleteProvider(formData);
            onOpenChange();
        } catch (error) {
            console.error("Error al borrar el proveedor:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Botón que abre el modal de confirmación */}
            <Button 
                onPress={onOpen} 
                color="danger"
                className="text-white font-semibold flex items-center gap-2 w-fit"
            >
                <LuTrash size="20"/>
            </Button>

            {/* Modal de confirmación */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            {/* Input oculto que envía el ID del proveedor al Server Action */}
                            <input type="hidden" name="deleteValue" value={providerId} />

                            <ModalHeader className="flex flex-col gap-1 text-[#F74C39]">
                                Borrar Proveedor
                            </ModalHeader>
                            
                            <ModalBody>
                                <p className="text-gray-600">
                                    ¿Estás seguro de que deseas eliminar este proveedor? Esta acción no se puede deshacer.
                                </p>
                            </ModalBody>

                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button 
                                    color="danger" 
                                    type="submit" 
                                    isLoading={submitting}
                                    className="font-semibold"
                                >
                                    Sí, eliminar
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}