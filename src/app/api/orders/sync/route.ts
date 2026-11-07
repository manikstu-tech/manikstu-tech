import { callBackend, readJson } from "@/lib/backend"

// Orders saved in the browser while it was offline are sent here when the connection returns.
// Each order gets its own result, and sending one again is safe: the backend recognises it by its clientOrderId.
export async function POST(request: Request) {
  const parsed = await readJson(request)
  if (!parsed.ok) return parsed.response
  const body = parsed.data
  return callBackend(request, "/v1/orders/sync", { method: "POST", body })
}
