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

/** Solid goat head (reuses the outline GoatIcon geometry, filled). */
export function GoatSolidIcon(props: IconProps) {
  return (
    <svg {...svgBase} {...props}>
      <path
        fill="currentColor"
        d="M7 8.5C7 12 9 14 12 14s5-2 5-5.5c0-1-.4-1.8-1-2.4C14.9 7 13.6 7.5 12 7.5S9.1 7 8 6.1c-.6.6-1 1.4-1 2.4Z"
      />
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 7C7 4.5 5.5 3.5 4 3.5c1 1.5 1.2 3 1 4.2" />
        <path d="M16 7c1-2.5 2.5-3.5 4-3.5-1 1.5-1.2 3-1 4.2" />
        <path d="M7.4 8.6C6 8.4 4.8 8.9 4 9.8c1 .4 1.9.5 2.8.3" />
        <path d="M16.6 8.6c1.4-.2 2.6.3 3.4 1.2-1 .4-1.9.5-2.8.3" />
        <path d="M12 14v3.6" />
      </g>
      <circle cx="9.7" cy="10.1" r="0.9" fill="#fff" />
      <circle cx="14.3" cy="10.1" r="0.9" fill="#fff" />
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
