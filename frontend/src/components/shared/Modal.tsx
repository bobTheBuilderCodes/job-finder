
import React, { ReactNode, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";



interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {


  return isOpen ? (
    <div className="fixed backdrop-blur-sm z-50 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-35"></div>
        </div>

        <div className="bg-white p-4 rounded-lg z-10 relative min-w-1/4 min-h-28">
          <button
            className="absolute top-0 right-0 m-3 text-gray-700 text-2xl"
            onClick={onClose}
          >
       <AiFillCloseCircle />
          </button>
          <div className="modal-content text-gray-100 h-[92vh] overflow-y-auto ">{children}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
