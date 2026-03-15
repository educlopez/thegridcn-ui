"use client"

import dynamic from "next/dynamic"

const AnalyticsTemplate = dynamic(
  () =>
    import("@/components/thegridcn/templates/analytics-template").then(
      (mod) => mod.AnalyticsTemplate
    ),
  { ssr: false }
)

export default function AnalyticsEmbedPage() {
  return <AnalyticsTemplate />
}
