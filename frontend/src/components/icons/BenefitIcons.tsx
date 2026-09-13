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

/** Solid full-body goat silhouette (side profile, facing left) matching the reference. */
export function GoatSolidIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" aria-hidden="true" {...props}>
      <g fill="currentColor">
        {/* horns curving up and back */}
        <path d="M20 22C21 14 24 9 29 5C28 11 27 17 25 22Z" />
        <path d="M23 23C25 16 29 12 34 9C31 15 29 19 27 23Z" />
        {/* ear */}
        <path d="M17 22C13 18 10 17 7 18C9 21 12 24 16 24Z" />
        {/* head */}
        <ellipse cx="15" cy="27" rx="8" ry="6.5" />
        {/* snout */}
        <path d="M7 28C4 28 2 30 3 33C4 35 7 35 9 34L12 32L11 28Z" />
        {/* beard */}
        <path d="M9 32C8 37 8.5 43 10 48C11 45 12.3 45 13.2 47C14 41 13.6 35 12.5 32Z" />
        {/* neck + body */}
        <path d="M18 26C23 27 27 30 31 33L49 33C55 33 59 38 59 44C59 51 53 56 46 56L26 56C20 56 16 51 16 45C16 38 15 30 18 26Z" />
        {/* tail (bushy, upturned) */}
        <path d="M56 36C61 32 66 34 67 39C63 39 62 42 62 46C59 43 57 39 56 37Z" />
        {/* legs with hooves */}
        <path d="M23 54h4.5v9c0 1-.6 1.5-1.5 1.5h-1.5c-.9 0-1.5-.5-1.5-1.5Z" />
        <path d="M30 54h4v9c0 1-.6 1.5-1.4 1.5h-1.2c-.9 0-1.4-.5-1.4-1.5Z" />
        <path d="M44 54h4.5v9c0 1-.6 1.5-1.5 1.5h-1.5c-.9 0-1.5-.5-1.5-1.5Z" />
        <path d="M51 54h4v9c0 1-.6 1.5-1.4 1.5h-1.2c-.9 0-1.4-.5-1.4-1.5Z" />
      </g>
      {/* eye */}
      <path d="M12 26c1.6-.9 3.4-.9 5 0" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
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
