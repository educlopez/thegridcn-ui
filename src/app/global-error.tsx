"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#060d18", color: "#e0e8f0" }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            fontFamily: "system-ui, sans-serif",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              marginBottom: "1.5rem",
              opacity: 0.5,
            }}
          >
            [ CRITICAL SYSTEM FAILURE ]
          </div>
          <h1
            style={{
              color: "#00d4ff",
              fontSize: "4rem",
              fontWeight: "bold",
              letterSpacing: "0.1em",
            }}
          >
            FATAL ERROR
          </h1>
          <p style={{ fontSize: "1.1rem", marginTop: "1rem", opacity: 0.8 }}>
            {error.message || "The Grid has encountered a critical error"}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              color: "#00d4ff",
              cursor: "pointer",
              fontSize: "12px",
              letterSpacing: "0.2em",
              marginTop: "2rem",
              padding: "0.5rem 1.5rem",
              textTransform: "uppercase",
            }}
          >
            Reboot System
          </button>
        </div>
      </body>
    </html>
  );
}
