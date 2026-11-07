export type Review = {
  id: string
  name: string
  rating: number
  text: string
  createdAt: string
}

export type ReviewValues = { name: string; rating: number; text: string }
export type ReviewErrors = Partial<Record<keyof ReviewValues, string>>

// Shared by the form (instant feedback) and the API route (the check that counts)
export function validateReview({ name, rating, text }: ReviewValues): ReviewErrors {
  const errors: ReviewErrors = {}
  const nameLength = name.trim().length
  const textLength = text.trim().length
  if (nameLength < 2 || nameLength > 60) errors.name = "Enter your name (2 to 60 characters)."
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Choose a rating from 1 to 5."
  if (textLength < 10 || textLength > 1000) errors.text = "Write 10 to 1000 characters."
  return errors
}

// One page of the review list plus the totals the summary needs; counts[0] is the number of 1-star reviews
export type ReviewPage = { reviews: Review[]; total: number; counts: number[] }

export const averageRating = (counts: number[], total: number) =>
  total ? counts.reduce((sum, n, i) => sum + n * (i + 1), 0) / total : 0
