'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Import Progress component
import { ChevronLeft } from 'lucide-react'; // Import icons
import Welcome from '@/components/Welcome'; // Import the new component
import Recording from '@/components/record/Recording';
import RecordSetup from '@/components/record/RecordSetup';
import RecordReview from '@/components/record/RecordReview';

// Mock prompt data - replace with actual data fetching
const mockPrompts = {
  '1': {
    text: 'What is happening in this photo?',
    imageUrl:
      'https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=3716&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
};

type RecordingMode = 'audio' | 'video';

// StepsIndicator component
function StepsIndicator({
  currentStep,
  isDark = false
}: {
  currentStep: number;
  isDark?: boolean;
}) {
  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            currentStep === 1
              ? 'bg-primary'
              : isDark
                ? 'bg-zinc-700'
                : 'bg-zinc-200'
          }`}
        ></div>
        <span
          className={`text-sm ${
            currentStep === 1
              ? isDark
                ? 'text-white'
                : 'text-zinc-900'
              : isDark
                ? 'text-zinc-400'
                : 'text-zinc-500'
          }`}
        >
          1 Setup
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            currentStep === 2
              ? 'bg-primary'
              : isDark
                ? 'bg-zinc-700'
                : 'bg-zinc-200'
          }`}
        ></div>
        <span
          className={`text-sm ${
            currentStep === 2
              ? isDark
                ? 'text-white'
                : 'text-zinc-900'
              : isDark
                ? 'text-zinc-400'
                : 'text-zinc-500'
          }`}
        >
          2 Record
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            currentStep === 3
              ? 'bg-primary'
              : isDark
                ? 'bg-zinc-700'
                : 'bg-zinc-200'
          }`}
        ></div>
        <span
          className={`text-sm ${
            currentStep === 3
              ? isDark
                ? 'text-white'
                : 'text-zinc-900'
              : isDark
                ? 'text-zinc-400'
                : 'text-zinc-500'
          }`}
        >
          3 Review
        </span>
      </div>
    </div>
  );
}

// Layout wrapper component
function StepLayout({
  children,
  currentStep,
  isDark = false
}: {
  children: React.ReactNode;
  currentStep: number;
  isDark?: boolean;
}) {
  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDark
          ? 'bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white'
          : 'bg-gradient-to-b from-zinc-50 to-white'
      }`}
    >
      {isDark && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary-foreground opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
        </div>
      )}
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Steps indicator */}
        <div className="flex items-center justify-between mb-12">
          <StepsIndicator currentStep={currentStep} isDark={isDark} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default function RecordPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params.promptId as string;
  const promptData = mockPrompts[promptId];
  const promptContent = promptData?.text || 'Prompt not found';
  const promptImageUrl = promptData?.imageUrl;

  // Welcome step state
  const [showWelcome, setShowWelcome] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  // Recording state
  const [step, setStep] = useState(1);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const [recordingMode, setRecordingMode] = useState<RecordingMode>('audio');
  const [isSending, setIsSending] = useState(false);

  const handleUserInfoSubmit = (
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => {
    setUserInfo({ firstName, lastName, phoneNumber });
    setShowWelcome(false);
  };

  const handleRecordingComplete = (blobUrl: string, mode: RecordingMode) => {
    setMediaBlobUrl(blobUrl);
    setRecordingMode(mode);
    setStep(3);
  };

  const handleSend = async () => {
    if (!mediaBlobUrl) return;
    setIsSending(true);
    setStep(4);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Sending recording:', mediaBlobUrl);
    setIsSending(false);
    setStep(5);
  };

  const resetState = () => {
    setMediaBlobUrl(null);
    setShowWelcome(true);
    setStep(1);
    setIsSending(false);
    setUserInfo({
      firstName: '',
      lastName: '',
      phoneNumber: ''
    });
  };

  // Welcome step
  if (showWelcome) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-zinc-50">
        {/* Background gradient effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary-foreground opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
        </div>

        <Welcome
          firstName={userInfo.firstName}
          setFirstName={(value) =>
            setUserInfo((prev) => ({ ...prev, firstName: value }))
          }
          lastName={userInfo.lastName}
          setLastName={(value) =>
            setUserInfo((prev) => ({ ...prev, lastName: value }))
          }
          phoneNumber={userInfo.phoneNumber}
          setPhoneNumber={(value) =>
            setUserInfo((prev) => ({ ...prev, phoneNumber: value }))
          }
          onContinue={() =>
            handleUserInfoSubmit(
              userInfo.firstName,
              userInfo.lastName,
              userInfo.phoneNumber
            )
          }
        />
      </div>
    );
  }

  // Step 1: Setup (includes prompt, mode selection, permissions, and device setup)
  if (step === 1) {
    return (
      <StepLayout currentStep={1}>
        <RecordSetup
          promptData={promptData}
          onBack={() => router.back()}
          onComplete={() => setStep(2)}
        />
      </StepLayout>
    );
  }

  // Step 2: Record
  if (step === 2) {
    return (
      <StepLayout currentStep={2} isDark>
        <Recording
          mode={recordingMode}
          promptText={promptContent}
          promptImageUrl={promptImageUrl}
          onComplete={(blobUrl) => {
            setMediaBlobUrl(blobUrl);
            setStep(3);
          }}
        />
      </StepLayout>
    );
  }

  // Step 3: Preview
  if (step === 3 && mediaBlobUrl) {
    return (
      <StepLayout currentStep={3}>
        <RecordReview
          mode={recordingMode}
          mediaBlobUrl={mediaBlobUrl}
          onBack={() => setStep(2)}
          onRecordAgain={() => setStep(2)}
          onSubmit={handleSend}
        />
      </StepLayout>
    );
  }

  // Step 4: Sending
  if (step === 4) {
    return (
      <StepLayout currentStep={3}>
        <Card className="bg-white border-zinc-200 shadow-sm">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <h2 className="text-xl font-semibold text-zinc-900">
              Processing your story...
            </h2>
            <Progress value={isSending ? undefined : 100} className="w-48" />
          </CardContent>
        </Card>
      </StepLayout>
    );
  }

  // Step 5: Success
  return (
    <StepLayout currentStep={3}>
      <Card className="bg-white border-zinc-200 shadow-sm">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-6">
          <h2 className="text-xl font-semibold text-zinc-900">
            Story submitted!
          </h2>
          <p className="text-zinc-600">
            Your story has been successfully recorded.
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              onClick={() => router.push('/dashboard')}
            >
              View all stories
            </Button>
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={resetState}
            >
              Record another
            </Button>
          </div>
        </CardContent>
      </Card>
    </StepLayout>
  );
}
