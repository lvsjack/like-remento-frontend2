'use client';

import React from 'react';
import { useModal } from './modal-context';
import { Button } from '@/components/ui/button';

export const ModalExample: React.FC = () => {
  const { showModal } = useModal();

  const handleConfirm = () => {
    showModal('confirm', {
      title: 'Confirm Action',
      description: 'Are you sure you want to proceed with this action?',
      onConfirm: () => {
        console.log('Confirmed!');
      },
      onCancel: () => {
        console.log('Cancelled!');
      }
    });
  };

  const handleAlert = () => {
    showModal('alert', {
      title: 'Alert',
      description: 'This is an important message!',
      onClose: () => {
        console.log('Alert closed!');
      }
    });
  };

  const handleForm = () => {
    showModal('form', {
      title: 'Submit Form',
      description: 'Please fill out the form below',
      onSubmit: (data: any) => {
        console.log('Form submitted:', data);
      },
      children: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
          />
        </div>
      )
    });
  };

  const handleCustom = () => {
    showModal('custom', {
      content: (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Custom Modal</h2>
          <p>This is a custom modal with any content you want!</p>
        </div>
      )
    });
  };

  return (
    <div className="space-x-4">
      <Button onClick={handleConfirm}>Show Confirm Modal</Button>
      <Button onClick={handleAlert}>Show Alert Modal</Button>
      <Button onClick={handleForm}>Show Form Modal</Button>
      <Button onClick={handleCustom}>Show Custom Modal</Button>
    </div>
  );
};
