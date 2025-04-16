'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ImageIcon, MessageSquareIcon, UploadIcon } from 'lucide-react';

interface PromptCategory {
  id: string;
  name: string;
  icon: string;
}

const categories: PromptCategory[] = [
  { id: 'childhood', name: 'Childhood', icon: '👶' },
  { id: 'parents', name: 'Parents', icon: '👨‍👩‍👧‍👦' },
  { id: 'education', name: 'Early Education', icon: '🎓' },
  { id: 'teenage', name: 'Teenage Years', icon: '🎮' },
  { id: 'career', name: 'Career', icon: '💼' },
  { id: 'romance', name: 'Romance', icon: '❤️' }
];

interface PromptModalProps {
  onClose: () => void;
  onSubmit: (data: { type: string; content: string }) => void;
}

type Step = 'select' | 'photo' | 'question' | 'category' | 'final';

export const PromptModal: React.FC<PromptModalProps> = ({
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState<Step>('select');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [promptType, setPromptType] = useState<'photo' | 'question' | null>(
    null
  );

  const questions = {
    parents: [
      'What was your favorite room in the house you grew up in?',
      'What is your earliest childhood memory?',
      'What was the hardest thing you had to overcome as a child?',
      'Did you have any pets growing up and how did they come into your life?'
    ]
  };

  const handleSubmit = () => {
    if (promptType === 'photo') {
      // Handle photo upload
      onSubmit({ type: 'photo', content: '' });
    } else {
      onSubmit({
        type: 'question',
        content: customQuestion || selectedQuestion || ''
      });
    }
  };

  const renderSelectStep = () => (
    <div className="grid grid-cols-2 gap-4">
      <Card
        className="group relative p-6 cursor-pointer transition-all duration-200 hover:bg-accent/5 flex flex-col items-center justify-center gap-4 border rounded-xl"
        onClick={() => {
          setPromptType('photo');
          setStep('photo');
        }}
      >
        <div className="rounded-full bg-primary/5 p-4">
          <ImageIcon className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-base mb-1 text-foreground">
            Upload a photo
          </h3>
          <p className="text-sm text-muted-foreground">
            Add a photo to inspire a story
          </p>
        </div>
      </Card>
      <Card
        className="group relative p-6 cursor-pointer transition-all duration-200 hover:bg-accent/5 flex flex-col items-center justify-center gap-4 border rounded-xl"
        onClick={() => {
          setPromptType('question');
          setStep('question');
        }}
      >
        <div className="rounded-full bg-primary/5 p-4">
          <MessageSquareIcon className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-base mb-1 text-foreground">
            Add a question
          </h3>
          <p className="text-sm text-muted-foreground">
            Write your own or browse questions written by our team of experts
          </p>
        </div>
      </Card>
    </div>
  );

  const renderPhotoStep = () => (
    <div className="space-y-6">
      <Card className="flex flex-col items-center justify-center p-12 border border-dashed rounded-xl hover:border-primary transition-colors duration-200 cursor-pointer">
        <div className="rounded-full bg-primary/5 p-4 mb-4">
          <UploadIcon className="h-6 w-6 text-primary" />
        </div>
        <p className="font-medium text-foreground">Select Files to Upload</p>
        <p className="text-sm text-muted-foreground mt-2">
          or Drag and Drop, Copy and Paste Files
        </p>
      </Card>
    </div>
  );

  const renderQuestionStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium text-foreground">
          Type a question
        </label>
        <Textarea
          placeholder="Type a question"
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          maxLength={120}
          className="min-h-[100px] resize-none focus:ring-1 focus:ring-primary bg-background text-foreground rounded-lg"
        />
        <div className="text-xs text-muted-foreground text-right">
          {120 - customQuestion.length} characters left
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">
          Or select a question
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:bg-accent/5 rounded-xl ${
                selectedCategory === category.id
                  ? 'border-primary bg-primary/5'
                  : 'border'
              }`}
              onClick={() => {
                setSelectedCategory(category.id);
                setStep('category');
              }}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="rounded-full bg-primary/5 p-2">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <span className="font-medium text-sm text-foreground">
                  {category.name}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCategoryStep = () => (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
          <div className="rounded-full bg-primary/5 p-2">
            <span className="text-xl">
              {categories.find((c) => c.id === selectedCategory)?.icon}
            </span>
          </div>
          <span className="font-medium text-foreground">
            {categories.find((c) => c.id === selectedCategory)?.name}
          </span>
        </div>

        {selectedCategory &&
          questions[selectedCategory as keyof typeof questions] && (
            <div className="space-y-2">
              {questions[selectedCategory as keyof typeof questions].map(
                (question, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                      selectedQuestion === question
                        ? 'bg-primary/5 border-primary border'
                        : 'border hover:border-primary/30 hover:bg-accent/5'
                    }`}
                    onClick={() => {
                      setSelectedQuestion(question);
                      setStep('final');
                    }}
                  >
                    <input
                      type="radio"
                      checked={selectedQuestion === question}
                      onChange={() => {}}
                      className="h-4 w-4 text-primary border-accent"
                    />
                    <p className="text-foreground text-sm">{question}</p>
                  </div>
                )
              )}
            </div>
          )}
      </div>
    </div>
  );

  const renderFinalStep = () => (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-accent/5 text-foreground">
        {selectedQuestion}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 'select':
        return renderSelectStep();
      case 'photo':
        return renderPhotoStep();
      case 'question':
        return renderQuestionStep();
      case 'category':
        return renderCategoryStep();
      case 'final':
        return renderFinalStep();
    }
  };

  return (
    <DialogContent className="sm:max-w-[600px] p-0 max-h-[90vh] overflow-y-auto bg-background rounded-xl">
      <div className="flex items-center justify-between p-4 border-b">
        {step !== 'select' && (
          <Button
            variant="ghost"
            onClick={() => setStep('select')}
            className="w-10 h-10 p-0 hover:bg-accent/5"
          >
            <span className="sr-only">Back</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        )}
        <DialogTitle className="text-lg font-semibold text-foreground flex-1 text-center">
          {step === 'photo' ? 'Upload a photo' : 'Add a prompt'}
        </DialogTitle>
      </div>

      <div className="p-6">{renderContent()}</div>

      {(step === 'photo' ||
        step === 'question' ||
        step === 'category' ||
        step === 'final') && (
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            {step === 'photo' && '1 photo uploaded'}
            {step === 'category' && '1 prompt selected'}
          </div>
          <Button
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {step === 'photo' ? 'Next' : 'Add'}
          </Button>
        </div>
      )}
    </DialogContent>
  );
};
