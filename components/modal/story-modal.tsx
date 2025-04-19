import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Edit2, Download, Mic, Camera, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: {
    imageUrl: string;
    content: string;
    title: string;
    author: {
      name: string;
      avatar: string;
      role?: string;
    };
    date: string;
  };
}

export function StoryModal({ isOpen, onClose, story }: StoryModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(story.content);
  const [title, setTitle] = useState(story.title);
  const [showMenu, setShowMenu] = useState(false);

  const handleMakeChanges = () => {
    if (isEditing) {
      setIsEditing(false);
      setShowMenu(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleMoreClick = () => {
    setShowMenu(!showMenu);
  };

  const handleClose = () => {
    setIsEditing(false);
    setShowMenu(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[80vw] w-[80vw] h-[80vh] p-0 overflow-hidden mx-auto my-auto border-none rounded-none bg-background [&>button[data-state]]:hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Image */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-full bg-slate-950">
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-sm text-white/80">
              <span className="font-medium">
                What is happening in this photo?
              </span>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                Prompt
              </span>
            </div>
            <Image
              src={story.imageUrl}
              alt="Story"
              fill
              className="object-contain p-8"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div
            className={cn(
              'flex flex-col w-full md:w-1/2 h-full',
              isEditing && 'bg-muted/30'
            )}
          >
            {/* Author info */}
            <div className="flex items-center gap-3 p-6 border-b border-border/50 shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={story.author.avatar}
                  alt={story.author.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500">
                  {story.author.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{story.author.name}</h3>
                {story.author.role && (
                  <p className="text-sm text-muted-foreground">
                    {story.author.role}
                  </p>
                )}
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                {story.date}
              </div>
              {isEditing && (
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-full text-xs">
                  Editing
                </span>
              )}
            </div>

            {/* Story content */}
            <ScrollArea className="flex-1 p-8">
              {/* Title */}
              {isEditing ? (
                <div className="relative mb-6">
                  <Textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={cn(
                      'w-full resize-none',
                      'bg-background',
                      'border border-border/50',
                      'rounded-lg p-4',
                      'text-2xl font-semibold',
                      'focus-visible:ring-1 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/30',
                      'transition-colors duration-200',
                      'placeholder:text-muted-foreground/50',
                      'min-h-[60px]' // 标题框高度较小
                    )}
                    placeholder="Enter story title..."
                  />
                </div>
              ) : (
                <h1 className="text-2xl font-semibold mb-6">{title}</h1>
              )}

              {/* Content */}
              {isEditing ? (
                <div className="relative">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={cn(
                      'w-full min-h-[300px] resize-none',
                      'bg-background',
                      'border border-border/50',
                      'rounded-lg p-4',
                      'text-base leading-relaxed',
                      'focus-visible:ring-1 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/30',
                      'transition-colors duration-200',
                      'placeholder:text-muted-foreground/50'
                    )}
                    placeholder="Write your story here..."
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    'prose dark:prose-invert max-w-none',
                    'prose-p:leading-relaxed',
                    'prose-headings:font-medium',
                    'prose-p:text-foreground/80'
                  )}
                >
                  {content}
                </div>
              )}
            </ScrollArea>

            {/* Action buttons */}
            <div className="relative flex items-center justify-end gap-3 p-6 border-t border-border/50 shrink-0">
              <Button
                variant={'outline'}
                className={cn(
                  'w-24',
                  showMenu && 'border-primary/50 bg-primary/10 text-primary'
                )}
                onClick={isEditing ? handleMoreClick : undefined}
              >
                {isEditing ? 'More' : 'Share'}
              </Button>
              <Button className={cn('w-32')} onClick={handleMakeChanges}>
                {isEditing ? 'Done' : 'Make changes'}
              </Button>

              {/* Action Menu */}
              {showMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-64 bg-background rounded-lg shadow-lg border border-border/50 overflow-hidden">
                  <div className="p-2 space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-9"
                    >
                      <Edit2 className="h-4 w-4" />
                      Re-record story
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-9"
                    >
                      <Download className="h-4 w-4" />
                      Download recording
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-9"
                    >
                      <Mic className="h-4 w-4" />
                      AI writing tool
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-9"
                    >
                      <Camera className="h-4 w-4" />
                      Change photo
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-9 text-red-600 hover:text-red-600 hover:bg-red-100/10"
                    >
                      <Trash className="h-4 w-4" />
                      Remove photo
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-9 text-red-600 hover:text-red-600 hover:bg-red-100/10"
                    >
                      <Trash className="h-4 w-4" />
                      Delete story
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
