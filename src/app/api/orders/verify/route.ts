import { callBackend, readJson } from "@/lib/backend"

// The checkout reports a finished payment. The backend checks Razorpay's signature before it marks the order paid.
// The backend also learns of the payment from Razorpay's webhook, so an order is not lost if the buyer closes the tab right after paying.
export async function POST(request: Request) {
  const parsed = await readJson(request)
  if (!parsed.ok) return parsed.response
  const body = parsed.data
  return callBackend(request, "/v1/payments/verify", { method: "POST", body })
}
