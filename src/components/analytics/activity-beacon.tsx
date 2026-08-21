"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reports each route change to the app's own `/api/activity-beacon` route,
 * which forwards a signed visit event server-side. Fire-and-forget: never
 * blocks rendering and never surfaces an error to the page.
 */
export function ActivityBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/activity-beacon", {
      body: JSON.stringify({ path: pathname, title: document.title }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }).catch(() => {
      // Best-effort telemetry; failures must never affect the page.
    });
  }, [pathname]);

  return null;
}
