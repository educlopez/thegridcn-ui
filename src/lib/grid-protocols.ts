// Showcase presets for the installable ScanReveal primitive.
export const gridProtocols = [
  {
    action: "Plot bypass",
    cue: "ignition",
    description:
      "Parallel light walls take right-angle turns to write a new route across the grid.",
    group: "Reveal",
    id: "lightcycle-trail",
    label: "Navigation uplink",
    states: ["MAIN CIRCUIT", "BYPASS LINK"],
    title: "Lightcycle Trail",
    undo: "Plot main route",
    values: ["Sector 04 / 82 ms", "Sector 09 / 18 ms"],
    variant: "lightcycle",
  },
  {
    action: "Authenticate disc",
    cue: "disc-lock",
    description:
      "A rotating disc reads the panel clockwise and seals the new identity.",
    group: "Reveal",
    id: "identity-disc-read",
    label: "Identity terminal",
    states: ["GUEST ACCESS", "USER VERIFIED"],
    title: "Identity Disc Read",
    undo: "Release disc",
    values: ["Clearance 00", "Clearance 07"],
    variant: "disc",
  },
  {
    action: "Materialize program",
    cue: "materialize",
    description:
      "Staggered columns pull a program into focus one strip at a time.",
    group: "Transform",
    id: "rez-stream",
    label: "Program loader",
    states: ["ARCHIVED", "RESIDENT"],
    title: "Rez Stream",
    undo: "Derezz program",
    values: ["Memory offline", "Memory 128 KB"],
    variant: "rez",
  },
  {
    action: "Enter sector",
    cue: "gate-shift",
    description:
      "Armored shutters retract from a notched seam to reveal the destination sector.",
    group: "Transform",
    id: "sector-gate",
    label: "Transit terminal",
    states: ["CENTRAL HUB", "OUTER SECTOR"],
    title: "Sector Gate",
    undo: "Return to hub",
    values: ["Gate 01 / standby", "Gate 08 / linked"],
    variant: "gate",
  },
] as const;
export type GridProtocol = (typeof gridProtocols)[number];
