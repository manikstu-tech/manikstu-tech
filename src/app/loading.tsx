export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--paper, #faf9f4)",
        color: "var(--forest, #143f2d)",
        fontFamily: 'Manrope, "DM Sans", sans-serif',
        gap: "16px",
      }}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          border: "4px solid rgba(20, 63, 45, 0.15)",
          borderTopColor: "var(--green, #2f7144)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p
        style={{
          fontSize: "14px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Loading Manikstu Agri Solutions...
      </p>
    </div>
  )
}
