interface PurposeIconProps {
  type: "mission" | "vision" | "aims"
}

export function PurposeIcon({ type }: PurposeIconProps) {
  return (
    <span className="purposeIcon" aria-hidden="true">
      {type === "mission" && (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="m13 11 7-7m-4 0h4v4" />
        </svg>
      )}
      {type === "vision" && (
        <svg viewBox="0 0 24 24">
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
      {type === "aims" && (
        <svg viewBox="0 0 24 24">
          <path d="M12 21V9m0 5c-5 0-7-3-7-7 5 0 7 3 7 7Zm0-4c0-4 2-7 7-7 0 4-2 7-7 7Z" />
        </svg>
      )}
    </span>
  )
}
