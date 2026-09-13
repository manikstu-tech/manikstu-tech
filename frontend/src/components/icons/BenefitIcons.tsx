import type { SVGProps } from "react";

/**
 * Solid (filled) green benefit icons for the Project AJAH strip, matching the
 * flat-silhouette reference. 24×24, use currentColor so they inherit the green
 * text colour; small details are punched out in white (the strip sits on a
 * white background).
 */
type IconProps = SVGProps<SVGSVGElement>;

const svgBase = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

/** Solid full-body goat silhouette (side profile, facing left). */
export function GoatSolidIcon(props: IconProps) {
  return (
    <svg {...svgBase} {...props}>
      <g fill="currentColor">
        {/* horn curving back */}
        <path d="M8.1 6.2C7.4 4.4 6 3.3 4.1 3.1c.9 1 1.3 2.1 1.2 3.4-.6-.5-1.3-.8-2.1-.8.6.9 1.5 1.5 2.6 1.7z" />
        {/* head + snout (facing left) */}
        <path d="M8 6.4C6.9 6.2 5.9 6.6 5.2 7.4c-.5.6-.8 1.3-.8 2.1l.1.9 1.5.6 2.6-.3z" />
        {/* ear */}
        <path d="M8.8 6.6c-.9-.2-1.8 0-2.5.6.7.4 1.5.5 2.3.3z" />
        {/* beard */}
        <path d="M4.6 10.4c-.1.9 0 1.7.4 2.5l.9-.9-.1-1.9z" />
        {/* body */}
        <path d="M7 9.2c1.6-.6 3.4-.6 5 0l4.2.3c1.6.1 2.9 1 3.6 2.4.3.6-.1 1.3-.8 1.3h-1.2c-.9 0-1.7.4-2.2 1.1l-.5.7H8.2l-.6-.8c-.5-.7-1.3-1.1-2.2-1.1H4.4c-.5 0-.9-.4-.9-.9 0-1.4 1.4-2.6 3.5-3z" />
        {/* tail */}
        <path d="M18.8 11.3c.9-.2 1.7 0 2.4.6-.7.5-1 1.2-1 2z" />
        {/* four legs */}
        <path d="M6 14.8h1.6V19H6zM9 15h1.6v4H9zM13.5 15h1.6v4h-1.6zM16.4 14.8H18V19h-1.6z" />
      </g>
    </svg>
  );
}

/** Solid group of people. */
export function PeopleSolidIcon(props: IconProps) {
  return (
    <svg {...svgBase} {...props}>
      <g fill="currentColor">
        <circle cx="5.5" cy="8.5" r="2" />
        <path d="M5.5 11.2c-1.9 0-3.5 1.4-3.5 3.3V16h3v-1.5c0-1.3.5-2.5 1.3-3.3h-.8Z" />
        <circle cx="18.5" cy="8.5" r="2" />
        <path d="M18.5 11.2c1.9 0 3.5 1.4 3.5 3.3V16h-3v-1.5c0-1.3-.5-2.5-1.3-3.3h.8Z" />
        <circle cx="12" cy="7.2" r="2.7" />
        <path d="M12 10.4c-3 0-5.2 2-5.2 4.5V17h10.4v-2.1c0-2.5-2.2-4.5-5.2-4.5Z" />
      </g>
    </svg>
  );
}

/** Solid heart with a white pulse line. */
export function HeartPulseSolidIcon(props: IconProps) {
  return (
    <svg {...svgBase} {...props}>
      <path
        fill="currentColor"
        d="M12 20.6 4 12.6a5 5 0 0 1 7-7.2l1 1 1-1a5 5 0 0 1 7 7.2Z"
      />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12.4h2.6l1.3-2.2 2 4.6 2-5.4 1.2 3H19"
      />
    </svg>
  );
}

/** Solid graduation cap. */
export function GraduationCapSolidIcon(props: IconProps) {
  return (
    <svg {...svgBase} {...props}>
      <g fill="currentColor">
        <path d="M12 3 1 8l11 5 11-5Z" />
        <path d="M6 11.3v3.2C6 16 8.7 17 12 17s6-1 6-2.5v-3.2l-6 2.7Z" />
        <circle cx="22" cy="13" r="1" />
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" d="M22 8.6v4" />
    </svg>
  );
}

/** Solid shield with a white check. */
export function ShieldCheckSolidIcon(props: IconProps) {
  return (
    <svg {...svgBase} {...props}>
      <path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5Z" />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.4 12.1l2.3 2.3 4.9-5"
      />
    </svg>
  );
}

/** Solid storefront with awning. */
export function StoreSolidIcon(props: IconProps) {
  return (
    <svg {...svgBase} {...props}>
      <g fill="currentColor">
        <path d="M3 4.5h18l1.2 3.5H1.8Z" />
        <path d="M4 8h16v11.5h-4.5V14.5h-7v5H4Z" />
      </g>
    </svg>
  );
}
