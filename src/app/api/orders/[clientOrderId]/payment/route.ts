import { callBackend } from "@/lib/backend"

// Starts (or resumes) the payment for an order the backend already holds, such as one that was saved offline and has now been placed.
export async function POST(request: Request, { params }: { params: Promise<{ clientOrderId: string }> }) {
  const { clientOrderId } = await params
  return callBackend(request, `/v1/orders/${encodeURIComponent(clientOrderId)}/payment`, { method: "POST" })
}
