"use client"

import Image from "next/image"
import { useState } from "react"

// One large shot with arrows, a row of thumbnails, and a link to the product video
export function ProductGallery({
  images,
  alt,
  size,
  video,
}: {
  images: string[]
  alt: string
  size: string
  video: string | null
}) {
  const [index, setIndex] = useState(0)
  const step = (dir: 1 | -1) => setIndex((index + dir + images.length) % images.length)

  return (
    <div className="pdGallery">
      <div className="pdStage">
        <Image src={images[index]} alt={alt} width={800} height={800} sizes="(max-width: 960px) 100vw, 50vw" priority />
        <span className="pdSize">{size}</span>
        {images.length > 1 && (
          <>
            <button className="pdArrow prev" type="button" aria-label="Previous image" onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button className="pdArrow next" type="button" aria-label="Next image" onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
      <ul className="pdThumbs">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            >
              <Image src={src} alt="" width={160} height={160} sizes="120px" />
            </button>
          </li>
        ))}
        {video && (
          <li>
            <a
              className="pdVideo"
              href={`https://www.youtube.com/watch?v=${video}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch the product video on YouTube"
            >
              <img src={`https://img.youtube.com/vi/${video}/hqdefault.jpg`} alt="" width="160" height="160" loading="lazy" />
              <span aria-hidden="true">▶</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
