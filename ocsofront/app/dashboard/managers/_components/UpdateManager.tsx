
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

interface UpdateManagerProps {
  children: ReactNode;
}

export default function UpdateManager({
  children,
}: UpdateManagerProps) {
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
