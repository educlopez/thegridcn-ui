import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EffectsWorkbench } from "@/app/effects/workbench";
import { BeforeAfter } from "@/components/thegridcn/before-after";
import { MetricTrend } from "@/components/thegridcn/metric-trend";
import { SoundAction } from "@/components/thegridcn/sound-action";
import { UsageMeter } from "@/components/thegridcn/usage-meter";
import { ThemeProvider } from "@/components/theme";
import { gridProtocols } from "@/lib/grid-protocols";
import { GRID_SOUNDS } from "@/lib/grid-sounds";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Effects Workbench", () => {
  it("decodes real fields and exposes gallery destinations with the DOM renderer", () => {
    vi.stubGlobal("localStorage", { getItem: () => null, setItem: vi.fn() });
    render(
      <ThemeProvider>
        <EffectsWorkbench />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "DOM only" }));
    fireEvent.click(screen.getByRole("button", { name: "Machine Readout" }));
    const record = screen.getByRole("button", { name: /Payment reconciled/ });
    fireEvent.click(record);
    expect(screen.getByText("INV-00731")).toBeVisible();
    expect(record).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(screen.getByRole("button", { name: /Receipt delivered/ }));
    expect(screen.queryByText("INV-00731")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Perception Field" }));
    fireEvent.click(screen.getByRole("button", { name: /Inspection/ }));
    expect(
      screen.getByRole("link", { name: /Machine Readout/ })
    ).toHaveAttribute("href", "/components#machine-readout");
    expect(document.querySelector("canvas")).toBeNull();
  });
  it("keeps the pinned minute across releases and restores the baseline without canvas", () => {
    vi.stubGlobal("localStorage", { getItem: () => null, setItem: vi.fn() });
    render(
      <ThemeProvider>
        <EffectsWorkbench />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "DOM only" }));
    fireEvent.click(screen.getByRole("button", { name: "14:32, 182 ms" }));
    const compare = screen.getByRole("button", { name: "Compare deployments" });
    fireEvent.click(compare);
    expect(
      screen.getByRole("button", { name: "14:32, 46 ms" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("-136 ms")).toBeVisible();
    expect(screen.getByText("Unchanged")).toBeVisible();
    fireEvent.click(compare);
    expect(screen.getByRole("status")).toHaveTextContent("14:32 · 182 ms");
    expect(document.querySelector("canvas")).toBeNull();
  });
  it.each(gridProtocols)(
    "commits and reverses $title without canvas or audio",
    async (spec) => {
      vi.stubGlobal("localStorage", { getItem: () => null, setItem: vi.fn() });
      render(
        <ThemeProvider>
          <EffectsWorkbench />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByRole("button", { name: spec.title }));
      fireEvent.click(screen.getByRole("button", { name: "DOM only" }));
      expect(
        screen.getByText("npx shadcn@latest add @thegridcn/scan-reveal")
      ).toBeVisible();
      for (const [action, state] of [
        [spec.action, spec.states[1]],
        [spec.undo, spec.states[0]],
      ]) {
        await act(async () => {
          fireEvent.click(screen.getByRole("button", { name: action }));
          await Promise.resolve();
        });
        expect(screen.getByRole("status")).toHaveTextContent(state);
      }
      expect(document.querySelector("canvas")).toBeNull();
      expect(GRID_SOUNDS[spec.cue].voices.length).toBeGreaterThan(1);
    }
  );
  it("shows Prism Fold's install item and commits live data in DOM-only mode", async () => {
    const storage = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    });
    render(
      <ThemeProvider>
        <EffectsWorkbench />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "Prism Fold" }));
    expect(
      screen.getByText("npx shadcn@latest add @thegridcn/scan-reveal")
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "DOM only" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Apply reroute" }));
      await Promise.resolve();
    });
    expect(screen.getByText("18 ms")).toBeVisible();
    expect(document.querySelector("canvas")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Focus Lens" }));
    expect(
      screen.queryByRole("button", { name: "Inspect data" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Inspection is on. The data is enlarged in place.")
    ).toBeVisible();
    expect(screen.getByRole("table")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "Theme" }), {
      target: { value: "ares" },
    });
    expect(document.documentElement).toHaveAttribute("data-theme", "ares");
    expect(storage.get("project-ares-theme")).toBe("ares");
  });
});

describe("Product components", () => {
  it("reports overage without an out-of-range meter and tolerates missing trend samples", () => {
    render(
      <>
        <UsageMeter label="Projects" limit={100} used={110} />
        <MetricTrend
          caption="No traffic in this period"
          label="API latency"
          samples={[Number.NaN]}
          value="—"
        />
      </>
    );
    expect(screen.getByRole("meter", { name: "Projects" })).toHaveAttribute(
      "value",
      "100"
    );
    expect(screen.getByText("10 over limit")).toBeVisible();
    expect(screen.getByText("Not enough samples for a trend.")).toBeVisible();
  });

  it("updates the compared image fraction without hiding image alternatives", () => {
    render(
      <BeforeAfter
        before={{ alt: "Old layout", src: "/old.svg" }}
        after={{ alt: "New layout", src: "/new.svg" }}
        label="Compare layouts"
      />
    );
    const slider = screen.getByRole("slider", { name: "Compare layouts" });
    fireEvent.change(slider, { target: { value: "75" } });
    expect(slider).toHaveAttribute("aria-valuetext", "75% before, 25% after");
    expect(
      screen.getByRole("img", { name: "Before: Old layout" })
    ).toBeInTheDocument();
  });

  it("prevents duplicate async actions and reports a failure without sound", async () => {
    let rejectAction: (reason: Error) => void = () => undefined;
    const action = vi.fn(
      () =>
        new Promise((_, reject) => {
          rejectAction = reject;
        })
    );
    render(
      <SoundAction
        action={action}
        failureCue={false}
        label="Save report"
        successCue={false}
      />
    );
    const button = screen.getByRole("button", { name: "Save report" });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(action).toHaveBeenCalledOnce();
    expect(screen.getByRole("status")).toHaveTextContent("Working");
    await act(async () => {
      rejectAction(new Error("test"));
      await Promise.resolve();
    });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Action failed. Try again."
    );
  });
});
