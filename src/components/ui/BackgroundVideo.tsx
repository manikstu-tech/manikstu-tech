"use client"

import { useEffect, useRef, useState } from "react"

interface BackgroundVideoProps {
  videoId: string
  title: string
  className: string
  // YouTube thumbnail size: not every video has maxresdefault
  poster?: "maxresdefault" | "hqdefault"
}

// Plays like a background video: no player chrome, no clicks into YouTube, our own pause and sound buttons.
// Autoplay needs mute=1; enablejsapi=1 lets the buttons send commands to the player.
// No loop/playlist parameters: they add YouTube's previous/next buttons, so the loop is done below.
export function BackgroundVideo({
  videoId,
  title,
  className,
  poster = "maxresdefault",
}: BackgroundVideoProps) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)

  const post = (message: object) =>
    frame.current?.contentWindow?.postMessage(
      JSON.stringify(message),
      "https://www.youtube.com",
    )
  const send = (func: string, args: unknown[] = []) =>
    post({ event: "command", func, args })

  // Restart when the video ends
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return
      try {
        const data = JSON.parse(event.data)
        if (data.event === "infoDelivery" && data.info?.playerState === 0) {
          send("seekTo", [0, true])
          send("playVideo")
        }
      } catch {
        // not a player message
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return (
    <div className={className}>
      <iframe
        ref={frame}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1&enablejsapi=1`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
        onLoad={() => post({ event: "listening" })}
        loading="lazy"
      />
      {/* While paused, show the poster frame over the player so none of its own paused-state screens show */}
      <div
        className={playing ? "ajahVeil" : "ajahVeil on"}
        style={{
          backgroundImage: `url("https://i.ytimg.com/vi/${videoId}/${poster}.jpg")`,
        }}
      />
      <VideoControls
        muted={muted}
        playing={playing}
        onMute={() => {
          send(muted ? "unMute" : "mute")
          setMuted(!muted)
        }}
        onPlay={() => {
          send(playing ? "pauseVideo" : "playVideo")
          setPlaying(!playing)
        }}
      />
    </div>
  )
}

// The same player for a video file we host ourselves. It starts muted and only loads and plays
// while on screen, so a large file does not download with the rest of the page.
export function FileVideo({
  src,
  poster,
  title,
  className,
}: {
  src: string
  poster: string
  title: string
  className: string
}) {
  const video = useRef<HTMLVideoElement>(null)
  const pausedByUser = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = video.current
    if (!v) return
    // React does not render the muted attribute on the server, and browsers only autoplay muted video
    v.muted = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) v.play().catch(() => setPlaying(false))
        else if (!entry.isIntersecting) v.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={className}>
      <video
        ref={video}
        src={src}
        poster={poster}
        aria-label={title}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <VideoControls
        muted={muted}
        playing={playing}
        onMute={() => {
          if (video.current) video.current.muted = !muted
          setMuted(!muted)
        }}
        onPlay={() => {
          const v = video.current
          if (!v) return
          pausedByUser.current = playing
          if (playing) v.pause()
          else v.play().catch(() => setPlaying(false))
        }}
      />
    </div>
  )
}

function VideoControls({
  muted,
  playing,
  onMute,
  onPlay,
}: {
  muted: boolean
  playing: boolean
  onMute: () => void
  onPlay: () => void
}) {
  return (
    <div className="ajahControls">
      <button
        type="button"
        onClick={onMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {muted ? (
            <path d="M4 9v6h4l5 4V5L8 9ZM16 9l5 6m0-6-5 6" />
          ) : (
            <path d="M4 9v6h4l5 4V5L8 9ZM16 9a4 4 0 0 1 0 6m2.500-9a8 8 0 0 1 0 12" />
          )}
        </svg>
      </button>
      <button
        type="button"
        onClick={onPlay}
        aria-label={playing ? "Pause video" : "Play video"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {playing ? (
            <path d="M8 5v14M16 5v14" />
          ) : (
            <path d="m8 5 11 7-11 7Z" />
          )}
        </svg>
      </button>
    </div>
  )
}
