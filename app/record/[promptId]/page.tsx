'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image'; // Import Next Image
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AudioRecorder } from '@/components/dashboard/prompts/AudioRecorder';
import { VideoRecorder } from '@/components/dashboard/prompts/VideoRecorder';
import { Progress } from '@/components/ui/progress'; // Import Progress component
import { Mic, Video } from 'lucide-react'; // Import icons
import Welcome from '@/components/Welcome'; // Import the new component
import { cn } from '@/lib/utils';

// Mock prompt data - replace with actual data fetching
const mockPrompts = {
  '1': {
    text: 'How did your relationship with your parents change as you got older?',
    // Add an image URL if available, like in the UI mockups
    imageUrl: '/placeholder-image.jpg' // Example placeholder
  }
};

type RecordingMode = 'audio' | 'video';

export default function RecordPage() {
  const params = useParams();
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

  const [recordingMode, setRecordingMode] = useState<RecordingMode>('audio');
  // Steps: 1: Choose mode/Record, 2: Preview, 3: Sending, 4: Sent
  const [step, setStep] = useState(1);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleUserInfoSubmit = (
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => {
    setUserInfo({ firstName, lastName, phoneNumber });
    setShowWelcome(false);
  };

  const handleRecordingComplete = (blobUrl: string) => {
    setMediaBlobUrl(blobUrl);
    setIsRecording(false);
    setStep(2);
  };

  const handleSend = async () => {
    if (!mediaBlobUrl) return;
    setIsSending(true);
    setStep(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Sending recording:', mediaBlobUrl);
    setIsSending(false);
    setStep(4);
  };

  const RecorderComponent = () => {
    const Recorder = recordingMode === 'audio' ? AudioRecorder : VideoRecorder;
    return <Recorder onRecordingComplete={handleRecordingComplete} />;
  };

  const resetState = () => {
    setMediaBlobUrl(null);
    setShowWelcome(true);
    setStep(1);
    setIsSending(false);
    setIsRecording(false);
    setUserInfo({
      firstName: '',
      lastName: '',
      phoneNumber: ''
    });
  };

  // If welcome step is showing, render it with dark background
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

  // Main recording flow with light background
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-950">
      <Card
        className={cn(
          'w-full max-w-md mt-8',
          'bg-white dark:bg-zinc-900',
          'border-zinc-200 dark:border-zinc-800',
          'shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50'
        )}
      >
        {/* Conditionally render header based on step */}
        {step <= 2 && (
          <CardHeader className="text-center">
            <CardTitle className="text-zinc-900 dark:text-zinc-50">
              Record your response
            </CardTitle>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-1">
              {promptContent}
            </p>
          </CardHeader>
        )}

        <CardContent className="flex flex-col items-center gap-6 p-4 md:p-6">
          {/* Step 1: Choose mode/Record */}
          {step === 1 && (
            <div className="w-full flex flex-col items-center gap-4">
              {/* Display Image if available */}
              {promptImageUrl && !isRecording && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={promptImageUrl}
                    alt="Prompt visual"
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              )}

              {/* Don't show mode toggles or start button if recording is active */}
              {!isRecording && (
                <>
                  <div className="flex gap-2 justify-center mb-2">
                    <Button
                      variant={
                        recordingMode === 'audio' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setRecordingMode('audio')}
                      className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      <Mic className="mr-2 h-4 w-4" /> Audio
                    </Button>
                    <Button
                      variant={
                        recordingMode === 'video' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setRecordingMode('video')}
                      className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      <Video className="mr-2 h-4 w-4" /> Video
                    </Button>
                  </div>

                  {/* Start Recording Button */}
                  <Button
                    size="lg"
                    className="rounded-full w-16 h-16 mt-4 bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 p-0"
                    onClick={() => setIsRecording(true)}
                  >
                    {recordingMode === 'audio' ? (
                      <Mic className="h-6 w-6 text-white" />
                    ) : (
                      <Video className="h-6 w-6 text-white" />
                    )}
                  </Button>
                </>
              )}

              {/* Show Recorder component only when recording is active */}
              {isRecording && <RecorderComponent />}
            </div>
          )}

          {/* Step 2: Preview */}
          {step === 2 && mediaBlobUrl && (
            <div className="w-full flex flex-col gap-4 items-center">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Preview
              </h3>
              {recordingMode === 'audio' ? (
                <audio src={mediaBlobUrl} controls className="w-full" />
              ) : (
                <video
                  src={mediaBlobUrl}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxWidth: '400px' }}
                />
              )}
              <div className="flex gap-2 w-full justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setMediaBlobUrl(null);
                  }}
                  className="border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Record Again
                </Button>
                <Button
                  onClick={handleSend}
                  className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Send
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Sending */}
          {step === 3 && (
            <div className="w-full flex flex-col gap-4 items-center text-center py-8">
              {promptImageUrl && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={promptImageUrl}
                    alt="Prompt visual"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Building your story...
              </h3>
              <Progress value={isSending ? undefined : 100} className="w-3/4" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Please wait while we process your response.
              </p>
            </div>
          )}

          {/* Step 4: Sent Confirmation */}
          {step === 4 && (
            <div className="w-full flex flex-col gap-4 items-center text-center py-8">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Story Ready!
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Your {recordingMode} response has been saved.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mt-4">
                <Button
                  variant="secondary"
                  onClick={() => alert('View not implemented')}
                  className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
                >
                  View Story
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => alert('Share not implemented')}
                  className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
                >
                  Share
                </Button>
                <Button
                  variant="default"
                  onClick={resetState}
                  className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
