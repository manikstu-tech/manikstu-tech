import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero — matches Help Center design */}
        <section className="relative overflow-hidden bg-manikstu-cream pt-24 pb-16">
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-8">
            <div className="flex items-center justify-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
                Legal
              </p>
              <span aria-hidden className="h-px w-8 bg-manikstu-gold/70" />
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            </div>

            <h1 className="mx-auto mt-3 font-heading text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
              Privacy{" "}
              <span className="text-manikstu-green">Policy</span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-grey sm:text-base">
              How we collect, use and protect your personal information when
              you interact with Manikstu Agro.
            </p>
          </div>

          {/* Bottom tribal border — decorative line art, faded in from the left */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 bottom-0 h-6 sm:h-7 bg-repeat-x -scale-y-100 opacity-70"
            style={{
              backgroundImage: "url('/patterns/tribal-border.png')",
              backgroundSize: "auto 100%",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 75%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 75%, black 100%)",
            }}
          />
        </section>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-3xl">
            <div className="text-sm text-grey">Last updated: January 2024</div>
            <div className="mt-6 space-y-6 leading-relaxed text-grey">
            <p>
              Manikstu Agro Private Limited (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the manikstu.com website. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our service.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, city, state, and any other information you choose to provide.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, provide requested services, send periodic emails regarding our programs and initiatives, and improve our website and services.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our service, provide service on our behalf, or perform service-related activities. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at contact@manikstu.com.
            </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
