import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  services: [
    { label: "Goat Care", href: "/services/goat-care" },
    { label: "Farm ERP", href: "/services/erp" },
    { label: "Farming Solutions", href: "/services/farming-solution" },
    { label: "Insurance", href: "/services/insurance" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Impact", href: "/impact" },
    { label: "Careers", href: "/careers" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-manikstu-leaf text-white">
      {/* Saura border top */}
      <div className="h-1 bg-gradient-to-r from-manikstu-gold via-saura-red to-manikstu-gold" />

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
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-3 text-sm text-white/70">
              Revolutionizing Goat Farming Ecosystem Worldwide. Founded 2015,
              Kalahandi, Odisha.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-manikstu-gold">
              Services
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-manikstu-gold">
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-manikstu-gold">
              Resources
            </h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          &copy; {new Date().getFullYear()} Manikstu Agro Private Limited. All
          rights reserved. GSTIN: 21AAJCM6881B1ZM
        </div>
      </div>
    </footer>
  );
}
