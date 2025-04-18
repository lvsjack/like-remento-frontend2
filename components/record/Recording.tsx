'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useReactMediaRecorder } from 'react-media-recorder';
import Image from 'next/image';

interface RecordingProps {
  mode: 'audio' | 'video';
  promptText: string;
  promptImageUrl?: string;
  onComplete: (blobUrl: string) => void;
}

export default function Recording({
  mode,
  promptText,
  promptImageUrl,
  onComplete
}: RecordingProps) {
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const {
    status,
    startRecording: startMediaRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl
  } = useReactMediaRecorder({
    video: mode === 'video',
    audio: true,
    askPermissionOnMount: true,
    onStart: () => {
      setRecordingTime(0);
      startTimer();
      toast({
        title: 'Recording Started',
        description: `Your ${mode} recording has begun.`
      });
    },
    onStop: () => {
      stopTimer();
      toast({
        title: 'Recording Stopped',
        description: 'Your recording has been completed.'
      });
    }
  });

  useEffect(() => {
    if (videoRef.current && previewStream && mode === 'video') {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream, mode]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setRecordingTime(0);
    startMediaRecording();
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resumeRecording();
      startTimer();
    } else {
      pauseRecording();
      stopTimer();
    }
    setIsPaused(!isPaused);
  };

  const isRecording = status === 'recording' || status === 'paused';

  return (
    <div className="flex flex-col h-full">
      {/* Question Card */}
      <Card className="bg-zinc-900 border-zinc-800 shadow-lg mb-4">
        <div className="p-4 space-y-4">
          {promptImageUrl && (
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={promptImageUrl}
                alt="Prompt"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">Jack asked</p>
            <p className="text-lg text-white">{promptText}</p>
          </div>
        </div>
      </Card>

      {/* Recording Status */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        {isRecording && (
          <div className="text-red-500 font-medium flex items-center gap-2">
            <span className="animate-pulse">● REC</span>
          </div>
        )}

        {/* Timer */}
        <div className="text-white text-2xl font-mono">
          {formatTime(recordingTime)}
          {isRecording && <span className="opacity-50">/30:00</span>}
        </div>

        {/* Preview (if video mode) */}
        {mode === 'video' && (
          <div className="relative w-full max-w-[400px] aspect-video bg-zinc-800 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 mt-8">
          {isRecording ? (
            <>
              <Button
                variant="secondary"
                size="lg"
                className="w-32 bg-zinc-800 text-white hover:bg-zinc-700"
                onClick={handlePauseResume}
              >
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                size="lg"
                className="w-32 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={stopRecording}
              >
                Stop
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              className="w-32 bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleStartRecording}
              disabled={status === 'acquiring_media'}
            >
              {status === 'acquiring_media' ? 'Preparing...' : 'Start'}
            </Button>
          )}
        </div>
      </div>

      {/* Hidden video element for recorded content */}
      {mediaBlobUrl && (
        <video
          src={mediaBlobUrl}
          className="hidden"
          onLoadedMetadata={() => onComplete(mediaBlobUrl)}
        />
      )}
    </div>
  );
}
