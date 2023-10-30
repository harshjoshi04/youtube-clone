"use client";
import React from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import VideoContent from "./VideoContent";

export default function VideoModel({ isOpen, onOpenChange }) {
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
              <VideoContent onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
