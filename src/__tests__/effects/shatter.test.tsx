import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { useRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Shatter, type ShatterHandle } from "@/components/thegridcn/shatter";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Shatter DOM fallback", () => {
  it("keeps the interactive panel mounted and completes reduced-motion runs once", async () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    const complete = vi.fn();

    function Example() {
      const ref = useRef<ShatterHandle>(null);
      const [value, setValue] = useState(0);
      return (
        <Shatter
          onComplete={(renderer) => {
            complete(renderer);
            setValue((count) => count + 1);
          }}
          ref={ref}
        >
          <button onClick={() => ref.current?.play()} type="button">
            Scan {value}
          </button>
        </Shatter>
      );
    }

    render(<Example />);
    const button = screen.getByRole("button", { name: "Scan 0" });
    button.focus();
    await act(async () => {
      fireEvent.click(button);
      fireEvent.click(button);
      await Promise.resolve();
    });
    expect(complete).toHaveBeenCalledExactlyOnceWith("dom");
    expect(screen.getByRole("button", { name: "Scan 1" })).toBe(button);
    expect(document.activeElement).toBe(button);
    expect(document.querySelector("canvas")).toBeNull();
  });
});
