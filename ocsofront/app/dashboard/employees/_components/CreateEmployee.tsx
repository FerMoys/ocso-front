"use client";

import { useState, type ReactNode } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

export default function CreateEmployee({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        className="h-12 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg"
        radius="lg"
        color="primary"
        onPress={() => setIsOpen(true)}
      >
        {icon}
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
            Actualizar tienda
          </ModalHeader>

          <ModalBody className="pb-6">
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}