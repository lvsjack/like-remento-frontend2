'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface Prompt {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  status?: 'in_progress' | 'to_be_sent';
}

interface PromptCellProps {
  prompt: Prompt;
  actionButton: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export function PromptCell({
  prompt,
  actionButton,
  isLoading = false,
  className
}: PromptCellProps) {
  // 获取用户名首字母作为头像 fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  // 格式化时间
  const formatTime = (timeString: string) => {
    if (timeString.includes('ago')) return timeString;

    const date = new Date(timeString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          'p-4 hover:shadow-md transition-shadow duration-200',
          isLoading && 'opacity-50 pointer-events-none',
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={prompt.user.image} alt={prompt.user.name} />
              <AvatarFallback>{getInitials(prompt.user.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-800 dark:text-gray-200 line-clamp-2 break-words">
                {prompt.content}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Sent {formatTime(prompt.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0">{actionButton}</div>
        </div>
      </Card>
    </motion.div>
  );
}
