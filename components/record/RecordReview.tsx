'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, RotateCcw, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecordReviewProps {
  mode: 'audio' | 'video';
  mediaBlobUrl: string;
  onBack: () => void;
  onSubmit: () => void;
  onRecordAgain: () => void;
}

export default function RecordReview({
  mode,
  mediaBlobUrl,
  onBack,
  onSubmit,
  onRecordAgain
}: RecordReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header section */}
      <div className="flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            onClick={onBack}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </motion.div>
        <h1 className="text-2xl font-semibold text-zinc-900">
          Review your story
        </h1>
      </div>

      {/* Preview card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white border-zinc-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-zinc-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Review your recording
              </h2>

              <div className="relative rounded-lg overflow-hidden bg-zinc-50 border border-zinc-200">
                {mode === 'audio' ? (
                  <div className="p-6">
                    <audio
                      src={mediaBlobUrl}
                      controls
                      className="w-full focus:outline-none"
                    />
                  </div>
                ) : (
                  <video
                    src={mediaBlobUrl}
                    controls
                    className="w-full rounded-lg aspect-video"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full h-12 border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors flex items-center justify-center gap-2"
                  onClick={onRecordAgain}
                >
                  <RotateCcw className="h-4 w-4" />
                  Record again
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  className="w-full h-12 bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  onClick={onSubmit}
                >
                  <Send className="h-4 w-4" />
                  Submit
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
