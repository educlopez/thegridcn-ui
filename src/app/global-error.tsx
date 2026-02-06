"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ background: "#060d18", color: "#e0e8f0" }}>
        <div style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "1rem",
          fontFamily: "system-ui, sans-serif",
        }}>
          <div style={{ marginBottom: "1.5rem", fontSize: "10px", letterSpacing: "0.2em", opacity: 0.5 }}>
            [ CRITICAL SYSTEM FAILURE ]
          </div>
          <h1 style={{ fontSize: "4rem", fontWeight: "bold", letterSpacing: "0.1em", color: "#00d4ff" }}>
            FATAL ERROR
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "1.1rem", opacity: 0.8 }}>
            {error.message || "The Grid has encountered a critical error"}
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "2rem",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              background: "rgba(0, 212, 255, 0.1)",
              padding: "0.5rem 1.5rem",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#00d4ff",
              cursor: "pointer",
            }}
          >
            Reboot System
          </button>
        </div>
      </body>
    </html>
  )
}
