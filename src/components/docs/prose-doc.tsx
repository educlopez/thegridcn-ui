import { cn } from "@/lib/utils"

export function ProseDoc({
  html,
  className,
}: {
  html: string
  className?: string
}) {
  return (
    <div
      className={cn("gridcn-prose", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
