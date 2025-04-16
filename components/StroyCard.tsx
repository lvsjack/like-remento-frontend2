import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Mic, Video } from "lucide-react"
import Image from "next/image"

interface StoryCardProps {
  imageUrl: string
  title: string
  author: {
    name: string
    avatar: string
  }
  date: string
  className?: string
}

export function StoryCard({
  imageUrl,
  title,
  author,
  date,
  className,
}: StoryCardProps) {
  return (
    <Card className={cn("w-full bg-grey-500", className)}>
      <CardHeader className="p-4">
        {/* Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Audio Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm"
          >
            <Mic className="h-5 w-5" />
          </Button>
          {/* Video Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4 pt-0">
        <p className="text-muted-foreground">
          {title}
        </p>
        
        {/* Author and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-base-600">{author.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {date}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
