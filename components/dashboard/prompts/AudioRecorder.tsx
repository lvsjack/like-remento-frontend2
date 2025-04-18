'use client';

import { useReactMediaRecorder } from 'react-media-recorder';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';

interface AudioRecorderProps {
  onRecordingComplete: (blobUrl: string) => void;
}

export const AudioRecorder = ({ onRecordingComplete }: AudioRecorderProps) => {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      video: false
    });

  useEffect(() => {
    if (mediaBlobUrl && status === 'stopped') {
      onRecordingComplete(mediaBlobUrl);
    }
  }, [mediaBlobUrl, status, onRecordingComplete]);

  const handleRecordAgain = () => {
    clearBlobUrl();
    startRecording();
  };

  return (
    <Card className="p-4 border-none shadow-none">
      <div className="flex flex-col items-center gap-4">
        {status !== 'stopped' && (
          <div className="flex gap-2">
            <Button
              onClick={startRecording}
              variant="outline"
              size="sm"
              disabled={status === 'recording'}
            >
              Record
            </Button>
            <Button
              onClick={stopRecording}
              variant="destructive"
              size="sm"
              disabled={status !== 'recording'}
            >
              Stop
            </Button>
          </div>
        )}

        {status === 'recording' && (
          <div className="text-sm text-muted-foreground">Recording...</div>
        )}

        {mediaBlobUrl && (
          <audio src={mediaBlobUrl} controls className="w-full" />
        )}
      </div>
    </Card>
  );
};
