"use client";

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js requires the error boundary component to be the default export named Error
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 font-mono text-[10px] text-foreground/50 tracking-widest">
        [ SYSTEM MALFUNCTION ]
      </div>
      <h1 className="font-bold font-display text-6xl text-primary tracking-wider [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)] md:text-8xl">
        ERROR
      </h1>
      <p className="mt-4 font-display text-foreground/80 text-lg tracking-wider">
        {error.message || "An unexpected error occurred on The Grid"}
      </p>
      <div className="mt-8">
        <button
          type="button"
          onClick={reset}
          className="border border-primary/30 bg-primary/10 px-6 py-2 font-mono text-primary text-xs uppercase tracking-widest transition-colors hover:bg-primary/20"
        >
          Retry Program
        </button>
      </div>
    </div>
  );
}
