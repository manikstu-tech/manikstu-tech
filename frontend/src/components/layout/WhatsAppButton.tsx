"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating WhatsApp widget — a green launcher button that opens a small
 * WhatsApp-style chat panel. Typing a response and pressing send opens the
 * real WhatsApp chat (wa.me) with that message pre-filled.
 */
const PHONE = "918270331856"; // +91 82703 31856 (digits only, with country code)
const DEFAULT_MSG =
  "Hello Manikstu Agro, I'd like to know more about your goat farming products and services.";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [time, setTime] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Client-only timestamp (avoids SSR hydration mismatch) + focus the input.
  useEffect(() => {
    if (open) {
      if (!time) {
        setTime(
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      }
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open, time]);

  // Escape closes the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = msg.trim() || DEFAULT_MSG;
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setMsg("");
    setOpen(false);
  };

  return (
    <>
      {/* Click-away layer (transparent — does not dim the page) */}
      {open && (
        <div
          className="fixed inset-0 z-[94]"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp chat"
          className="fixed bottom-24 right-4 z-[95] flex w-[90vw] max-w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 sm:right-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-[#3AAE60] px-4 py-3.5 text-white">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Manikstu Agro" className="h-8 w-8 object-contain" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-base font-bold leading-tight">Manikstu Agro</p>
              <p className="text-xs text-white/85">Typically replies within an hour</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="min-h-[190px] bg-[#E6DDD4] px-4 py-4">
            <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm">
              <p className="text-xs font-semibold text-[#3AAE60]">Manikstu Agro</p>
              <p className="mt-1 text-sm text-gray-800">Hi there 👋</p>
              <p className="text-sm text-gray-800">How can I help you?</p>
              <p className="mt-1 text-right text-[10px] text-gray-400">{time}</p>
            </div>
          </div>

          {/* Input */}
          <form onSubmit={send} className="flex items-center gap-2 bg-white px-3 py-3">
            <input
              ref={inputRef}
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Write a response"
              className="flex-1 rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#3AAE60]/40"
            />
            <button
              type="submit"
              aria-label="Send message on WhatsApp"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#3AAE60] transition-colors hover:bg-[#3AAE60]/10"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[96] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 ring-1 ring-black/5 hover:bg-[#1EBE5D] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:bottom-6 sm:right-6"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden>
            <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.712 6.402L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.62h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.71 12.71 0 0 0 16.003 3.2Zm0 23.44h-.004a10.6 10.6 0 0 1-5.404-1.48l-.388-.23-4.02 1.053 1.073-3.92-.253-.402a10.6 10.6 0 0 1-1.625-5.66c0-5.867 4.774-10.64 10.646-10.64a10.57 10.57 0 0 1 7.52 3.12 10.57 10.57 0 0 1 3.116 7.526c0 5.867-4.774 10.64-10.64 10.64Zm5.836-7.968c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.588-.95-.848-1.593-1.895-1.78-2.215-.187-.32-.02-.492.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.735-.986-2.375-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.256 3.443 5.466 4.827.764.33 1.36.527 1.825.674.766.244 1.464.21 2.016.127.615-.092 1.893-.774 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
          </svg>
        )}
      </button>
    </>
  );
}
