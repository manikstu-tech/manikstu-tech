"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Arrow } from "@/components/ui/Arrow"
import { CartStepper } from "@/components/ui/CartStepper"
import { clearCart, setQty, useCart } from "@/lib/cart"
import { validateCustomer, type Customer, type CustomerErrors } from "@/lib/orders"
import { FILTERS, type FieldKind } from "@/lib/fieldFilters"
import { emailError } from "@/lib/email"
import { toast } from "@/lib/toast"
import { enqueueOrder } from "@/lib/orderQueue"
import { payWithRazorpay, type PayParams } from "@/lib/razorpayCheckout"
import { SavedOrders } from "./SavedOrders"

export type CatalogItem = {
  slug: string
  name: string
  size: string
  price: number
  inStock: boolean
  image: string
}

// The characters each delivery field accepts; address, landmark and notes stay free text
const FIELD_KINDS: Partial<Record<keyof Customer, FieldKind>> = {
  name: "name",
  phone: "phone",
  email: "email",
  city: "place",
  district: "place",
  state: "place",
  pincode: "digits",
}

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`

const FIELDS: {
  name: keyof Customer
  label: string
  placeholder: string
  autoComplete: string
  type?: string
  inputMode?: "numeric" | "tel"
  maxLength?: number
  full?: boolean
  optional?: boolean
  multiline?: boolean
}[] = [
  { name: "name", label: "Full Name", placeholder: "Your full name", autoComplete: "name" },
  { name: "phone", label: "Phone Number", placeholder: "10-digit mobile number", autoComplete: "tel-national", type: "tel", inputMode: "tel", maxLength: 14 },
  { name: "email", label: "Email", placeholder: "you@example.com", autoComplete: "email", type: "email", full: true },
  { name: "address", label: "Address", placeholder: "House / street / village", autoComplete: "address-line1", full: true },
  { name: "landmark", label: "Landmark / Area", placeholder: "Nearby landmark (optional)", autoComplete: "address-line2", maxLength: 100, full: true, optional: true },
  { name: "city", label: "City / Village", placeholder: "City or village", autoComplete: "address-level2" },
  { name: "district", label: "District", placeholder: "District", autoComplete: "off" },
  { name: "state", label: "State", placeholder: "State", autoComplete: "address-level1" },
  { name: "pincode", label: "PIN Code", placeholder: "6-digit PIN code", autoComplete: "postal-code", inputMode: "numeric", maxLength: 6 },
  { name: "notes", label: "Order Notes", placeholder: "Any delivery instructions (optional)", autoComplete: "off", maxLength: 500, full: true, optional: true, multiline: true },
]

const MESSAGES: Record<string, string> = {
  payments_not_configured: "Online payment is not switched on yet. Please contact us to place your order.",
  backend_not_configured: "Online ordering is not switched on yet. Please contact us to place your order.",
  rate_limited: "Too many attempts. Please try again in a few minutes.",
  invalid_items: "Something in your cart is no longer available. Please check it and try again.",
  backend_unreachable: "We could not reach the shop just now. Please try again in a moment.",
  idempotency_key_reuse: "Your cart changed since the last attempt. Please press pay again.",
}

type Conflict = { slug: string; reason: "unknown_product" | "out_of_stock" | "price_changed"; currentPrice?: number }

export function CartCheckout({ catalog, imageBase }: { catalog: CatalogItem[]; imageBase: string }) {
  const { lines } = useCart()
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    notes: "",
  })
  const [errors, setErrors] = useState<CustomerErrors>({})
  const checkEmail = (value: string) =>
    setErrors(({ email: _, ...rest }) => {
      const message = emailError(value)
      return message ? { ...rest, email: message } : rest
    })
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState("")
  const [paidOrder, setPaidOrder] = useState("")
  // Prices the shop has told us are current, when they differ from the ones this page was built with
  const [priceOverrides, setPriceOverrides] = useState<Record<string, number>>({})
  // One id per order attempt: a retry of the same cart sends the same id, so the shop can never place it twice
  const attempt = useRef<{ key: string; id: string } | null>(null)
  // The saved cart is only known in the browser, so wait for it instead of flashing "Your cart is empty"
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  const items = lines.flatMap(({ slug, qty }) => {
    const product = catalog.find((p) => p.slug === slug)
    return product ? [{ ...product, price: priceOverrides[slug] ?? product.price, qty }] : []
  })
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const units = items.reduce((sum, i) => sum + i.qty, 0)

  if (!ready) return <div className="cartPlaceholder" aria-busy="true" />

  if (paidOrder)
    return (
      <div className="cartDone" role="status">
        <h2>Thank you, your order is placed</h2>
        <p>
          Payment received. Your order number is <strong>{paidOrder}</strong>. We will contact you on the mobile
          number you gave to confirm delivery.
        </p>
        <Link className="button" href="/products">
          Continue shopping <Arrow />
        </Link>
      </div>
    )

  if (!items.length)
    return (
      <div className="cartDone">
        <h2>Your cart is empty</h2>
        <p>Add a product to start your order.</p>
        <Link className="button" href="/products">
          Browse products <Arrow />
        </Link>
        <SavedOrders catalog={catalog} />
      </div>
    )

  const pay = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateCustomer(customer)
    setErrors(found)
    setMessage("")
    if (Object.keys(found).length) {
      document.getElementById(`co-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setBusy(true)

    const order = {
      items: items.map(({ slug, qty, price }) => ({ slug, qty, expectedPrice: price })),
      customer,
    }
    const key = JSON.stringify(order)
    if (attempt.current?.key !== key) attempt.current = { key, id: crypto.randomUUID() }
    const clientOrderId = attempt.current.id

    // No connection: keep the order on this device and place it when the connection returns
    const saveForLater = async () => {
      await enqueueOrder({ clientOrderId, ...order })
      clearCart()
      attempt.current = null
      setBusy(false)
      toast.success("Order saved on this device", { description: "We will place it when you are back online." })
    }
    if (!navigator.onLine) return saveForLater()

    try {
      let res: Response
      try {
        res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientOrderId, ...order }),
        })
      } catch {
        // The connection dropped while sending: save it rather than lose it
        return await saveForLater()
      }
      const data = await res.json().catch(() => ({}))
      if (res.status === 409 && data.error === "conflict") {
        const conflicts: Conflict[] = data.conflicts ?? []
        const nameOf = (slug: string) => catalog.find((p) => p.slug === slug)?.name ?? slug
        setPriceOverrides((now) => ({ ...now, ...Object.fromEntries(conflicts.flatMap((c) => (c.currentPrice !== undefined ? [[c.slug, c.currentPrice]] : []))) }))
        attempt.current = null
        setMessage(
          conflicts
            .map((c) =>
              c.reason === "price_changed"
                ? `The price of ${nameOf(c.slug)} is now ${rupees(c.currentPrice ?? 0)}. Please check the total and pay again.`
                : `${nameOf(c.slug)} is no longer available. Please remove it to continue.`,
            )
            .join(" "),
        )
        setBusy(false)
        return
      }
      if (!res.ok) {
        if (data.error === "idempotency_key_reuse") attempt.current = null
        setMessage(MESSAGES[data.error] ?? "We could not start the payment. Please try again in a moment.")
        setBusy(false)
        return
      }
      const params = data as PayParams
      const ref = params.orderId.slice(0, 8).toUpperCase()
      await payWithRazorpay(params, customer, {
        onPaid: () => {
          clearCart()
          attempt.current = null
          setPaidOrder(ref)
          toast.success("Payment received", { description: `Order ${ref}` })
          setBusy(false)
        },
        onUnconfirmed: (paymentId) => {
          setMessage(`We received your payment but could not confirm it. Please contact us with payment id ${paymentId}.`)
          setBusy(false)
        },
        onDismiss: () => setBusy(false),
      })
    } catch {
      setMessage("We could not start the payment. Please check your connection and try again.")
      setBusy(false)
    }
  }

  return (
    <div className="cartLayout">
      <div className="cartMain">
        <SavedOrders catalog={catalog} />
        <section aria-labelledby="cart-items">
          <h2 id="cart-items">
            Items <span>{units}</span>
          </h2>
          <ul className="cartItems">
            {items.map((item) => (
              <li key={item.slug}>
                <img src={`${imageBase}/${item.image}`} alt="" width="88" height="88" />
                <div className="cartItemInfo">
                  <Link href={`/products/${item.slug}`}>{item.name}</Link>
                  <small>
                    {item.size} · {rupees(item.price)} each
                  </small>
                  {!item.inStock && <small>Out of stock. Remove it to continue.</small>}
                  <div className="cartItemActions">
                    <CartStepper slug={item.slug} name={item.name} qty={item.qty} />
                    <button type="button" className="cartRemove" onClick={() => setQty(item.slug, 0)}>
                      Remove
                    </button>
                  </div>
                </div>
                <strong>{rupees(item.price * item.qty)}</strong>
              </li>
            ))}
          </ul>
        </section>

        <form id="checkout" className="cartForm" onSubmit={pay} noValidate aria-labelledby="cart-details">
          <h2 id="cart-details">Delivery details</h2>
          <div className="cartFields">
            {FIELDS.map(({ name, label, placeholder, autoComplete, type, inputMode, maxLength, full, optional, multiline }) => {
              const control = {
                id: `co-${name}`,
                name,
                maxLength,
                placeholder,
                autoComplete,
                value: customer[name],
                onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                  const kind = FIELD_KINDS[name]
                  const value = kind ? FILTERS[kind](e.target.value) : e.target.value
                  setCustomer({ ...customer, [name]: value })
                  // Once an email message shows, it updates as the visitor fixes the address
                  if (name === "email" && errors.email) checkEmail(value)
                },
                // The email is checked as soon as the visitor leaves the field
                onBlur: name === "email" ? () => checkEmail(customer.email) : undefined,
                "aria-required": !optional,
                "aria-invalid": !!errors[name],
                "aria-describedby": errors[name] ? `co-${name}-error` : undefined,
              }
              return (
                <div key={name} className={full ? "field full" : "field"}>
                  <label htmlFor={`co-${name}`}>
                    {label}
                    {!optional && (
                      <span className="fieldRequired" aria-hidden="true">
                        {" "}
                        *
                      </span>
                    )}
                  </label>
                  {multiline ? (
                    <textarea {...control} rows={3} />
                  ) : (
                    <input {...control} type={type ?? "text"} inputMode={inputMode} />
                  )}
                  {errors[name] && (
                    <p className="fieldError" id={`co-${name}-error`}>
                      {errors[name]}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </form>
      </div>

      <aside className="cartSummary" aria-labelledby="cart-summary">
        <h2 id="cart-summary">Order summary</h2>
        <ul className="cartLines">
          {items.map((item) => (
            <li key={item.slug}>
              <span>
                {item.name} <small>× {item.qty}</small>
              </span>
              <span>{rupees(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="cartTotal">
          <span>Total to pay</span>
          <strong>{rupees(total)}</strong>
        </p>
        <button
          className="button cartPay"
          type="submit"
          form="checkout"
          disabled={busy || items.some((i) => !i.inStock)}
        >
          {busy ? "Please wait..." : `Pay ${rupees(total)}`}
        </button>
        <p className="cartNote" role="alert">
          {message}
        </p>
        <ul className="cartAssure">
          <li>Secure online payment through Razorpay</li>
          <li>We call you to confirm delivery</li>
        </ul>
      </aside>
    </div>
  )
}
