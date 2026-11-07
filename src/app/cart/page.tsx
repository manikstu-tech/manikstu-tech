import type { Metadata } from "next"
import Link from "next/link"
import { Arrow } from "@/components/ui/Arrow"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { CartCheckout } from "@/components/sections/cart/CartCheckout"
import { BackToTop } from "@/components/ui/BackToTop"
import { PRODUCTS } from "@/constants/products"
import { PRODUCT_IMAGE_BASE } from "@/constants/site"

export const metadata: Metadata = {
  title: "Your Cart | Manikstu Agro Private Limited",
  robots: { index: false },
}

// Only what the cart needs, so the client bundle does not carry the full product details
const catalog = PRODUCTS.map(({ slug, name, size, price, inStock, image }) => ({
  slug,
  name,
  size,
  price,
  inStock,
  image,
}))

export default function CartPage() {
  return (
    <>
      <Header />
      <main id="main" className="pdPage cartPage">
        <div className="cartHead">
          <h1>Your cart</h1>
          <Link className="textLink" href="/products">
            Continue shopping <Arrow />
          </Link>
        </div>
        <CartCheckout catalog={catalog} imageBase={PRODUCT_IMAGE_BASE} />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
