import { callBackend, readJson } from "@/lib/backend"

// Places the order, then starts its payment, and answers with what the checkout needs:
// { orderId, razorpayOrderId, amount (paise), keyId }. Prices are decided by the backend; the browser only says what and how many.
// Sending the same clientOrderId again (a retry) returns the same order, never a second one.
export async function POST(request: Request) {
  const parsed = await readJson(request)
  if (!parsed.ok) return parsed.response
  const body = parsed.data

  const placed = await callBackend(request, "/v1/orders", { method: "POST", body })
  if (!placed.ok) return placed
  const order = (await placed.json()) as { clientOrderId: string }

  const payment = await callBackend(request, `/v1/orders/${encodeURIComponent(order.clientOrderId)}/payment`, { method: "POST" })
  if (!payment.ok) return payment
  return Response.json({ ...(await payment.json()), clientOrderId: order.clientOrderId }, { status: 201 })
}
