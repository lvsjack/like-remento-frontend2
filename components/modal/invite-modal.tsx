'use client';

import React, { useState } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface InviteModalProps {
  onSubmit: (email: string) => void;
  onClose?: () => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({
  onSubmit,
  onClose
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email.trim());
      setEmail('');
    }
  };

  // Example data - replace with real data from your app
  const people = [
    {
      id: '1',
      name: 'Aden',
      email: 'aden@hotmail.com',
      role: 'Storyteller',
      avatarUrl: 'https://avatar.iran.liara.run/public/boy'
    },
    {
      id: '2',
      name: 'Jack2 Yin',
      email: 'ivejack@hotmail.com',
      role: 'Owner',
      avatarUrl: 'https://avatar.iran.liara.run/public/boy'
    }
  ];

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <DialogTitle>Invite to project</DialogTitle>
        </div>
        <DialogDescription>
          Collaborators can view stories and customize prompts.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit">Invite</Button>
      </form>
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-3">People with access</h4>
        <div className="space-y-3">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={person.avatarUrl} />
                  <AvatarFallback>
                    {person.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {person.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {person.email}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-3">Invite via link</h4>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground flex-1">
            Anyone can use this link to sign up to access stories recorded in
            this project.
          </p>
          <Button variant="outline" size="sm">
            Copy link
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
