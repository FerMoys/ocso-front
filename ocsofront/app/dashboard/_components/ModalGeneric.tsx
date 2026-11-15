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

export default function ModalGeneric({
    icon,
    children
}: {
    icon?: ReactNode;
    children?: ReactNode;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
                <Button
                    className="h-12 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg"
                    radius="lg"
                    color="primary"
                    onPress={onOpen}
                >
                    {icon}
                </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <div className="p-6">
                            <ModalHeader className="flex flex-col gap-1 text-[#F74C39] px-0 pt-0">
                                
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