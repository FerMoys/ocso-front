
"use client";

import { useState, type ReactNode } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { LuPenLine } from "react-icons/lu";

interface UpdateLocationProps {
  children: ReactNode;
}

export default function UpdateLocation({
  children,
}: UpdateLocationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="h-12  text-base font-semibold text-white shadow-md transition-all  hover:shadow-lg"
        radius="lg"
        color="primary"
        onPress={() => setIsOpen(true)}
      >
        <LuPenLine size="20"/>
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
