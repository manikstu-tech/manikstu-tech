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

/** Solid full-body goat silhouette (side profile, facing right). */
export function GoatSolidIcon(props: IconProps) {
  return (
    <svg {...svgBase} {...props}>
      <g fill="currentColor">
        {/* body */}
        <ellipse cx="9.5" cy="11" rx="6" ry="3.2" />
        {/* neck */}
        <path d="M12.5 8.4c.4-1.4 1.3-2.5 2.6-3.1l2.4.6-.6 4.6-3.8.3z" />
        {/* head */}
        <ellipse cx="17.9" cy="7.9" rx="2.3" ry="1.8" />
        {/* snout */}
        <path d="M19.6 7c1-.2 1.8.1 2.1 1 .3.8-.2 1.5-1 1.7l-2 .35-.3-2.8z" />
        {/* horn */}
        <path d="M16.6 6.1c-.5-1.7-1.6-2.9-3.2-3.3.6 1.1.8 2.3.4 3.5z" />
        {/* ear */}
        <path d="M19 6.1c.7-.8 1.6-1.1 2.6-1-.5.8-.6 1.6-.3 2.4z" />
        {/* beard */}
        <path d="M18.1 9.4c.2 1 .1 1.9-.3 2.8l1.2-.8.1-1.8z" />
        {/* tail */}
        <path d="M3.8 8.7c-.7-.5-1.1-1.3-1.2-2.2.9.2 1.6.7 2.1 1.4z" />
        {/* four legs */}
        <path d="M5.5 13.6h1.6V19H5.5zM8.4 13.9h1.6V19H8.4zM11.5 13.9h1.6V19h-1.6zM13.9 13.6h1.6V19h-1.6z" />
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
