import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { useRef, useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FocusLens } from "@/components/thegridcn/focus-lens";
import {
  ScanReveal,
  type ScanRevealHandle,
} from "@/components/thegridcn/scan-reveal";

beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("DOM inspection effects", () => {
  it("enlarges real data without a canvas or duplicate DOM", () => {
    render(
      <FocusLens>
        <p>26.712 ms</p>
      </FocusLens>
    );
    const value = screen.getByText("26.712 ms");
    const toggle = screen.getByRole("button", { name: "Inspect data" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(value.parentElement?.style.zoom).toBe("1.2");
    expect(screen.getByText("26.712 ms")).toBe(value);
    expect(document.querySelector("canvas")).toBeNull();
    fireEvent.keyDown(toggle, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(value.parentElement?.style.zoom).toBe("1");
  });

  it("commits the new data once, retains the control, and reports DOM completion", async () => {
    const done = vi.fn();
    const apply = vi.fn();
    function Example() {
      const ref = useRef<ScanRevealHandle>(null);
      const [value, setValue] = useState(42);
      return (
        <ScanReveal onComplete={done} ref={ref}>
          <button
            onClick={() =>
              ref.current?.reveal(() => {
                apply();
                setValue(18);
              })
            }
            type="button"
          >
            Latency {value} ms
          </button>
        </ScanReveal>
      );
    }
    render(<Example />);
    const control = screen.getByRole("button", { name: "Latency 42 ms" });
    control.focus();
    await act(async () => {
      fireEvent.click(control);
      fireEvent.click(control);
      await Promise.resolve();
    });
    expect(apply).toHaveBeenCalledOnce();
    expect(done).toHaveBeenCalledExactlyOnceWith("dom");
    expect(screen.getByRole("button", { name: "Latency 18 ms" })).toBe(control);
    expect(document.activeElement).toBe(control);
    expect(document.querySelector("canvas")).toBeNull();
  });
});
