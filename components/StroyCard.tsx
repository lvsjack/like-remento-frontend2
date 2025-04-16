import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock, MoreVertical } from 'lucide-react';
import Image from 'next/image';

interface StoryCardProps {
  imageUrl: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  className?: string;
}

export function StoryCard({
  imageUrl,
  title,
  author,
  date,
  className
}: StoryCardProps) {
  return (
    <Card
      className={cn(
        'group relative h-[260px] w-full overflow-hidden bg-white transition-all duration-300',
        'hover:shadow-[0_0_50px_0_rgba(0,0,0,0.1)]',
        className
      )}
    >
      {/* Top Actions */}
      <div className="absolute right-4 top-4 z-10">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Section */}
      <div className="relative h-[65%] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="transform object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </div>

      {/* Content Section */}
      <div className="relative flex h-[35%] flex-col justify-between p-4">
        {/* Title */}
        <h3 className="line-clamp-2 text-base font-semibold leading-tight text-gray-900">
          {title}
        </h3>

        {/* Author Info */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3 justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-white">
                  {author.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium text-gray-900">
                {author.name}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Card>
  );
}
