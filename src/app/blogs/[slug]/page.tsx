import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { Arrow } from "@/components/ui/Arrow"
import { BackToTop } from "@/components/ui/BackToTop"
import { POSTS, PRESS } from "@/constants/resources"

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export const generateStaticParams = () => POSTS.flatMap(({ slug }) => (slug ? [{ slug }] : []))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  // The headline alone keeps the title under 70 characters, which search results show in full
  const url = `/blogs/${slug}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: { title: post.title, description: post.excerpt, url },
  }
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params
  const post = POSTS.find((p) => p.slug === slug)
  if (!post?.body) notFound()

  const minutes = Math.max(1, Math.round(post.body.join(" ").split(/\s+/).length / 200))
  // The picture of the story this post is based on, credited to its publisher
  const lead = PRESS.find((item) => item.url === post.sources?.[0]?.url)
  const next = POSTS.filter((p) => p.slug && p.slug !== slug).slice(0, 3)

  return (
    <>
      <Header />
      <main id="main" className="pdPage postPage">
        <div className="postShell">
          <nav className="pdCrumbs" aria-label="Breadcrumb">
            <a href="/blogs">Blogs</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{post.title}</span>
          </nav>

          <div className="postLayout">
            <article className="postArticle">
              <span className="tag">{post.category}</span>
              <h1>{post.title}</h1>
              <p className="postMeta">
                {post.dateLabel} · {minutes} min read · Manikstu Agro Private Limited
              </p>
              {lead && (
                <figure className="postFigure">
                  {/* The frame takes the picture's own shape, so it fills the column with nothing cropped or left empty */}
                  <span className="postImg" style={{ aspectRatio: `${lead.width} / ${lead.height}` }}>
                    <Image
                      src={lead.image}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 900px) 100vw, 68ch"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                  <figcaption>Image: {lead.publisher}</figcaption>
                </figure>
              )}
              <p className="postLede">{post.excerpt}</p>
              {post.body.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </article>

            <aside className="postAside" aria-label="About this story">
              {post.facts && (
                <section className="postFacts" aria-labelledby="facts">
                  <h2 id="facts">Key facts</h2>
                  <dl>
                    {post.facts.map(({ value, label }) => (
                      <div key={label}>
                        <dt>{value}</dt>
                        <dd>{label}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              {post.sources && (
                <section className="postSources" aria-labelledby="sources">
                  <h2 id="sources">Read the original</h2>
                  <ul>
                    {post.sources.map(({ label, url }) => (
                      <li key={url}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {label} <Arrow />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <Link className="textLink" href="/blogs#posts">
                Back to all posts <Arrow />
              </Link>
            </aside>
          </div>

          {next.length > 0 && (
            <section className="postNext" aria-labelledby="read-next">
              <h2 id="read-next">Read next</h2>
              <ul className="resPosts">
                {next.map((item) => (
                  <li key={item.slug}>
                    <article className="resPost">
                      <span className="tag">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <div className="resPostMeta">
                        <time>{item.dateLabel}</time>
                        <Link className="textLink" href={`/blogs/${item.slug}`} aria-label={`Read: ${item.title}`}>
                          Read <Arrow />
                        </Link>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
