"use client";

import {
  MachineReadout,
  type MachineRecord,
} from "@/components/thegridcn/machine-readout";

const events: MachineRecord[] = [
  {
    context: "Ledger / 14:32:08 UTC",
    fields: [
      { key: "invoice_id", value: "INV-00731" },
      { key: "amount_minor", value: 12_800 },
      { key: "currency", value: "EUR" },
      { key: "settled_at", value: "14:32:08Z" },
    ],
    id: "evt-731",
    summary: "Payment reconciled",
  },
  {
    context: "Dispatch / 14:32:10 UTC",
    fields: [
      { key: "message_id", value: "MSG-00482" },
      { key: "channel", value: "email" },
      { key: "attempt", value: 1 },
      { key: "latency_ms", value: 42 },
    ],
    id: "evt-732",
    summary: "Receipt delivered",
  },
  {
    context: "Storage / 14:32:14 UTC",
    fields: [
      { key: "snapshot_id", value: "SNP-00219" },
      { key: "records", value: 318 },
      { key: "region", value: "eu-west" },
      { key: "revision", value: 9 },
    ],
    id: "evt-733",
    summary: "Ledger snapshot sealed",
  },
];

export function MachineReadoutPreview({ forceDom }: { forceDom?: boolean }) {
  return (
    <MachineReadout
      records={events}
      label="Settlement log"
      sound="select"
      forceDom={forceDom}
    />
  );
}
