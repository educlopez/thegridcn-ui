"use client";

import { useSyncExternalStore } from "react";

interface Voice {
  delay?: number;
  frequency: number;
  glideTo?: number;
  level: number;
  tail: number;
  type?: OscillatorType;
}

export const GRID_SOUNDS = {
  activate: {
    description: "A short lift for arming a control.",
    label: "Activate",
    voices: [
      { frequency: 330, level: 0.18, tail: 0.075, type: "triangle" },
      { delay: 0.038, frequency: 495, level: 0.14, tail: 0.09 },
    ],
  },
  boot: {
    description: "Three rising notes for a completed startup.",
    label: "Boot",
    voices: [
      { frequency: 261.63, level: 0.16, tail: 0.13 },
      { delay: 0.059, frequency: 392, level: 0.17, tail: 0.15 },
      { delay: 0.122, frequency: 523.25, level: 0.18, tail: 0.18 },
    ],
  },
  confirm: {
    description: "The glass lock from Shatter. Use after an action succeeds.",
    label: "Confirm",
    voices: [
      { frequency: 659.25, level: 0.35, tail: 0.15 },
      { frequency: 1318.5, level: 0.18, tail: 0.052, type: "triangle" },
    ],
  },
  "disc-lock": {
    description: "A metallic double strike for a verified identity.",
    label: "Disc Lock",
    voices: [
      { frequency: 1480, glideTo: 1160, level: 0.12, tail: 0.075 },
      { delay: 0.079, frequency: 812, level: 0.23, tail: 0.17 },
      { delay: 0.079, frequency: 2030, level: 0.09, tail: 0.11 },
    ],
  },
  error: {
    description: "A descending pair for an unsuccessful action.",
    label: "Error",
    voices: [
      { frequency: 310, level: 0.2, tail: 0.1, type: "triangle" },
      { delay: 0.065, frequency: 207, level: 0.17, tail: 0.15 },
    ],
  },
  "gate-shift": {
    description: "A split bass slide and a short latch for a sector handoff.",
    label: "Gate Shift",
    voices: [
      {
        frequency: 196,
        glideTo: 74,
        level: 0.26,
        tail: 0.32,
        type: "triangle",
      },
      { frequency: 294, glideTo: 111, level: 0.12, tail: 0.22 },
      {
        delay: 0.19,
        frequency: 430,
        level: 0.14,
        tail: 0.06,
        type: "triangle",
      },
    ],
  },
  ignition: {
    description: "A low motor sweep that lands as a lightcycle route locks in.",
    label: "Trail Ignition",
    voices: [
      {
        frequency: 86,
        glideTo: 268,
        level: 0.24,
        tail: 0.26,
        type: "sawtooth",
      },
      {
        frequency: 172,
        glideTo: 536,
        level: 0.12,
        tail: 0.22,
        type: "triangle",
      },
    ],
  },
  materialize: {
    description: "Four glass partials converge as a program becomes resident.",
    label: "Rez Harmonics",
    voices: [
      { frequency: 244, glideTo: 330, level: 0.15, tail: 0.21 },
      { delay: 0.043, frequency: 401, glideTo: 495, level: 0.13, tail: 0.19 },
      { delay: 0.087, frequency: 605, glideTo: 660, level: 0.11, tail: 0.16 },
      { delay: 0.13, frequency: 911, glideTo: 990, level: 0.09, tail: 0.12 },
    ],
  },
  select: {
    description: "A quiet tick for choosing a setting.",
    label: "Select",
    voices: [{ frequency: 740, level: 0.13, tail: 0.047, type: "triangle" }],
  },
  warning: {
    description: "Two soft pulses for a state that needs attention.",
    label: "Warning",
    voices: [
      { frequency: 392, level: 0.17, tail: 0.105 },
      { delay: 0.1, frequency: 392, level: 0.14, tail: 0.14 },
    ],
  },
} satisfies Record<
  string,
  { description: string; label: string; voices: Voice[] }
>;

export type GridSound = keyof typeof GRID_SOUNDS;

const STORAGE_KEY = "thegridcn-sound-enabled";
const VOLUME = 0.22;
const listeners = new Set<() => void>();
let enabled: boolean | undefined;
let context: AudioContext | undefined;
let master: GainNode | undefined;
let lastPlayed = Number.NEGATIVE_INFINITY;
const pendingVoices = new Set<OscillatorNode>();

function readPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function isEnabled() {
  // Keep this read-only for useSyncExternalStore's snapshot.
  return enabled ?? readPreference();
}

function silence() {
  if (master) {
    master.gain.value = 0;
  }
  for (const oscillator of pendingVoices) {
    oscillator.stop();
  }
  pendingVoices.clear();
}

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function syncPreference(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) {
    return;
  }
  enabled = readPreference();
  if (!enabled) {
    silence();
  }
  notify();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    window.addEventListener("storage", syncPreference);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", syncPreference);
      // Re-read storage on the next route when there are no subscribers.
      enabled = undefined;
    }
  };
}

export function useGridSoundPreference() {
  return useSyncExternalStore<boolean | null>(subscribe, isEnabled, () => null);
}

export function useGridSoundEnabled() {
  return useGridSoundPreference() === true;
}

/** Call from an intentional interaction to unlock Web Audio. */
export function prepareGridSound() {
  if (!isEnabled() || typeof AudioContext === "undefined") {
    return;
  }
  try {
    if (!context || context.state === "closed") {
      context = new AudioContext();
      master = context.createGain();
      master.connect(context.destination);
    }
    return context.resume().catch(() => undefined);
  } catch {
    // Some browsers deny audio even after an explicit gesture.
  }
}

export function setGridSoundEnabled(value: boolean) {
  enabled = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch {
    // Private or blocked storage still allows an in-page preference.
  }
  if (value) {
    prepareGridSound();
  } else {
    silence();
  }
  notify();
}

function synthesize(
  audio: BaseAudioContext,
  output: AudioNode,
  name: GridSound,
  start: number,
  active?: Set<OscillatorNode>
) {
  const voices: Voice[] = GRID_SOUNDS[name].voices;
  for (const voice of voices) {
    const onset = start + (voice.delay ?? 0);
    const oscillator = audio.createOscillator();
    const envelope = audio.createGain();
    oscillator.type = voice.type ?? "sine";
    oscillator.frequency.value = voice.frequency;
    if (voice.glideTo) {
      oscillator.frequency.setValueAtTime(voice.frequency, onset);
      oscillator.frequency.exponentialRampToValueAtTime(
        voice.glideTo,
        onset + voice.tail
      );
    }
    envelope.gain.setValueAtTime(0.001, onset);
    envelope.gain.exponentialRampToValueAtTime(voice.level, onset + 0.004);
    envelope.gain.exponentialRampToValueAtTime(0.001, onset + voice.tail);
    oscillator.connect(envelope).connect(output);
    active?.add(oscillator);
    oscillator.onended = () => {
      active?.delete(oscillator);
      oscillator.disconnect();
      envelope.disconnect();
    };
    oscillator.start(onset);
    oscillator.stop(onset + voice.tail + 0.005);
  }
}

export function playGridSound(name: GridSound) {
  if (!isEnabled()) {
    return;
  }
  const play = () => {
    if (!isEnabled() || context?.state !== "running" || !master) {
      return;
    }
    const now = performance.now();
    if (now - lastPlayed < 30) {
      return;
    }
    lastPlayed = now;
    master.gain.value = VOLUME;
    synthesize(context, master, name, context.currentTime, pendingVoices);
  };
  if (context?.state === "running") {
    play();
  } else {
    prepareGridSound()?.then(play);
  }
}

/** Render the exact same patch offline, independently of the mute switch. */
export async function renderGridSoundWav(name: GridSound): Promise<Blob> {
  const sampleRate = 44_100;
  const audio = new OfflineAudioContext(1, sampleRate / 2, sampleRate);
  const gain = audio.createGain();
  gain.gain.value = VOLUME;
  gain.connect(audio.destination);
  synthesize(audio, gain, name, 0);
  const samples = (await audio.startRendering()).getChannelData(0);
  const data = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(data);
  const write = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  };
  write(0, "RIFF");
  view.setUint32(4, data.byteLength - 8, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, samples.length * 2, true);
  for (const [i, sample] of samples.entries()) {
    view.setInt16(44 + i * 2, Math.round(sample * 32_767), true);
  }
  return new Blob([data], { type: "audio/wav" });
}
