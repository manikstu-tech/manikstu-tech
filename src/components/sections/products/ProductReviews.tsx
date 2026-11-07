"use client"

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react"
import {
  averageRating,
  validateReview,
  type Review,
  type ReviewErrors,
  type ReviewPage,
} from "@/lib/reviews"
import { FILTERS } from "@/lib/fieldFilters"
import { toast } from "@/lib/toast"

const STARS = [1, 2, 3, 4, 5]
const PAGE = 5

export const Stars = ({ value }: { value: number }) => (
  <span className="pdStars" role="img" aria-label={`${value} out of 5 stars`}>
    {STARS.map((n) => (
      <span key={n} className={n <= Math.round(value) ? "on" : ""} aria-hidden="true">
        ★
      </span>
    ))}
  </span>
)

export const date = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { dateStyle: "medium" })

export function ProductReviews({ slug }: { slug: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [total, setTotal] = useState(0)
  const [counts, setCounts] = useState([0, 0, 0, 0, 0])
  const [loaded, setLoaded] = useState(false)
  const [more, setMore] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const fetched = useRef(0) // reviews taken from the server so far, which is the next offset
  const busy = useRef(false)
  const end = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [text, setText] = useState("")
  const [errors, setErrors] = useState<ReviewErrors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle")

  const loadMore = useCallback(async () => {
    if (busy.current) return
    busy.current = true
    try {
      const res = await fetch(`/api/reviews?slug=${slug}&offset=${fetched.current}&limit=${PAGE}`)
      if (!res.ok) throw new Error()
      const page: ReviewPage = await res.json()
      fetched.current += page.reviews.length
      // A review posted meanwhile shifts the list by one, so a page can repeat one we already hold
      setReviews((current) => [...current, ...page.reviews.filter((r) => !current.some((c) => c.id === r.id))])
      setTotal(page.total)
      setCounts(page.counts)
      setMore(page.reviews.length > 0 && fetched.current < page.total)
      setLoaded(true)
    } catch {
      setLoadFailed(true)
    }
    busy.current = false
  }, [slug])

  useEffect(() => {
    loadMore()
  }, [loadMore])

  // Instagram-style: the next page loads when the end of the list scrolls near the screen
  useEffect(() => {
    const node = end.current
    if (!node || !more || loadFailed) return
    // The list scrolls inside its own box, so that box is the viewport the sentinel is measured against
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && loadMore(), {
      root: scroller.current,
      rootMargin: "300px",
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [more, loadFailed, loadMore, reviews.length])

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateReview({ name, rating, text })
    setErrors(found)
    if (Object.keys(found).length) return
    setStatus("sending")
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name,
          rating,
          text,
          website: new FormData(event.currentTarget).get("website"),
        }),
      })
      if (!res.ok) throw new Error()
      const { review } = (await res.json()) as { review?: Review }
      if (review) {
        setReviews((current) => [review, ...current])
        setTotal((t) => t + 1)
        setCounts((c) => c.map((n, i) => (i === review.rating - 1 ? n + 1 : n)))
      }
      setName("")
      setRating(0)
      setText("")
      setStatus("sent")
      toast.success("Thanks for your review")
    } catch {
      setStatus("failed")
      toast.error("Your review was not posted", { description: "Please try again in a moment." })
    }
  }

  const count = total
  const average = averageRating(counts, total)

  return (
    <div className="pdReviews">
      <div className="pdSummary">
        <p className="pdAverage">
          <strong>{average.toFixed(1)}</strong>
          <Stars value={average} />
          <span>
            {count} {count === 1 ? "review" : "reviews"}
          </span>
        </p>
        <ul className="pdBars" aria-label="Ratings breakdown">
          {[5, 4, 3, 2, 1].map((n) => {
            const stars = counts[n - 1]
            return (
              <li key={n}>
                <span>{n}★</span>
                <span className="pdBar">
                  <i style={{ width: count ? `${(stars / count) * 100}%` : 0 }} />
                </span>
                <span>{stars}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="pdReviewsMain">
        <div className="pdReviewsHead">
          <h3>Latest reviews</h3>
          {loaded && (
            <span>
              {total} {total === 1 ? "review" : "reviews"}
            </span>
          )}
        </div>
        {loadFailed && <p role="alert">Reviews could not be loaded. Please try again later.</p>}
        {!loadFailed && !loaded && <p>Loading reviews...</p>}
        {loaded && total === 0 && <p>No reviews yet. Be the first to share your experience.</p>}
        <div className="pdReviewScroll" ref={scroller} tabIndex={0} role="region" aria-label="Latest reviews">
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
          {more && (
            <div className="pdMore" ref={end}>
              Loading more reviews...
            </div>
          )}
        </div>
        {loaded && !more && total > 7 && (
          <button
            type="button"
            className="pdBackTop"
            onClick={() =>
              scroller.current?.scrollTo({
                top: 0,
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
              })
            }
          >
            Back to top ↑
          </button>
        )}
      </div>

      <form className="pdReviewForm" onSubmit={submit} noValidate>
        <h3>Write a review</h3>
        <label>
          Your name
          <input
            type="text"
            name="name"
            autoComplete="name"
            maxLength={60}
            value={name}
            onChange={(e) => setName(FILTERS.name(e.target.value))}
            aria-invalid={!!errors.name}
          />
          {errors.name && <small role="alert">{errors.name}</small>}
        </label>
        <fieldset>
          <legend>Your rating</legend>
          <div className="pdPick">
            {STARS.map((n) => (
              <label key={n} className={n <= rating ? "on" : ""}>
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                />
                <span aria-hidden="true">★</span>
                <span className="srOnly">{n} out of 5</span>
              </label>
            ))}
          </div>
          {errors.rating && <small role="alert">{errors.rating}</small>}
        </fieldset>
        <label>
          Your review
          <textarea
            name="text"
            rows={4}
            maxLength={1000}
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-invalid={!!errors.text}
          />
          {errors.text && <small role="alert">{errors.text}</small>}
        </label>
        <input className="srOnly" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="button" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Posting..." : "Post review"}
        </button>
        <p aria-live="polite">
          {status === "sent" && "Thank you! Your review has been posted."}
          {status === "failed" && "Your review could not be posted. Please try again in a moment."}
        </p>
      </form>
    </div>
  )
}
