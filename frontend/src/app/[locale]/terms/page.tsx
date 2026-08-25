import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
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
              Terms &amp;{" "}
              <span className="text-manikstu-green">Conditions</span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-grey sm:text-base">
              The rules that govern your use of our website and services.
              Please read them carefully.
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
              Welcome to Manikstu Agro. These terms and conditions outline the rules and regulations for the use of our website and services.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Acceptance of Terms</h2>
            <p>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website if you do not accept all of the terms and conditions stated on this page.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Intellectual Property</h2>
            <p>
              Unless otherwise stated, Manikstu Agro and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Limitation of Liability</h2>
            <p>
              In no event shall Manikstu Agro be liable for any damages arising out of the use or inability to use the materials on this website, even if we have been notified of the possibility of such damages.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Accuracy of Information</h2>
            <p>
              The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Links to Other Websites</h2>
            <p>
              Our website may contain links to third-party websites. We have no control over the content and privacy practices of such sites and encourage you to review their terms and privacy policies.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Bhubaneswar, Odisha.
            </p>
            <h2 className="font-heading text-xl font-bold text-charcoal">Contact Us</h2>
            <p>
              If you have any questions about these Terms &amp; Conditions, please contact us at contact@manikstu.com.
            </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
