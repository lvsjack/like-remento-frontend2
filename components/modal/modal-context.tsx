'use client';

import React, { createContext, useContext, useState } from 'react';
import { Dialog } from '@/components/ui/modal';
import { ConfirmModal, AlertModal, FormModal } from './modal-types';

type ModalType = 'confirm' | 'alert' | 'form' | 'custom';

interface ModalContextType {
  showModal: (type: ModalType, props: any) => void;
  hideModal: () => void;
  modalState: {
    isOpen: boolean;
    type: ModalType | null;
    props: any;
  };
}

interface ConfirmModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface AlertModalProps {
  title: string;
  description: string;
  onClose?: () => void;
  buttonText?: string;
}

interface FormModalProps {
  title: string;
  description?: string;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
}

interface CustomModalProps {
  content: React.ReactNode;
}

type ModalProps =
  | (ConfirmModalProps & { type: 'confirm' })
  | (AlertModalProps & { type: 'alert' })
  | (FormModalProps & { type: 'form' })
  | (CustomModalProps & { type: 'custom' });

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: ModalType | null;
    props: any;
  }>({
    isOpen: false,
    type: null,
    props: {}
  });

  const showModal = (type: ModalType, props: any) => {
    setModalState({ isOpen: true, type, props });
  };

  const hideModal = () => {
    setModalState({ isOpen: false, type: null, props: {} });
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modalState }}>
      {children}
      <Dialog open={modalState.isOpen} onOpenChange={hideModal}>
        {modalState.type === 'confirm' && (
          <ConfirmModal {...modalState.props} />
        )}
        {modalState.type === 'alert' && <AlertModal {...modalState.props} />}
        {modalState.type === 'form' && <FormModal {...modalState.props} />}
        {modalState.type === 'custom' && modalState.props.content}
      </Dialog>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
