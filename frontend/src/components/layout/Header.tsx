"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Collaborate", href: "/collaborate" },
  { label: "Training", href: "/training" },
  { label: "Impact", href: "/impact" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Manikstu Agro"
            width={120}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal hover:text-manikstu-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+919437000000"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-manikstu-green"
          >
            <Phone className="h-4 w-4" />
            Call Us
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-charcoal"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Saura-style border */}
      <div className="h-1 bg-gradient-to-r from-manikstu-red via-manikstu-green to-manikstu-red" />

      {/* Mobile nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-manikstu-leaf text-white">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium border-b border-white/10 hover:text-manikstu-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+919437000000"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-manikstu-green py-3 text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
