import type { ImpactIconType } from "@/types"

interface ImpactIconProps {
  type: ImpactIconType
}

export function ImpactIcon({ type }: ImpactIconProps) {
  return (
    <span className="impactIcon" aria-hidden="true">
      {type === "goats" ? (
        <img src="/manikstu/icons/goat.png" alt="" width="320" height="314" />
      ) : (
        <svg viewBox="0 0 24 24">
          {type === "farmers" && (
            <>
              <circle cx="12" cy="8" r="3" />
              <path d="M6.5 20a5.5 5.5 0 0 1 11 0" />
              <circle cx="5" cy="10.5" r="2" />
              <circle cx="19" cy="10.5" r="2" />
              <path d="M2 19a3.5 3.5 0 0 1 4.5-3.3m15.5 3.3a3.5 3.5 0 0 0-4.5-3.3" />
            </>
          )}
          {type === "villages" && (
            <path d="M2 21h20M4 21V11l5-4 5 4v10m0-6.5 3.5-2.5 3.5 2.5V21M8 21v-4h2v4" />
          )}
          {type === "states" && (
            <path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20ZM9 4v13.5m6-11V20" />
          )}
          {type === "sprout" && (
            <path d="M12 21v-8m0 0c-4 0-6-2.5-6-6 4 0 6 2.5 6 6Zm0-3c0-3.5 2-6 6-6 0 3.5-2 6-6 6Z" />
          )}
          {type === "health" && (
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10ZM12 9.5v4m-2-2h4" />
          )}
          {type === "shield" && (
            <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6ZM9 11.5l2 2 4-4" />
          )}
          {type === "training" && (
            <path d="M4 5.5c2-1 5-1 8 1 3-2 6-2 8-1V19c-2-1-5-1-8 1-3-2-6-2-8-1ZM12 6.5V20" />
          )}
          {type === "market" && (
            <path d="m3 9 1.5-5h15L21 9M3 9h18M3 9v11h18V9M9 20v-6h6v6" />
          )}
          {type === "mail" && <path d="M3 6h18v12H3ZM3 7l9 6.5L21 7" />}
          {type === "phone" && (
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
          )}
          {type === "pin" && (
            <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          )}
          {type === "facebook" && (
            <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6v4h3v8h4v-8h3l1-4h-4V6.5c0-.3.2-.5.5-.5H15Z" />
          )}
          {type === "instagram" && (
            <>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <path d="M17.5 6.5h.01" />
            </>
          )}
          {type === "linkedin" && (
            <path d="M4 9h3v11H4ZM5.5 4.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM10 9h3v1.6c.6-1 1.8-1.8 3.4-1.8C19 8.8 20 10.5 20 13v7h-3v-6c0-1.4-.6-2.300-1.900-2.300S13 12.600 13 14v6h-3Z" />
          )}
          {type === "youtube" && (
            <>
              <rect x="2.5" y="3.5" width="19" height="17" rx="5" />
              <path d="m9.5 8.5 6.5 3.5-6.5 3.5Z" />
            </>
          )}
          {type === "truck" && (
            <path d="M2.5 6h11v10h-11ZM13.5 9.5h4l3 3.5v3h-7ZM7 19a1.8 1.8 0 1 0 0-.01M17 19a1.8 1.8 0 1 0 0-.01" />
          )}
          {type === "headset" && (
            <path d="M4 14v-2a8 8 0 0 1 16 0v2M3.5 14h3.5v5H3.5ZM17 14h3.5v5H17ZM20.5 19c0 1.6-2.200 2.500-5.500 2.500" />
          )}
          {type === "calendar" && (
            <path d="M4 6h16v14H4ZM4 10.5h16M8 3.5v4M16 3.5v4M8.5 14h.01M12 14h.01M15.5 14h.01M8.5 17h.01M12 17h.01" />
          )}
          {type === "herd" && (
            <path d="M4 21V10l8-6 8 6v11ZM9 21v-6h6v6m-6-6 6 6m0-6-6 6" />
          )}
          {type === "meat" && (
            <path d="M7 3v7a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3M9 3v18M17 3c-2 1-3 4-3 7v2h3m0-9v18" />
          )}
          {type === "rupee" && <path d="M7 4h10M7 8h10M9 4c3.5 0 5 1.8 5 4s-1.5 4-5 4H7l8 8" />}
          {type === "coins" && (
            <path d="M5 7c0-1.1 3.1-2 7-2s7 .9 7 2-3.1 2-7 2-7-.9-7-2Zm0 0v4c0 1.1 3.1 2 7 2s7-.9 7-2V7m-14 4v4c0 1.1 3.1 2 7 2s7-.9 7-2v-4m-14 4v3c0 1.1 3.1 2 7 2s7-.9 7-2v-3" />
          )}
          {type === "chart" && <path d="M3 20h18M6 20v-5h3v5m2 0v-9h3v9m2 0V5h3v15" />}
          {type === "handshake" && (
            <path d="M2 11.5 6 8l3.5 1.5L12 8l3 .5 3.5-1L22 11M2 11.5l6 6c.9.9 2.2.9 3 0l7.5-7.5M12 8l-3.5 3.5a1.4 1.4 0 0 0 2 2L13 11m3.5 3.5L14 12" />
          )}
          {type === "clipboard" && <path d="M9 3.5h6v3H9ZM7 5H4.5v16h15V5H17M8 11h8M8 15h8M8 19h5" />}
          {type === "check" && <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8 12.5l2.8 2.8L16 9.5" />}
          {type === "medkit" && <path d="M3.5 8h17v12h-17ZM9 8V5h6v3m-3 4v5m-2.5-2.5h5" />}
          {type === "balance" && (
            <path d="M12 4v16m-4 0h8M5 7h14M5 7l-3 7a3 3 0 0 0 6 0Zm14 0-3 7a3 3 0 0 0 6 0Z" />
          )}
        </svg>
      )}
    </span>
  )
}
