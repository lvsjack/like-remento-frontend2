'use client';

import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface ConfirmModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </DialogFooter>
    </DialogContent>
  );
};

interface AlertModalProps {
  title: string;
  description: string;
  onClose?: () => void;
  buttonText?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  title,
  description,
  onClose,
  buttonText = 'OK'
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={onClose}>{buttonText}</Button>
      </DialogFooter>
    </DialogContent>
  );
};

interface FormModalProps {
  title: string;
  description?: string;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
}

export const FormModal: React.FC<FormModalProps> = ({
  title,
  description,
  onSubmit,
  onCancel,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel'
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <form onSubmit={onSubmit}>
        {children}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button type="submit">{submitText}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
