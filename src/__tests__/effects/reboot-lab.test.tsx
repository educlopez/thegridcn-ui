import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  RebootLab,
  RebootTerminal,
  StackInspector,
} from "@/components/website/reboot-lab";
import { getShadcnInstallItems } from "@/lib/registry-name";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Reboot Lab", () => {
  it("updates and restores telemetry without a canvas in reduced motion", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    render(<RebootLab />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Verify relay" }));
      await Promise.resolve();
    });
    expect(screen.getByText("18 ms")).toBeVisible();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Restore baseline" }));
      await Promise.resolve();
    });
    expect(screen.getByText("42 ms")).toBeVisible();
    expect(document.querySelector("canvas")).toBeNull();
  });

  it("inspects the wrapped stack and keeps the terminal link available", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    render(
      <>
        <StackInspector>React</StackInspector>
        <RebootTerminal>
          <a href="/components">Explore components</a>
        </RebootTerminal>
      </>
    );
    fireEvent.click(screen.getByRole("button", { name: "Inspect data" }));
    expect(
      screen.getByText("Inspection is on. The data is enlarged in place.")
    ).toBeVisible();
    expect(screen.getByText("React")).toBeVisible();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Reboot terminal" }));
      await Promise.resolve();
    });
    expect(screen.getByRole("status")).toHaveTextContent("Terminal ready.");
    expect(
      screen.getByRole("link", { name: "Explore components" })
    ).toHaveAttribute("href", "/components");
    expect(document.querySelector("canvas")).toBeNull();
  });

  it("installs the parent registry items for mode-specific catalog entries", () => {
    expect(getShadcnInstallItems("pulse-reveal")).toEqual([
      "@thegridcn/scan-reveal",
    ]);
    expect(getShadcnInstallItems("pixel-resolve")).toEqual([
      "@thegridcn/scan-reveal",
    ]);
    expect(getShadcnInstallItems("contrast-lens")).toEqual([
      "@thegridcn/focus-lens",
    ]);
  });
});
