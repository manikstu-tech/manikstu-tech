import { callBackend, readJson } from "@/lib/backend"

// Product reviews are stored by the backend. The shapes the page reads are unchanged:
// GET  -> { reviews, total, counts }   POST -> { review }
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams
  const forwarded = new URLSearchParams()
  for (const key of ["slug", "offset", "limit"]) {
    const value = query.get(key)
    if (value !== null) forwarded.set(key, value)
  }
  return callBackend(request, `/v1/reviews?${forwarded}`)
}

export async function POST(request: Request) {
  const parsed = await readJson(request)
  if (!parsed.ok) return parsed.response
  const body = parsed.data
  return callBackend(request, "/v1/reviews", { method: "POST", body })
}
