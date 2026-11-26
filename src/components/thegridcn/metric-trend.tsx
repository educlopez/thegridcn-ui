import { useId } from "react";

export interface MetricTrendProps {
  caption: string;
  label: string;
  samples: readonly number[];
  value: string;
}

/** A compact KPI and an inline sparkline from real data samples. */
export function MetricTrend({
  caption,
  label,
  samples,
  value,
}: MetricTrendProps) {
  const id = useId();
  const valid = samples.filter(Number.isFinite);
  const low = valid.reduce(
    (min, value) => Math.min(min, value),
    Number.POSITIVE_INFINITY
  );
  const high = valid.reduce(
    (max, value) => Math.max(max, value),
    Number.NEGATIVE_INFINITY
  );
  const points = valid.map((sample, i) => [
    3 + (i * 234) / Math.max(1, valid.length - 1),
    high === low ? 30 : 52 - ((sample - low) / (high - low)) * 44,
  ]);
  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <figure className="min-w-0 overflow-hidden rounded-lg border border-primary/25 bg-background p-4">
      <figcaption className="relative z-10">
        <span className="block text-muted-foreground text-sm">{label}</span>
        <strong className="mt-1 block font-mono text-2xl text-foreground tabular-nums sm:text-3xl">
          {value}
        </strong>
        <span className="mt-1 block text-muted-foreground text-xs">
          {caption}
        </span>
      </figcaption>
      {points.length > 1 ? (
        <svg
          aria-hidden="true"
          className="mt-2 block h-14 w-full text-primary"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 240 60"
        >
          <defs>
            <linearGradient id={id} x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity=".23" />
              <stop offset="1" stopColor="currentColor" stopOpacity=".01" />
            </linearGradient>
          </defs>
          <path
            d="M0 56H240"
            stroke="currentColor"
            strokeDasharray="2 5"
            strokeOpacity=".35"
          />
          <polygon fill={`url(#${id})`} points={`${line} 237,56 3,56`} />
          <polyline
            points={line}
            stroke="currentColor"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : (
        <p className="mt-4 border-border border-t pt-2 text-muted-foreground text-xs">
          Not enough samples for a trend.
        </p>
      )}
    </figure>
  );
}
