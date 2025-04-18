'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

// Logo Component
const Logo = () => (
  <div className="flex items-center text-xl font-semibold tracking-tight text-white">
    <div className="relative w-8 h-8 mr-3">
      <div className="absolute inset-0 bg-primary rounded-full opacity-30"></div>
      <div className="absolute inset-1 bg-primary rounded-full opacity-90"></div>
    </div>
    Momorey AI
  </div>
);

interface WelcomeStepProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onContinue: () => void;
}

export default function WelcomeStep({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  onContinue
}: WelcomeStepProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onContinue();
  };

  return (
    <div className="relative w-full max-w-lg flex flex-col items-center ">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary-foreground opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>

      <header className="w-full mb-16 md:mb-24 self-start px-2 md:px-0">
        <Logo />
      </header>

      <main className="w-full flex flex-col items-center justify-center text-center px-6 md:px-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
          Good evening.
        </h1>
        <p className="text-2xl md:text-3xl text-white/70 mb-12 md:mb-16 font-medium">
          It&apos;s time to share your next story.
        </p>

        <form className="w-full text-left space-y-8" onSubmit={handleSubmit}>
          {/* Name Inputs */}
          <div className="space-y-3">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-white/80 block"
            >
              Your name
            </Label>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                id="firstName"
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 bg-white/5 border-white/10 hover:border-white/20 focus:border-primary/70 rounded-xl transition-colors placeholder:text-white/40 text-white"
                required
              />
              <Input
                id="lastName"
                type="text"
                placeholder="Your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 bg-white/5 border-white/10 hover:border-white/20 focus:border-primary/70 rounded-xl transition-colors placeholder:text-white/40 text-white"
                required
              />
            </div>
          </div>

          {/* Telephone Input */}
          <div className="space-y-3">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-white/80 block"
            >
              Your telephone number
            </Label>
            <div className="flex items-center h-12 bg-white/5 border border-white/10 hover:border-white/20 focus-within:border-primary/70 rounded-xl px-4 transition-colors">
              <div className="flex items-center gap-2 pr-3 border-r border-white/20">
                <span className="text-base">🇺🇸</span>
                <span className="text-sm text-white/80">+1</span>
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 h-full bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 placeholder:text-white/40 text-white"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-medium transition-colors mt-8"
          >
            Continue
          </Button>
        </form>

        <Link
          href="#"
          className="mt-6 text-sm text-white/50 hover:text-white/70 transition-colors"
        >
          Learn more
        </Link>
      </main>
    </div>
  );
}
