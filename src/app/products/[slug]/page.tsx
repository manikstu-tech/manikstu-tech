import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { BuyerReviews } from "@/components/sections/products/BuyerReviews"
import { ProductBuy } from "@/components/sections/products/ProductBuy"
import { ProductReviews } from "@/components/sections/products/ProductReviews"
import { ProductGallery } from "@/components/sections/products/ProductGallery"
import { ProductTabs } from "@/components/sections/products/ProductTabs"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { ImpactIcon } from "@/components/ui/ImpactIcon"
import { PRODUCTS, PRODUCT_DETAILS, PRODUCT_TRUST } from "@/constants/products"
import { SITE_URL } from "@/constants/site"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export const generateStaticParams = () => PRODUCTS.map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) return {}
  const title = `${product.name} | Manikstu Agro Private Limited`
  const url = `/products/${slug}`
  return {
    title,
    description: product.tagline,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: product.tagline,
      url,
      images: [`${SITE_URL}/products/${product.image}`],
    },
  }
}

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`

type Tab = { id: string; label: string; content: ReactNode }

// Turns a composition list into table rows. Three shapes are recognised:
//   "Composition (per 10 ml): Amla 300 mg, Harad (Chebulic Myrobalan) 250 mg."  ingredient and amount
//   "Core minerals: Zinc (Zn), Iron (Fe)."                                      mineral and symbol
//   "Maize / Broken Rice (25%); DDGS (15%)."                                   ingredient and share
// Returns null unless every item fits one shape, so free-text compositions stay as a paragraph.
function parseComposition(text: string) {
  const table = (headers: readonly [string, string], matches: (RegExpMatchArray | null)[]) =>
    matches.every(Boolean)
      ? {
          headers,
          rows: matches.map((m) => [m![1], m![2]] as const),
          // Two tables side by side fill the wide panel; the second is empty only for a single ingredient
          half: Math.ceil(matches.length / 2),
        }
      : null

  const listed = text.match(/^([^:]*):\s*(.+?)\.?$/)
  if (listed) {
    const items = listed[2].split(/,\s*(?![^()]*\))/)
    const per = listed[1].match(/\((per [^)]+)\)/)?.[1]
    return (
      table(
        ["Ingredient", per ? `Amount (${per})` : "Amount"],
        items.map((item) => item.match(/^(.+?)\s+(\d[\d.]*\s?(?:mg|g|ml|mcg))$/i)),
      ) ??
      table(
        [/mineral/i.test(listed[1]) ? "Mineral" : "Ingredient", "Symbol"],
        items.map((item) => item.match(/^(.+?)\s*\(([A-Z][a-z]?)\)$/)),
      )
    )
  }
  return table(
    ["Ingredient", "Share"],
    text.replace(/\.$/, "").split(/;\s*/).map((item) => item.match(/^(.+?)\s*\((\d[\d.]*%)\)$/)),
  )
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  const detail = PRODUCT_DETAILS[slug]
  if (!product || !detail) notFound()

  const others = PRODUCTS.filter((p) => p.slug !== slug)
  const related = [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, 3)
  const specs = detail.specs.filter(([, value]) => value)
  const composition = detail.composition ? parseComposition(detail.composition) : null
  const images = detail.images.map((path) => `${SITE_URL}${path}`)

  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="pdOverview">
          <div>
            <h2>Product description</h2>
            {detail.description.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <BuyerReviews slug={slug} />
          </div>
          <div className="pdAside">
            {detail.recommended.length > 0 && (
              <section>
                <h3>Recommended for</h3>
                <ul className="pdChecks">
                  {detail.recommended.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h3>Quick info</h3>
              <table className="pdSpecs">
                <tbody>
                  {specs.map(([label, value]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      ),
    },
  ]
  if (detail.composition)
    tabs.push({
      id: "composition",
      label: "Composition",
      content: (
        <>
          <h2>Composition</h2>
          {composition ? (
            <div className="pdCompGrid">
              {[composition.rows.slice(0, composition.half), composition.rows.slice(composition.half)].map(
                (rows) => (
                  <table className="pdComp" key={rows[0][0]}>
                    <thead>
                      <tr>
                        <th scope="col">{composition.headers[0]}</th>
                        <th scope="col">{composition.headers[1]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map(([name, amount]) => (
                        <tr key={name}>
                          <td>{name}</td>
                          <td>{amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ),
              )}
            </div>
          ) : (
            <p>{detail.composition}</p>
          )}
        </>
      ),
    })
  if (detail.dosage.length > 0)
    tabs.push({
      id: "usage",
      label: "Usage & Dosage",
      content: (
        <>
          <h2>Usage &amp; dosage</h2>
          <ul className="pdChecks">
            {detail.dosage.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </>
      ),
    })
  if (detail.storage)
    tabs.push({
      id: "storage",
      label: "Storage",
      content: (
        <>
          <h2>Storage &amp; handling</h2>
          <p>{detail.storage}</p>
        </>
      ),
    })

  tabs.push({
    id: "reviews",
    label: "Reviews",
    content: <ProductReviews slug={slug} />,
  })

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    image: images,
    url: `${SITE_URL}/products/${slug}`,
    brand: { "@type": "Brand", name: "Manikstu" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  }

  return (
    <>
      <Header />
      <main id="main" className="pdPage">
        <nav className="pdCrumbs" aria-label="Breadcrumb">
          <a href="/products">Products</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <section className="pdTop">
          <ProductGallery
            images={images}
            alt={product.name}
            size={product.size}
            video={detail.video}
          />
          <div className="pdInfo">
            <span className="pdChip">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="pdTagline">{product.tagline}</p>
            <p className="pdPrice">
              <strong>{rupees(product.price)}</strong> <span>per {product.size}</span>
            </p>
            <p className={product.inStock ? "pdStock in" : "pdStock"}>
              {product.inStock ? "In stock" : "Out of stock"}
            </p>
            <ProductBuy slug={slug} name={product.name} inStock={product.inStock} />
            <ul className="pdTrust">
              {PRODUCT_TRUST.slice(0, 3).map(({ title, icon }) => (
                <li key={title}>
                  <ImpactIcon type={icon} />
                  <span>{title}</span>
                </li>
              ))}
            </ul>
            {detail.why.length > 0 && (
              <section className="pdWhy" aria-labelledby="why">
                <h2 id="why">Why farmers choose it</h2>
                <ul className="pdChecks">
                  {detail.why.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </section>

        <ProductTabs tabs={tabs} />

        <section className="pdRelated" aria-labelledby="related">
          <div className="pdRelatedHead">
            <h2 id="related">You may also like</h2>
            <a className="textLink" href="/products">
              View all products <Arrow />
            </a>
          </div>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <a href={`/products/${item.slug}`}>
                  <Image
                    src={`${SITE_URL}/products/${item.image}`}
                    alt=""
                    width={160}
                    height={160}
                    sizes="160px"
                  />
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.tagline}</small>
                    <b>{rupees(item.price)}</b>
                  </span>
                </a>
              </li>
            ))}
          </ul>
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
