import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex min-h-[60vh] items-center justify-center bg-manikstu-cream px-4">
        <div className="text-center">
          <p className="font-heading text-7xl font-bold text-manikstu-green sm:text-8xl">
            404
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-manikstu-gold/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
            <span className="h-px w-10 bg-manikstu-gold/60" />
          </div>
          <h1 className="mt-6 font-heading text-2xl font-bold text-charcoal sm:text-3xl">
            Page Not Found
          </h1>
          <p className="mt-4 max-w-md text-grey">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white hover:bg-manikstu-leaf transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
