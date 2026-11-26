import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SoundToggle } from "@/components/sounds/sound-toggle";
import { SoundPad } from "@/components/thegridcn/sound-pad";
import { SoundSequence } from "@/components/thegridcn/sound-sequence";
import { playGridSound, setGridSoundEnabled } from "@/lib/grid-sounds";

afterEach(() => {
  cleanup();
  setGridSoundEnabled(false);
  vi.unstubAllGlobals();
});

describe("Grid Sounds", () => {
  it("does not create an audio context before the user opts in", () => {
    const entries = new Map();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => entries.get(key) ?? null,
      setItem: (key: string, value: string) => entries.set(key, value),
    });
    const create = vi.fn(function makeAudioContext() {
      throw new Error("Audio unavailable in this test");
    });
    vi.stubGlobal("AudioContext", create);
    render(<SoundToggle />);
    const toggle = screen.getByRole("button", { name: "Demo sound" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    playGridSound("confirm");
    expect(create).not.toHaveBeenCalled();
    fireEvent.click(toggle);
    expect(create).toHaveBeenCalledOnce();
    expect(window.localStorage.getItem("thegridcn-sound-enabled")).toBe("on");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    playGridSound("confirm");
    expect(create).toHaveBeenCalledOnce();
  });

  it("keeps the nav mute, gallery switch, and Sound Pad in sync", () => {
    render(
      <>
        <SoundToggle compact />
        <SoundToggle />
        <SoundPad cue="select" />
      </>
    );
    const nav = screen.getByRole("button", { name: "Site sound" });
    const gallery = screen.getByRole("button", { name: "Demo sound" });
    const pad = screen.getByRole("button", { name: "Play Select" });
    expect(pad).toBeDisabled();
    fireEvent.click(nav);
    expect(gallery).toHaveAttribute("aria-pressed", "true");
    expect(pad).toBeEnabled();
    fireEvent.click(pad);
    expect(pad).toHaveAttribute("data-playing", "true");
    fireEvent.click(gallery);
    expect(nav).toHaveAttribute("aria-pressed", "false");
    expect(pad).toBeDisabled();
    expect(pad).toHaveAttribute("data-playing", "false");
  });

  it("advances, resets focus, and completes a sequence while muted", () => {
    const create = vi.fn(function makeAudioContext() {
      throw new Error("Unexpected audio");
    });
    vi.stubGlobal("AudioContext", create);
    const onStep = vi.fn();
    render(
      <SoundSequence
        onStep={onStep}
        steps={[
          { action: "Boot relay", cue: "boot", id: "boot", label: "Startup" },
          {
            action: "Lock signal",
            cue: "confirm",
            id: "lock",
            label: "Confirm",
          },
        ]}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Boot relay" }));
    expect(screen.getByRole("status")).toHaveTextContent("Step 2 of 2");
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("button", { name: "Boot relay" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Boot relay" }));
    fireEvent.click(screen.getByRole("button", { name: "Lock signal" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sequence complete.");
    expect(onStep).toHaveBeenCalledTimes(3);
    expect(create).not.toHaveBeenCalled();
  });
});
