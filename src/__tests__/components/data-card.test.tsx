import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DataCard } from "@/components/thegridcn/data-card"

const fields = [
  { label: "User", value: "tron.exe" },
  { label: "Status", value: "Active", highlight: true },
]

describe("DataCard", () => {
  it("renders title and subtitle", () => {
    render(<DataCard title="GRID" subtitle="System Status" fields={fields} />)
    expect(screen.getByText("GRID")).toBeInTheDocument()
    expect(screen.getByText("System Status")).toBeInTheDocument()
  })

  it("renders all field values", () => {
    render(<DataCard fields={fields} />)
    expect(screen.getByText("tron.exe")).toBeInTheDocument()
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("renders field labels", () => {
    render(<DataCard fields={fields} />)
    expect(screen.getByText("User")).toBeInTheDocument()
    expect(screen.getByText("Status")).toBeInTheDocument()
  })

  it("defaults to active status", () => {
    const { container } = render(<DataCard fields={fields} />)
    expect(container.firstChild).toHaveAttribute("data-status", "active")
  })

  it("applies provided status attribute", () => {
    const { container } = render(<DataCard fields={fields} status="alert" />)
    expect(container.firstChild).toHaveAttribute("data-status", "alert")
  })

  it("renders without title or subtitle", () => {
    expect(() => render(<DataCard fields={fields} />)).not.toThrow()
  })
})
