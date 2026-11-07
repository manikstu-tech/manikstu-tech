"use client"

import { useEffect, useRef, useState } from "react"
import { ProgressiveGrid } from "@/components/sections/resources/ProgressiveGrid"
import { VIDEOS, VIDEO_CATEGORIES, type Video } from "@/constants/resources"

const formatDate = (date: string) =>
  date ? new Date(date).toLocaleDateString("en-IN", { dateStyle: "medium", timeZone: "UTC" }) : ""

const FILTERS = ["All", ...VIDEO_CATEGORIES]
const countOf = (filter: string) =>
  filter === "All" ? VIDEOS.length : VIDEOS.filter(({ category }) => category === filter).length

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} />
  </svg>
)

export function VideoGrid({ only }: { only?: string[] } = {}) {
  const [filter, setFilter] = useState("All")
  const [active, setActive] = useState<Video | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const pool = only ? VIDEOS.filter(({ id }) => only.includes(id)) : VIDEOS
  const shown = filter === "All" ? pool : pool.filter(({ category }) => category === filter)
  const index = active ? shown.findIndex(({ id }) => id === active.id) : -1
  // Previous and next stay inside the topic that is being browsed
  const step = (dir: 1 | -1) => index > -1 && setActive(shown[(index + dir + shown.length) % shown.length])

  useEffect(() => {
    if (active) dialog.current?.showModal()
  }, [active])

  return (
    <>
      {!only && (
      <div className="resBar">
        <div className="catalogTabs" role="group" aria-label="Filter videos by topic">
          {FILTERS.map((name) => (
            <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)}>
              {name} <span>{countOf(name)}</span>
            </button>
          ))}
        </div>
        <p aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "video" : "videos"}
        </p>
      </div>
      )}
      {/* Keyed by filter so a new topic starts from the first page again */}
      <ProgressiveGrid key={filter} items={shown} step={8} className={only ? "resVideos resFeature" : "resVideos"}>
        {(video) => (
          <li key={video.id}>
            <button type="button" className="resVideo" onClick={() => setActive(video)}>
              <span className="resThumb">
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/${only ? "maxresdefault" : "hqdefault"}.jpg`}
                  // maxresdefault is 16:9 without black bars, but a few videos lack it
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
                  }}
                  alt=""
                  width="480"
                  height="360"
                  loading="lazy"
                  decoding="async"
                />
                <span className="resPlay" aria-hidden="true">
                  <span>
                    <Icon d="M8 5v14l11-7z" />
                  </span>
                </span>
              </span>
              <strong>{video.title}</strong>
              {video.date && <small>{formatDate(video.date)}</small>}
              <span className="srOnly">Play video</span>
            </button>
          </li>
        )}
      </ProgressiveGrid>
      {/* The player loads only after a click, in YouTube's privacy mode */}
      <dialog
        ref={dialog}
        className="resPlayer"
        aria-labelledby="player-title"
        onClose={() => setActive(null)}
        onClick={(event) => event.target === dialog.current && dialog.current?.close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1)
          if (event.key === "ArrowRight") step(1)
        }}
      >
        {active && (
          <>
            <div className="resPlayerHead">
              <div>
                <small>{[active.category, formatDate(active.date)].filter(Boolean).join(" · ")}</small>
                <h2 id="player-title">{active.title}</h2>
              </div>
              <button type="button" className="resClose" aria-label="Close video" onClick={() => dialog.current?.close()}>
                <Icon d="M6 6l12 12M18 6L6 18" />
              </button>
            </div>
            <iframe
              key={active.id}
              src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
              title={active.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <div className="resPlayerFoot">
              <a
                className="textLink"
                href={`https://www.youtube.com/watch?v=${active.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube ↗
              </a>
              {shown.length > 1 && (
                <div>
                  <span>
                    {index + 1} of {shown.length}
                  </span>
                  <button type="button" className="resNav" aria-label="Previous video" onClick={() => step(-1)}>
                    <Icon d="M15 5l-7 7 7 7" />
                  </button>
                  <button type="button" className="resNav" aria-label="Next video" onClick={() => step(1)}>
                    <Icon d="M9 5l7 7-7 7" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </dialog>
    </>
  )
}
