"use client"

import Link from "next/link"
import { useState } from "react"
import { ProgressiveGrid } from "@/components/sections/resources/ProgressiveGrid"
import { Arrow } from "@/components/ui/Arrow"
import { POSTS, POST_CATEGORIES } from "@/constants/resources"

const countOf = (filter: string) =>
  filter === "All" ? POSTS.length : POSTS.filter(({ category }) => category === filter).length

// Only topics that have at least one post get a chip (posts open at /blogs/<slug>)
const FILTERS = ["All", ...POST_CATEGORIES.filter((name) => countOf(name) > 0)]

export function PostGrid() {
  const [filter, setFilter] = useState("All")
  const shown = filter === "All" ? POSTS : POSTS.filter(({ category }) => category === filter)

  return (
    <>
      <div className="resBar">
        <div className="catalogTabs" role="group" aria-label="Filter posts by topic">
          {FILTERS.map((name) => (
            <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)}>
              {name} <span>{countOf(name)}</span>
            </button>
          ))}
        </div>
        <p aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "post" : "posts"}
        </p>
      </div>
      {/* Keyed by filter so a new topic starts from the first page again */}
      <ProgressiveGrid key={filter} items={shown} step={6} className="resPosts">
        {(post) => (
          <li key={post.title}>
            <article className="resPost">
              <span className="tag">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="resPostMeta">
                <time>{post.dateLabel}</time>
                {post.slug && (
                  <Link className="textLink" href={`/blogs/${post.slug}`} aria-label={`Read: ${post.title}`}>
                    Read <Arrow />
                  </Link>
                )}
              </div>
            </article>
          </li>
        )}
      </ProgressiveGrid>
    </>
  )
}
