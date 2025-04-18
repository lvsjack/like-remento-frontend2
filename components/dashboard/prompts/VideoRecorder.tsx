'use client';

import { useReactMediaRecorder } from 'react-media-recorder';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VideoRecorderProps {
  onRecordingComplete: (blobUrl: string) => void;
}

export const VideoRecorder = ({ onRecordingComplete }: VideoRecorderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    clearBlobUrl
  } = useReactMediaRecorder({
    video: true,
    audio: true,
    askPermissionOnMount: false
  });

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  useEffect(() => {
    console.log('Recording status:', status);
    console.log('Preview stream:', previewStream);
    console.log('Media blob URL:', mediaBlobUrl);
    if (mediaBlobUrl && status === 'stopped') {
      setIsPreviewVisible(false); // Hide preview when stopped
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop()); // Ensure tracks are stopped
        videoRef.current.srcObject = null; // Clear srcObject
      }
      onRecordingComplete(mediaBlobUrl);
    }
  }, [status, previewStream, mediaBlobUrl, onRecordingComplete]);

  const handleStartRecording = async () => {
    try {
      clearBlobUrl(); // Clear previous blob
      setError(null);
      // 先请求媒体权限
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsPreviewVisible(true);
      startRecording();

      toast({
        title: 'Recording Started',
        description: 'Your video recording has begun.'
      });
    } catch (err) {
      console.error('Failed to start recording:', err);
      setError(err instanceof Error ? err.message : 'Failed to access camera');
      toast({
        variant: 'destructive',
        title: 'Camera Access Error',
        description:
          err instanceof Error ? err.message : 'Failed to access camera'
      });
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    // Stream stopping logic moved to useEffect
    toast({
      title: 'Recording Stopped',
      description: 'Your video has been recorded.'
    });
  };

  const handleRecordAgain = () => {
    handleStartRecording(); // Restart the process
  };

  return (
    <Card className="p-4 border-none shadow-none">
      <div className="flex flex-col items-center gap-4">
        {status !== 'stopped' && (
          <div className="flex gap-2">
            <Button
              onClick={handleStartRecording}
              variant="outline"
              size="sm"
              disabled={status === 'recording'}
            >
              Record Video
            </Button>
            <Button
              onClick={handleStopRecording}
              variant="destructive"
              size="sm"
              disabled={status !== 'recording'}
            >
              Stop
            </Button>
          </div>
        )}

        {error && <div className="text-sm text-red-500">Error: {error}</div>}

        {status === 'recording' && (
          <div className="text-sm text-muted-foreground">
            Recording video...
          </div>
        )}

        {/* 实时摄像头预览 */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`w-full rounded-lg ${!isPreviewVisible || status === 'stopped' ? 'hidden' : ''}`}
          style={{ maxWidth: '400px' }}
        />

        <div className="text-xs text-muted-foreground mt-2">
          {status !== 'idle' && status !== 'stopped' ? `Status: ${status}` : ''}
        </div>
      </div>
    </Card>
  );
};
