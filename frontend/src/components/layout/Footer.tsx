import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Products", href: "/products" },
  { label: "Media", href: "/blog" },
  { label: "Collaborate", href: "/collaborate" },
  { label: "Training & Awareness", href: "/training" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-light-grey">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Manikstu Agro"
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-grey">
              Building a prosperous and sustainable agricultural future through
              innovation, collaboration and empowerment.
            </p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green hover:bg-manikstu-green hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-grey hover:text-manikstu-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
              Support
            </h3>
            <ul className="mt-3 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-grey hover:text-manikstu-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
              Contact Us
            </h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-start gap-2 text-sm text-grey">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-manikstu-green" />
                Manikstu Agro Private Limited, Barpali, Odisha, India - 767026
              </li>
              <li className="flex items-center gap-2 text-sm text-grey">
                <Phone className="h-4 w-4 flex-shrink-0 text-manikstu-green" />
                +91 70081 03555
              </li>
              <li className="flex items-center gap-2 text-sm text-grey">
                <Mail className="h-4 w-4 flex-shrink-0 text-manikstu-green" />
                info@manikstu.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-light-grey">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-grey">
            © {new Date().getFullYear()} Manikstu Agro Private Limited. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs text-grey">
            <Link href="/careers" className="hover:text-manikstu-green transition-colors">Careers</Link>
            <Link href="/get-in-touch" className="hover:text-manikstu-green transition-colors">Get In Touch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
