'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Video, Settings, AlertCircle, Mic } from 'lucide-react';
import dynamic from 'next/dynamic';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface RecordSetupProps {
  onBack: () => void;
  onComplete: () => void;
  promptData: {
    text: string;
    imageUrl: string;
  };
}

type SetupStep = 'prompt' | 'mode' | 'permission' | 'settings' | 'test';

function RecordSetupComponent({
  onBack,
  onComplete,
  promptData
}: RecordSetupProps) {
  const [step, setStep] = useState<SetupStep>('prompt');
  const [mode, setMode] = useState<'audio' | 'video'>('video');
  const [hasPermissionError, setHasPermissionError] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
  const animationFrameRef = useRef<number>();

  const checkMediaPermissions = async () => {
    try {
      const constraints = {
        audio: true,
        video: mode === 'video'
      };

      // 检查是否已经有权限
      const permissions = await navigator.mediaDevices.enumerateDevices();
      const hasAudioPermission = permissions.some(
        (device) => device.kind === 'audioinput' && device.label !== ''
      );
      const hasVideoPermission =
        mode === 'video'
          ? permissions.some(
              (device) => device.kind === 'videoinput' && device.label !== ''
            )
          : true;

      if (hasAudioPermission && hasVideoPermission) {
        // 已有权限，直接进入测试页面
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        mediaStreamRef.current = stream;
        if (mode === 'video' && videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsPreviewVisible(true);
        }
        setStep('test');
      } else {
        // 没有权限，进入权限请求页面
        setStep('permission');
      }
    } catch (error) {
      console.error('Permission check error:', error);
      // 出错时进入权限请求页面
      setStep('permission');
    }
  };

  // 在模式选择后检查权限
  const handleModeSelect = (selectedMode: 'audio' | 'video') => {
    setMode(selectedMode);
    checkMediaPermissions();
  };

  const handleRequestPermission = async () => {
    try {
      const constraints = {
        audio: true,
        video: mode === 'video'
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      if (mode === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsPreviewVisible(true);
      }
      setStep('test');
    } catch (error) {
      console.error('Permission error:', error);
      setHasPermissionError(true);
    }
  };

  useEffect(() => {
    // Initialize media preview when entering test step
    const initializeMediaPreview = async () => {
      if (step === 'test' && !mediaStreamRef.current) {
        try {
          const constraints = {
            audio: true,
            video: mode === 'video'
          };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          mediaStreamRef.current = stream;

          if (mode === 'video' && videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsPreviewVisible(true);
          } else if (mode === 'audio') {
            // Initialize audio context and analyser
            const audioCtx = new AudioContext();
            const analyserNode = audioCtx.createAnalyser();
            analyserNode.fftSize = 256;
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyserNode);

            const bufferLength = analyserNode.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            setAudioContext(audioCtx);
            setAnalyser(analyserNode);
            setDataArray(dataArray);
            setIsPreviewVisible(true);
          }
        } catch (error) {
          console.error('Failed to initialize media preview:', error);
          setError(
            error instanceof Error
              ? error.message
              : 'Failed to access media devices'
          );
        }
      }
    };

    initializeMediaPreview();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (audioContext) {
        audioContext.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [step, mode]);

  useEffect(() => {
    if (mode === 'audio' && analyser && dataArray && isPreviewVisible) {
      const canvas = document.getElementById('waveform') as HTMLCanvasElement;
      if (!canvas) return;

      const canvasCtx = canvas.getContext('2d');
      if (!canvasCtx) return;

      const draw = () => {
        animationFrameRef.current = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(243, 244, 246)';
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(79, 70, 229)';
        canvasCtx.beginPath();

        const sliceWidth = (canvas.width * 1.0) / dataArray.length;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
      };

      draw();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [mode, analyser, dataArray, isPreviewVisible]);

  // Step 1: Prompt View
  if (step === 'prompt') {
    return (
      <>
        {/* Main content */}
        <div className="space-y-8">
          {/* Image card */}
          <Card className="bg-white border-zinc-200 shadow-sm overflow-hidden">
            <div className="relative w-full">
              <Image
                src={promptData.imageUrl}
                alt="Prompt"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
                priority
              />
            </div>
          </Card>

          {/* Question text */}
          <div className="space-y-2">
            <p className="text-sm text-zinc-500">You asked</p>
            <p className="text-lg text-zinc-900">{promptData.text}</p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <Button
              variant="outline"
              className="flex-1 h-12 border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              onClick={onBack}
            >
              Change prompt
            </Button>
            <Button
              className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white"
              onClick={() => setStep('mode')}
            >
              Next step
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Step 2: Mode Selection
  if (step === 'mode') {
    return (
      <>
        {/* Back button and title */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            onClick={() => setStep('prompt')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-zinc-900">
            Choose recording mode
          </h1>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* Icons and description */}
          <div className="flex flex-col items-center justify-center space-y-8 py-12">
            <div className="flex items-center gap-8">
              <Mic className="w-16 h-16 text-primary" />
              <Video className="w-16 h-16 text-primary" />
            </div>
            <p className="text-zinc-600 text-center">
              You can record your voice with a video or choose audio-only.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              className="flex-1 h-12 border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              onClick={() => handleModeSelect('audio')}
            >
              <Mic className="w-5 h-5 mr-2" />
              Audio
            </Button>
            <Button
              className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white"
              onClick={() => handleModeSelect('video')}
            >
              <Video className="w-5 h-5 mr-2" />
              Video
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Step 3: Permission Request View
  if (step === 'permission') {
    return (
      <>
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            onClick={() => setStep('mode')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-zinc-900">
            {mode === 'video' ? 'Camera' : 'Microphone'} setup
          </h1>
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center space-y-8 py-12">
          {hasPermissionError ? (
            <>
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold text-zinc-900">Oh no!</h2>
                <p className="text-xl text-zinc-900">
                  It looks like we cannot access your{' '}
                  {mode === 'video' ? 'camera' : 'microphone'}.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-md">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  onClick={() => window.location.reload()}
                >
                  See how to turn on{' '}
                  {mode === 'video' ? 'camera' : 'microphone'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-zinc-200"
                  onClick={() => {
                    setHasPermissionError(false);
                    handleRequestPermission();
                  }}
                >
                  Try again
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                {mode === 'video' ? (
                  <Video className="w-16 h-16 text-primary" />
                ) : (
                  <Mic className="w-16 h-16 text-primary" />
                )}
                <AlertCircle className="absolute -top-2 -right-2 w-6 h-6 text-red-500 bg-white rounded-full" />
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold text-zinc-900">
                  Please allow {mode === 'video' ? 'camera' : 'microphone'}{' '}
                  access on your device
                </h2>
                <p className="text-zinc-600">
                  To record your stories, we need temporary access to your{' '}
                  {mode === 'video' ? 'camera and microphone' : 'microphone'}.
                </p>
              </div>
              <Button
                className="w-full max-w-md bg-primary text-white hover:bg-primary/90"
                onClick={handleRequestPermission}
              >
                Turn on {mode === 'video' ? 'camera' : 'microphone'}
              </Button>
            </>
          )}
        </div>
      </>
    );
  }

  // Step 4: Device Settings View
  if (step === 'settings') {
    return (
      <>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              onClick={() => setStep('permission')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold text-zinc-900">
              Recording Settings
            </h1>
          </div>
        </div>

        {/* Main content */}
        <Card className="bg-white border-zinc-200 shadow-sm">
          <div className="p-6 space-y-6">
            <div className="space-y-6">
              {/* Audio Settings */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-zinc-900">
                  Lets make sure you can be heard properly
                </h2>
                <div className="flex items-center gap-3">
                  <Mic className="w-5 h-5 text-zinc-500" />
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Default Microphone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">
                        Default Microphone
                      </SelectItem>
                      <SelectItem value="teams">
                        Microsoft Teams Audio Device (Virtual)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Video Settings - Only show if video mode is selected */}
              {mode === 'video' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-zinc-900">
                    Choose your camera
                  </h2>
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-zinc-500" />
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Default Camera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Camera</SelectItem>
                        <SelectItem value="external">
                          External Webcam
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Quality Settings - Only show if video mode is selected */}
              {mode === 'video' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-zinc-900">
                    Video quality
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-auto py-3 border-zinc-200 hover:bg-zinc-50"
                    >
                      <span className="text-sm font-medium text-zinc-900">
                        720p
                      </span>
                      <span className="text-xs text-zinc-500">HD</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-auto py-3 bg-primary border-primary text-white hover:bg-primary/90"
                    >
                      <span className="text-sm font-medium">1080p</span>
                      <span className="text-xs text-zinc-100">Full HD</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-auto py-3 border-zinc-200 hover:bg-zinc-50"
                    >
                      <span className="text-sm font-medium text-zinc-900">
                        2160p
                      </span>
                      <span className="text-xs text-zinc-500">4K</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Button
              className="w-full bg-primary text-white hover:bg-primary/90"
              onClick={() => setStep('test')}
            >
              Next step
            </Button>
          </div>
        </Card>
      </>
    );
  }

  // Step 5: Sound Test View
  if (step === 'test') {
    return (
      <>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              onClick={() => setStep('mode')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold text-zinc-900">
              {mode === 'video' ? 'Video' : 'Sound'} test
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            onClick={() => setStep('settings')}
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>

        {/* Main content */}
        <Card className="bg-white border-zinc-200 shadow-sm">
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              {mode === 'audio' ? (
                <div className="relative w-full max-w-[400px] h-32 bg-zinc-100 rounded-lg overflow-hidden">
                  <canvas
                    id="waveform"
                    className={`w-full h-full ${!isPreviewVisible ? 'hidden' : ''}`}
                  />
                  {isRecording && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Recording
                    </div>
                  )}
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
                      <p className="text-red-500 text-center px-4">{error}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full max-w-[400px] aspect-video bg-zinc-100 rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`w-full h-full object-cover ${!isPreviewVisible ? 'hidden' : ''}`}
                  />
                  {isRecording && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Recording
                    </div>
                  )}
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
                      <p className="text-red-500 text-center px-4">{error}</p>
                    </div>
                  )}
                </div>
              )}
              {mediaBlobUrl &&
                (mode === 'audio' ? (
                  <audio src={mediaBlobUrl} controls className="w-full" />
                ) : (
                  <video
                    src={mediaBlobUrl}
                    controls
                    className="w-full rounded-lg"
                    style={{ maxWidth: '400px' }}
                  />
                ))}
              <p className="text-zinc-600 text-center">
                {isRecording
                  ? `Recording ${mode}...`
                  : `Speak into your ${mode === 'video' ? 'camera' : 'microphone'} to test`}
              </p>
            </div>
            <div className="flex gap-4">
              {/* {!mediaBlobUrl && (
                <>
                  <Button
                    variant="outline"
                    className="flex-1 border-zinc-200"
                    onClick={startRecording}
                    disabled={isRecording}
                  >
                    Start Test
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-white hover:bg-primary/90"
                    onClick={stopRecording}
                    disabled={!isRecording}
                  >
                    Stop Test
                  </Button>
                </>
              )} */}
              <Button
                className="flex-1 bg-primary text-white hover:bg-primary/90"
                onClick={onComplete}
              >
                Next step
              </Button>
            </div>
          </div>
        </Card>
      </>
    );
  }

  return null;
}

// Export the component with dynamic import
export default dynamic(() => Promise.resolve(RecordSetupComponent), {
  ssr: false
});
