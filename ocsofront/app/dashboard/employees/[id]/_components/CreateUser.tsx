'use client';
import { type ReactNode } from "react";
import { 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    Button, 
    useDisclosure, 
    Image
} from "@nextui-org/react";

export default function CreateUser({
    employeeId, 
    photo,
    icon,
    children
}: {
    employeeId: string;
    photo?: string;
    icon?: ReactNode;
    children?: ReactNode;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {photo ? (
                <div 
                    onClick={onOpen} 
                    className="cursor-pointer relative size-40 rounded-full overflow-hidden shadow-inner mb-4 border-4 border-[#FFB336]/30 flex items-center justify-center bg-gray-100 transition-transform hover:scale-105"
                >
                    <Image
                        src={photo}
                        alt="User photo"
                        classNames={{
                            wrapper: "w-full h-full !max-w-full",
                            img: "object-cover w-full h-full"
                        }}
                    />
                </div>
            ) : (
                <Button
                    isIconOnly
                    className="h-12 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg"
                    radius="lg"
                    color="primary"
                    onPress={onOpen}
                >
                    {icon}
                </Button>
            )}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <div className="p-6">
                            <ModalHeader className="flex flex-col gap-1 text-[#F74C39] px-0 pt-0">
                                {employeeId ? "Gestión de Cuenta de Usuario" : "Crear Cuenta de Usuario"}
                            </ModalHeader>
                            <ModalBody className="px-0 py-2">
                                {children}
                            </ModalBody>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}