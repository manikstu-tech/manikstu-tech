"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ProgressiveGrid } from "@/components/sections/resources/ProgressiveGrid"
import { PHOTOS } from "@/constants/resources"

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} />
  </svg>
)

export function PhotoGrid() {
  const [active, setActive] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const photo = active === null ? null : PHOTOS[active]
  const step = (dir: 1 | -1) => active !== null && setActive((active + dir + PHOTOS.length) % PHOTOS.length)

  useEffect(() => {
    if (active !== null) dialog.current?.showModal()
  }, [active])

  return (
    <>
      <ProgressiveGrid items={PHOTOS} step={12} className="resGallery">
        {(item) => (
          // Each photo keeps its own shape; rows fill the width so no column is left short
          <li key={item.src} style={{ flex: `${(item.width / item.height) * 100} 1 ${Math.round((item.width / item.height) * 220)}px` }}>
            <figure>
              <button
                type="button"
                className="resPhotoBtn"
                aria-label={`Open photo: ${item.caption}`}
                onClick={() => setActive(PHOTOS.indexOf(item))}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </button>
              <figcaption>{item.caption}</figcaption>
            </figure>
          </li>
        )}
      </ProgressiveGrid>
      <dialog
        ref={dialog}
        className="resPlayer"
        aria-labelledby="photo-title"
        onClose={() => setActive(null)}
        onClick={(event) => event.target === dialog.current && dialog.current?.close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1)
          if (event.key === "ArrowRight") step(1)
        }}
      >
        {photo && active !== null && (
          <>
            <div className="resPlayerHead">
              <div>
                <small>
                  Photo {active + 1} of {PHOTOS.length}
                </small>
                <h2 id="photo-title">{photo.caption}</h2>
              </div>
              <button type="button" className="resClose" aria-label="Close photo" onClick={() => dialog.current?.close()}>
                <Icon d="M6 6l12 12M18 6L6 18" />
              </button>
            </div>
            <Image
              key={photo.src}
              className="resPhoto"
              src={photo.src}
              alt={photo.caption}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 1000px) 100vw, 1000px"
              priority
            />
            {PHOTOS.length > 1 && (
              <div className="resPlayerFoot resPhotoFoot">
                <button type="button" className="resNav" aria-label="Previous photo" onClick={() => step(-1)}>
                  <Icon d="M15 5l-7 7 7 7" />
                </button>
                <button type="button" className="resNav" aria-label="Next photo" onClick={() => step(1)}>
                  <Icon d="M9 5l7 7-7 7" />
                </button>
              </div>
            )}
          </>
        )}
      </dialog>
    </>
  )
}
