import type { SVGProps } from "react";

/**
 * Line-art goat head icon in the lucide style (24×24, currentColor stroke).
 * Drop-in replacement wherever a lucide icon is used — accepts the same
 * className / stroke props.
 */
export default function GoatIcon({
  strokeWidth = 2,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Horns curving back over the head */}
      <path d="M8 7C7 4.5 5.5 3.5 4 3.5c1 1.5 1.2 3 1 4.2" />
      <path d="M16 7c1-2.5 2.5-3.5 4-3.5-1 1.5-1.2 3-1 4.2" />
      {/* Ears */}
      <path d="M7.4 8.6C6 8.4 4.8 8.9 4 9.8c1 .4 1.9.5 2.8.3" />
      <path d="M16.6 8.6c1.4-.2 2.6.3 3.4 1.2-1 .4-1.9.5-2.8.3" />
      {/* Head / face */}
      <path d="M7 8.5C7 12 9 14 12 14s5-2 5-5.5c0-1-.4-1.8-1-2.4C14.9 7 13.6 7.5 12 7.5S9.1 7 8 6.1c-.6.6-1 1.4-1 2.4Z" />
      {/* Snout + beard */}
      <path d="M10 13.5c.6.6 1.3.9 2 .9s1.4-.3 2-.9" />
      <path d="M12 14v3.5" />
      {/* Eyes */}
      <path d="M9.5 10h.01" />
      <path d="M14.5 10h.01" />
    </svg>
  );
}
