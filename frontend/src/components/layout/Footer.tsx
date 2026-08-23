import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, ArrowRight, Link2, Headphones, ChevronRight, Send, MapPin } from "lucide-react";

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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
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
              {[Facebook, Instagram, Linkedin, Twitter, Youtube].map((Icon, i) => (
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
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Link2 className="h-3.5 w-3.5" />
              </span>
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-grey hover:text-manikstu-green transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 flex-shrink-0 text-manikstu-green" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Headphones className="h-3.5 w-3.5" />
              </span>
              Support
            </h3>
            <ul className="mt-3 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-sm text-grey hover:text-manikstu-green transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 flex-shrink-0 text-manikstu-green" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Phone className="h-3.5 w-3.5" />
              </span>
              Contact Us
            </h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center gap-2 text-sm text-grey">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                +91 82703 31856
              </li>
              <li className="flex items-start gap-2 text-sm text-grey">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span>sales@manikstu.com<br /><span className="text-xs text-grey/70">(For Sales Enquiry)</span></span>
              </li>
              <li className="flex items-start gap-2 text-sm text-grey">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                  <Send className="h-3.5 w-�3.5" />
                </span>
                <span>info@manikstu.com<br /><span className="text-xs text-grey/70">(For Other Enquiry)</span></span>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-lg bg-manikstu-green px-4 py-2 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
              >
                Careers <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/get-in-touch"
                className="inline-flex items-center gap-2 rounded-lg border border-manikstu-green bg-white px-4 py-2 text-sm font-semibold text-manikstu-green hover:bg-manikstu-green hover:text-white transition-colors"
              >
                Get In Touch <Phone className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stay Updated */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-charcoal">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Mail className="h-3.5 w-3.5" />
              </span>
              Stay Updated
            </h3>
            <p className="mt-3 text-sm text-grey leading-relaxed">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-3 w-full rounded-lg border border-light-grey px-4 py-2.5 text-sm text-charcoal placeholder:text-grey/50 focus:border-manikstu-green focus:outline-none focus:ring-1 focus:ring-manikstu-green"
            />
            <button className="mt-3 w-full rounded-lg bg-manikstu-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Our Offices */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="rounded-xl border border-light-grey p-6">
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <MapPin className="mx-auto h-5 w-5 text-manikstu-green" />
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-manikstu-green">Registered Office</p>
              <p className="mt-1 text-xs text-grey leading-relaxed">Row House No - 94, Ravi Garden, Pune Solapur Road, Manjri Budruk, Hadapsar, Pune - 412307</p>
            </div>
            <div>
              <MapPin className="mx-auto h-5 w-5 text-manikstu-green" />
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-manikstu-green">Corporate Office</p>
              <p className="mt-1 text-xs text-grey leading-relaxed">Plot No-754, 14, Gangadhar Meher Marg, near Pabitra Guest House, Jayadev Vihar, Bhubaneswar, Odisha 751013</p>
            </div>
            <div>
              <MapPin className="mx-auto h-5 w-5 text-manikstu-green" />
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-manikstu-green">Farm Office</p>
              <p className="mt-1 text-xs text-grey leading-relaxed">At/Po: Salebhata, P.S: Kegaon, via: Borda, Kalahandi, Odisha - 766036</p>
            </div>
            <div>
              <MapPin className="mx-auto h-5 w-5 text-manikstu-green" />
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-manikstu-green">Regional Office</p>
              <p className="mt-1 text-xs text-grey leading-relaxed">CMTC Campus, Serikhedi, Chhattisgarh - 492012</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-light-grey">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-xs text-grey md:px-8">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Manikstu Agro"
              width={24}
              height={24}
              className="h-5 w-auto flex-shrink-0"
            />
            <span>&copy; {new Date().getFullYear()} Manikstu Agro Private Limited. All Rights Reserved.</span>
            <span className="border-l border-light-grey pl-4">GSTIN: 21AAJCM6881B1ZM</span>
            <span className="border-l border-light-grey pl-4">CIN: U74900PN2015PTC154344</span>
          </div>
          <Image src="/patterns/village-scene.png" alt="" width={300} height={120} className="hidden h-20 w-auto opacity-70 sm:block" />
        </div>
      </div>
    </footer>
  );
}
