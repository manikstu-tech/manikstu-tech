import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { ProductGrid } from "@/components/sections/products/ProductGrid"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { ImpactIcon } from "@/components/ui/ImpactIcon"
import { PRODUCTS, PRODUCT_ASSURANCE, PRODUCT_TRUST } from "@/constants/products"
import { CONTACT_PAGE, productImage, SITE_URL } from "@/constants/site"

const TITLE = "Goat farming products, supplements and feed | Manikstu Agro Private Limited"
const DESCRIPTION =
  "Veterinary tonics, mineral lick blocks and complete goat feed from Manikstu Agro Private Limited: curated products for healthier goats, sourced with care and priced for rural households."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/products" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/products",
    images: [`${SITE_URL}/products-hero.webp`],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Manikstu products",
  itemListElement: PRODUCTS.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      description: product.tagline,
      image: productImage(product.image),
      url: `${SITE_URL}/products/${product.slug}`,
      brand: { "@type": "Brand", name: "Manikstu" },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "INR",
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    },
  })),
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="productsHero">
          <div className="productsIntro">
            <p className="eyebrow">Our products</p>
            <h1>
              Quality products
              <br />
              for healthier
              <br />
              farms.
            </h1>
            <p className="productsLede">
              From veterinary medicines to farm essentials, curated products
              that empower goat farmers across India.
            </p>
            <div className="productsActions">
              <a className="button" href="#products-grid">
                Browse products <Arrow />
              </a>
              <a className="textLink" href={CONTACT_PAGE}>
                Enquire now <Arrow />
              </a>
            </div>
            <ul className="productsAssure">
              {PRODUCT_ASSURANCE.map(({ text, icon }) => (
                <li key={text}>
                  <ImpactIcon type={icon} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="productsFigure">
            <img
              src={`${SITE_URL}/products-hero.webp`}
              alt="Farm-first product range: Poshak Tatwa syrup, Goat Feed and Goat Manure packs"
              width="1402"
              height="1122"
            />
          </figure>
        </section>

        <section className="catalog" id="products-grid">
          <div className="catalogHead">
            <h2>Explore our product range</h2>
            <p>Trusted by farmers, for healthier animals and better livelihoods.</p>
          </div>
          <ProductGrid />
        </section>

        <section className="productsTrust" aria-label="Why farmers choose Manikstu">
          <ul>
            {PRODUCT_TRUST.map(({ title, text, icon }) => (
              <li key={title}>
                <ImpactIcon type={icon} />
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="productsHelp">
          <div>
            <h2>Not sure what your herd needs?</h2>
            <p>
              Tell us about your goats and our team will point you to the right
              products.
            </p>
          </div>
          <a className="button" href={CONTACT_PAGE}>
            Enquire now <Arrow />
          </a>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  )
}
