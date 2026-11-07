"use client"

import { useEffect, useState } from "react"
import { Stars, date } from "@/components/sections/products/ProductReviews"
import { averageRating, type ReviewPage } from "@/lib/reviews"

const SHOWN = 3

// A short read-only preview for the Overview tab; the Reviews tab has the full list and the form
export function BuyerReviews({ slug }: { slug: string }) {
  const [page, setPage] = useState<ReviewPage | null>(null)

  useEffect(() => {
    fetch(`/api/reviews?slug=${slug}&limit=${SHOWN}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setPage)
      .catch(() => setPage(null))
  }, [slug])

  if (!page) return null
  const { reviews, total, counts } = page

  return (
    <section className="pdBuyers" aria-labelledby="buyers">
      <h3 id="buyers">What buyers say</h3>
      {total > 0 && (
        <p className="pdAverage">
          <Stars value={averageRating(counts, total)} />
          <span>
            {averageRating(counts, total).toFixed(1)} from {total} {total === 1 ? "review" : "reviews"}
          </span>
        </p>
      )}
      {total === 0 && <p>No reviews yet. Be the first to share your experience.</p>}
      <ul className="pdReviewList">
        {reviews.map((review) => (
          <li key={review.id}>
            <div className="pdReviewHead">
              <Stars value={review.rating} />
              <strong>{review.name}</strong>
              <time dateTime={review.createdAt}>{date(review.createdAt)}</time>
            </div>
            <p>{review.text}</p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="pdBuyersMore"
        onClick={() => document.getElementById("tab-reviews")?.click()}
      >
        {total > SHOWN ? "See all reviews" : "Write a review"}
      </button>
    </section>
  )
}
