"use client"

import dynamic from "next/dynamic"

const BlogTemplate = dynamic(
  () =>
    import("@/components/thegridcn/templates/blog-template").then(
      (mod) => mod.BlogTemplate
    ),
  { ssr: false }
)

export default function BlogEmbedPage() {
  return <BlogTemplate />
}
