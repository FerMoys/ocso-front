
"use client";

import { useState, type ReactNode } from "react";
import {LuPenLine} from "react-icons/lu"
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

interface CreateEmployeeProps {
  children: ReactNode;
}

export default function CreateEmployee({
  children,
}: CreateEmployeeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color="primary"
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
            Crear empleado
          </ModalHeader>

          <ModalBody className="pb-6">
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
