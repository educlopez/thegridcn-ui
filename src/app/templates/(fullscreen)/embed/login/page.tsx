"use client"

import dynamic from "next/dynamic"

const LoginTemplate = dynamic(
  () =>
    import("@/components/thegridcn/templates/login-template").then(
      (mod) => mod.LoginTemplate
    ),
  { ssr: false }
)

export default function LoginEmbedPage() {
  return <LoginTemplate />
}
