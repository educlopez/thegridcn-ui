"use client"

import dynamic from "next/dynamic"

const DashboardTemplate = dynamic(
  () =>
    import("@/components/thegridcn/templates/dashboard-template").then(
      (mod) => mod.DashboardTemplate
    ),
  { ssr: false }
)

export default function DashboardEmbedPage() {
  return <DashboardTemplate />
}
