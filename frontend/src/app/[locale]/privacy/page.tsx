import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="section-padding bg-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Privacy Policy
          </h1>
          <div className="mt-2 text-sm text-grey">Last updated: January 2024</div>
          <div className="mt-8 space-y-6 leading-relaxed text-grey">
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
      </main>
      <Footer />
    </>
  );
}
