// A closing quote mark (round head, tail hanging down) in a gold outline, set in a notch cut from a card's top-right corner
const Mark = () => (
  <>
    <circle cx="6.5" cy="6.5" r="6.5" />
    <path d="M13 6.5C13 13.5 9.5 18.8 1 19.5 5.5 18 7.5 15.5 8 12Z" />
  </>
)

export function QuoteBadge() {
  return (
    <span className="quoteNotch" aria-hidden="true">
      <span className="quoteMark">
        <svg viewBox="0 0 30 21">
          <Mark />
          <g transform="translate(16 0)">
            <Mark />
          </g>
        </svg>
      </span>
    </span>
  )
}
