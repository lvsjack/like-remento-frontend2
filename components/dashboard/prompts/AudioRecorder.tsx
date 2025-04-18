'use client';

import { useReactMediaRecorder } from 'react-media-recorder';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const AudioRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      video: false
    });

  return (
    <Card className="p-4">
      <div className="flex flex-col items-center gap-4">
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
