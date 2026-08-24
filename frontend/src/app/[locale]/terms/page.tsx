import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="section-padding bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <div className="mt-2 text-sm text-grey">Last updated: January 2024</div>
          <div className="mt-8 space-y-6 leading-relaxed text-grey">
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
      </main>
      <Footer />
    </>
  );
}
