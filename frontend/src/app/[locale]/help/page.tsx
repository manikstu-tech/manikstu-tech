import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "How can I partner with Manikstu?",
    a: "Visit our Collaborate page to learn about partnership opportunities. You can also reach out via the contact form.",
  },
  {
    q: "Do you offer training programs for individual farmers?",
    a: "Yes. Our Training & Awareness page lists available programs. Contact us to schedule a session in your area.",
  },
  {
    q: "How can I apply for a job at Manikstu?",
    a: "Check our Careers page for current openings. You can apply directly or send your resume to contact@manikstu.com.",
  },
  {
    q: "Where is Manikstu headquartered?",
    a: "Our registered office is in Bhubaneswar, Odisha. We also have regional offices across rural Odisha.",
  },
];

export default function HelpPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-manikstu-cream pt-24 pb-12">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              Help Center
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl">
              How Can We <span className="text-manikstu-green">Help</span>?
            </h1>
            <p className="mt-4 text-grey">
              Find answers to common questions or reach out to our team.
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-xl font-bold text-charcoal">Frequently Asked Questions</h2>
            <div className="mt-6 divide-y divide-light-grey">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <h3 className="font-heading text-base font-bold text-charcoal">{faq.q}</h3>
                  <p className="mt-2 text-sm text-grey leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-manikstu-cream">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-xl font-bold text-charcoal">Still Need Help?</h2>
            <p className="mt-3 text-grey">Our team is here to assist you.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> Contact Us
              </Link>
              <a
                href="mailto:contact@manikstu.com"
                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" /> Email Us
              </a>
              <a
                href="tel:+918270331856"
                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" /> Call Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
