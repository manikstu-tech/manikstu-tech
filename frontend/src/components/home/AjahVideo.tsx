"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AjahVideoProps {
  videoId: string;
}

/**
 * Autoplaying, looping, muted YouTube background video for the Project AJAH
 * card. A toggle button lets the viewer unmute (and re-mute) the sound.
 * Uses the YouTube IFrame API so mute state is controllable.
 */
export default function AjahVideo({ videoId }: AjahVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const init = () => {
      if (cancelled || !containerRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const YT = (window as any).YT;
      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId, // required for loop of a single video
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          disablekb: 1,
        },
        events: {
          onReady: (e: { target: { mute: () => void; playVideo: () => void } }) => {
            if (cancelled) return;
            e.target.mute();
            e.target.playVideo();
            setReady(true);
          },
        },
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).YT && (window as any).YT.Player) {
      init();
    } else {
      const existing = document.getElementById("youtube-iframe-api");
      if (!existing) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const prev = (window as any).onYouTubeIframeAPIReady;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") prev();
        init();
      };
    }

    return () => {
      cancelled = true;
      if (playerRef.current?.destroy) playerRef.current.destroy();
    };
  }, [videoId]);

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      p.setVolume(100);
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  };

  return (
    <>
      {/* 16:9 video scaled to cover the 4:3 card without letterboxing */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={containerRef}
          className="absolute left-1/2 top-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78%)] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 [&>iframe]:h-full [&>iframe]:w-full"
        />
      </div>

      {ready && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-manikstu-green shadow-md transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-manikstu-green"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      )}
    </>
  );
}
