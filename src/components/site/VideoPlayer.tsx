import type { ReactElement } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface VideoPlayerProps {
  title: string;
  youtubeId?: string | undefined;
  url?: string | undefined;
  children: ReactElement;
}

/** Mount the player only while open, so closing the dialog also stops playback. */
export function VideoPlayer({ title, youtubeId, url, children }: VideoPlayerProps) {
  if (!youtubeId && !url) return children;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-[calc(100%-2rem)] max-w-5xl max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-none border-border bg-card p-0 shadow-card sm:rounded-none"
      >
        <DialogTitle className="break-words p-5 pr-14 font-display text-lg font-medium leading-snug tracking-normal text-card-foreground">
          {title}
        </DialogTitle>
        <div className="aspect-video w-full bg-ink">
          {youtubeId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&playsinline=1&rel=0`}
              title={title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <video src={url} aria-label={title} className="h-full w-full" controls autoPlay playsInline />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}