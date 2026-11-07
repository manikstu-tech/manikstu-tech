"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

import { JOIN_PAGE, LOCAL_ASSET_BASE } from "@/constants/site"
import type { NavItem } from "@/types"

import { MegaMenu, NavDropdown, type MegaColumn } from "@/components/layout/MegaMenu"
import { Arrow } from "@/components/ui/Arrow"

// The menu's text arrives as props from Header, so edits made in the admin reach this client component
export function HeaderBar({ links, mega, join }: { links: NavItem[]; mega: MegaColumn[]; join: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  // In the phone menu the groups are folded; the one holding the current page starts open
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const [active, setActive] = useState(links[0].href)
  const pathname = usePathname()
  // On our own pages the underline follows the route, not the last in-page click
  // The cart and each product page belong to Products, and each blog post to the Resources menu
  const section = pathname === "/cart" || pathname.startsWith("/products/")
    ? "/products"
    : pathname.startsWith("/blogs/")
      ? "/blogs"
      : pathname.startsWith("/projects/") || pathname.startsWith("/solutions/")
        ? "/#solutions"
        : pathname
  const here = links.find(
    ({ href, menu }) => href === section || menu?.some((m) => m.href === section),
  )
  // Pages outside the menu (Join Us, for one) underline nothing; only the home page follows the last in-page click
  const current = here ? here.href : pathname === "/" ? active : null

  // Clicking the link to the page you are already on goes back to the top, as visitors expect
  const toTopIfHere = (href: string) => {
    if (href === pathname) window.scrollTo({ top: 0 })
  }

  // Keyboard users land on the close button when the menu opens and come back to the menu button when it closes
  useEffect(() => {
    if (menuOpen) {
      setOpenGroup(here?.menu ? here.label : null)
      closeButton.current?.focus()
    } else if (wasOpen.current) menuButton.current?.focus()
    wasOpen.current = menuOpen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen])

  // While the phone menu is open the page behind it stays still, and Escape closes it
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return setMenuOpen(false)
      if (event.key !== "Tab") return
      // Keep Tab inside the open drawer instead of wandering into the page behind it
      const items = [
        ...document.querySelectorAll<HTMLElement>("#site-nav a[href], #site-nav button"),
      ].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header className="header">
      {/* First in the markup so the keyboard reaches it first, and on phones it sits at the left where the menu slides from */}
      <button
        ref={menuButton}
        type="button"
        className="menu"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span />
        <span />
        <span />
      </button>
      <Link
        className="brand"
        href="/"
        aria-label="Manikstu home"
        onClick={() => toTopIfHere("/")}
      >
        <Image
          src={`${LOCAL_ASSET_BASE}/manikstu-logo-green.png`}
          alt="Manikstu Agro Private Limited"
          width={184}
          height={68}
          priority
        />
      </Link>
      <div className={menuOpen ? "navScrim open" : "navScrim"} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <nav
        id="site-nav"
        className={menuOpen ? "nav open" : "nav"}
        aria-label="Main navigation"
      >
        <div className="navHead">
          <span>Menu</span>
          <button ref={closeButton} type="button" className="navClose" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {links.map(({ label, href, menu, dropdownOnly }) => {
          const Tag = href.startsWith("/") ? Link : "a"
          const link = dropdownOnly ? (
            <button
              type="button"
              className={href === current ? "navTrigger active" : "navTrigger"}
              aria-haspopup="true"
              aria-expanded={openGroup === label}
              onClick={() => setOpenGroup(openGroup === label ? null : label)}
            >
              {label}
            </button>
          ) : (
            <Tag
              href={href}
              className={href === current ? "active" : undefined}
              aria-current={href === pathname ? "page" : undefined}
              onClick={() => {
                toTopIfHere(href)
                setActive(href)
                setMenuOpen(false)
              }}
            >
              {label}
            </Tag>
          )
          return href === "/#solutions" || menu ? (
            <div className={openGroup === label ? "navItem expanded" : "navItem"} key={label}>
              {link}
              {menu ? (
                <NavDropdown links={menu} onNavigate={() => setMenuOpen(false)} />
              ) : (
                <MegaMenu columns={mega} onNavigate={() => setMenuOpen(false)} />
              )}
            </div>
          ) : (
            <Fragment key={label}>{link}</Fragment>
          )
        })}
        <Link
          className="button navJoin"
          href={JOIN_PAGE}
          onClick={() => {
            toTopIfHere(JOIN_PAGE)
            setMenuOpen(false)
          }}
        >
          {join} <Arrow />
        </Link>
      </nav>
      <Link
        className="button headerCta"
        href={JOIN_PAGE}
        onClick={() => toTopIfHere(JOIN_PAGE)}
      >
        {join} <Arrow />
      </Link>
    </header>
  )
}
