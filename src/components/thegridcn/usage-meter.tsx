import { useId } from "react";

export interface UsageMeterProps {
  formatValue?: (value: number) => string;
  label: string;
  limit: number;
  used: number;
  warningAt?: number;
}

export function UsageMeter({
  formatValue = String,
  label,
  limit,
  used,
  warningAt = 0.8,
}: UsageMeterProps) {
  const id = useId();
  const usable =
    Number.isFinite(limit) && limit > 0 && Number.isFinite(used) && used >= 0;
  const fraction = usable ? Math.min(1, used / limit) : 0;
  const atLimit = usable && used >= limit;
  const threshold = Number.isFinite(warningAt)
    ? Math.min(1, Math.max(0, warningAt))
    : 0.8;
  const warning = fraction >= threshold;
  return (
    <div className="min-w-0 rounded-lg border border-primary/25 bg-background p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-medium text-sm" id={id}>
          {label}
        </p>
        {usable ? (
          <p className="font-mono text-muted-foreground text-xs tabular-nums">
            {formatValue(used)} / {formatValue(limit)}
          </p>
        ) : null}
      </div>
      {usable ? (
        <>
          <meter
            aria-labelledby={id}
            className="sr-only"
            max={limit}
            min={0}
            value={Math.min(used, limit)}
          />
          <div
            aria-hidden="true"
            className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10"
          >
            <div
              className={`h-full rounded-full ${warning ? "bg-amber-400" : "bg-primary"}`}
              style={{ width: `${fraction * 100}%` }}
            />
          </div>
          <p className="mt-2 text-muted-foreground text-xs">
            {used > limit
              ? `${formatValue(used - limit)} over limit`
              : atLimit
                ? "Limit reached"
                : `${warning ? "Near limit · " : ""}${formatValue(limit - used)} remaining`}
          </p>
        </>
      ) : (
        <p className="mt-2 text-muted-foreground text-xs">Usage unavailable</p>
      )}
    </div>
  );
}
