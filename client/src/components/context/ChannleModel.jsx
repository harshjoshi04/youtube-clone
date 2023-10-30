"use client";
import React from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import MainContent from "./MainContent";
export default function ChannleModel({ isOpen, onOpenChange }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-[#222222]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <MainContent onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
