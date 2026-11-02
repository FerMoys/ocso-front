
"use client";

import { useState, type ReactNode } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

interface UpdateManagerProps {
  children: ReactNode;
}

export default function UpdateManager({
  children,
}: UpdateManagerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="h-12 bg-[#F74C39] text-base font-semibold text-white shadow-md transition-all hover:bg-[#DF3D2C] hover:shadow-lg"
        radius="lg"
        onPress={() => setIsOpen(true)}
      >
        Actualizar manager
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="center"
        scrollBehavior="inside"
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>
            Actualizar manager
          </ModalHeader>

          <ModalBody className="pb-6">
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
