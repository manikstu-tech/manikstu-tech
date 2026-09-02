"use client";

import { useEffect, useState } from "react";

/**
 * Floating WhatsApp chat button — fixed at the bottom-right on every page.
 * Opens a WhatsApp chat with the Manikstu number and a pre-filled message.
 */
const PHONE = "918270331856"; // +91 82703 31856 (digits only, with country code)
const PREFILL =
  "Hello Manikstu Agro, I'd like to know more about your goat farming products and services.";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  // Gentle entrance once the page has settled.
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(t);
  }, []);

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 ring-1 ring-black/5 transition-all duration-300 hover:scale-110 hover:bg-[#1EBE5D] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:bottom-6 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {/* Pulsing ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping"
      />
      {/* WhatsApp glyph */}
      <svg
        viewBox="0 0 32 32"
        className="relative h-7 w-7"
        fill="currentColor"
        aria-hidden
      >
        <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.712 6.402L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.62h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.71 12.71 0 0 0 16.003 3.2Zm0 23.44h-.004a10.6 10.6 0 0 1-5.404-1.48l-.388-.23-4.02 1.053 1.073-3.92-.253-.402a10.6 10.6 0 0 1-1.625-5.66c0-5.867 4.774-10.64 10.646-10.64a10.57 10.57 0 0 1 7.52 3.12 10.57 10.57 0 0 1 3.116 7.526c0 5.867-4.774 10.64-10.64 10.64Zm5.836-7.968c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.588-.95-.848-1.593-1.895-1.78-2.215-.187-.32-.02-.492.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.735-.986-2.375-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.256 3.443 5.466 4.827.764.33 1.36.527 1.825.674.766.244 1.464.21 2.016.127.615-.092 1.893-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
      </svg>
    </a>
  );
}
