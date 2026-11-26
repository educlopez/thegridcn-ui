"use client";

import {
  forwardRef,
  type HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { flushSync } from "react-dom";
import {
  type GridSound,
  playGridSound,
  prepareGridSound,
} from "@/lib/grid-sounds";
import {
  canCaptureHtml,
  defaultEffectPalette,
  type EffectPalette,
  effectColorCss,
  type HtmlCanvasSurface,
  makeCanvasOverlay,
  mountHtmlCanvasSurface,
  trackEffectPalette,
} from "./effects/html-canvas-surface";
import {
  type InspectionMode,
  makeInspectionWebGL,
  normalizeInspectionStrength,
} from "./effects/inspection-webgl";

export interface ScanRevealHandle {
  /** Commit a synchronous UI update. Returns false if another reveal is running. */
  reveal: (commit: () => void, options?: { silent?: boolean }) => boolean;
}

type RevealRenderer = "canvas" | "dom";

export interface ScanRevealProps extends HTMLAttributes<HTMLDivElement> {
  /** Multiplier from 0 to 2 for the emphasis on changed glyphs only. */
  changeIntensity?: number;
  duration?: number;
  forceDom?: boolean;
  onComplete?: (renderer: RevealRenderer) => void;
  sound?: GridSound | false;
  variant?: Exclude<InspectionMode, "lens" | "contrast">;
}

function snapshot(source: HTMLCanvasElement) {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const context = canvas.getContext("2d");
  if (!(context && canvas.width && canvas.height)) {
    return null;
  }
  context.drawImage(source, 0, 0);
  return canvas;
}

function drawReveal(
  context: CanvasRenderingContext2D,
  before: HTMLCanvasElement,
  after: HTMLCanvasElement,
  progress: number,
  palette: EffectPalette
) {
  const { width, height } = after;
  const slant = Math.min(26, width * 0.065);
  const travel = (width + slant * 2) * (1 - (1 - progress) ** 1.22);
  const edge = travel - slant;
  context.clearRect(0, 0, width, height);
  context.drawImage(before, 0, 0);
  context.save();
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(edge + slant, 0);
  context.lineTo(edge - slant, height);
  context.lineTo(0, height);
  context.closePath();
  context.clip();
  context.clearRect(0, 0, width, height);
  context.drawImage(after, 0, 0);
  context.restore();

  const feather = Math.min(76, width * 0.12);
  const wash = context.createLinearGradient(
    edge - feather,
    0,
    edge + feather,
    0
  );
  const clear = effectColorCss(palette.accent, 0);
  wash.addColorStop(0, clear);
  wash.addColorStop(0.5, effectColorCss(palette.accent, 0.2));
  wash.addColorStop(1, clear);
  context.fillStyle = wash;
  context.fillRect(edge - feather, 0, feather * 2, height);

  context.beginPath();
  context.moveTo(edge + slant, 0);
  context.lineTo(edge - slant, height);
  context.strokeStyle = effectColorCss(palette.accent);
  context.lineWidth = Math.max(1.4, width / 600);
  context.stroke();
}

interface Attempt {
  cancel?: () => void;
}

/** Reveals newly committed data over the previous HTML snapshot. */
// biome-ignore lint/suspicious/noReactForwardRef: registry consumers may use React 18.
export const ScanReveal = forwardRef<ScanRevealHandle, ScanRevealProps>(
  function ScanReveal(
    {
      changeIntensity = 1,
      children,
      duration = 480,
      forceDom = false,
      onComplete,
      sound = false,
      style,
      variant = "reveal",
      ...props
    },
    ref
  ) {
    const stage = useRef<HTMLDivElement>(null);
    const surface = useRef<HTMLDivElement>(null);
    const current = useRef<Attempt | null>(null);
    const intensity = useRef(normalizeInspectionStrength(changeIntensity));

    useEffect(() => {
      intensity.current = normalizeInspectionStrength(changeIntensity);
    }, [changeIntensity]);

    useEffect(
      () => () => {
        current.current?.cancel?.();
        current.current = null;
      },
      []
    );

    useImperativeHandle(
      ref,
      () => ({
        reveal(commit, options) {
          const cue = options?.silent ? false : sound;
          const target = stage.current;
          const content = surface.current;
          if (!(target && content) || current.current) {
            return false;
          }

          const attempt: Attempt = {};
          current.current = attempt;
          const speed = Number.isFinite(duration)
            ? Math.max(160, Math.min(1600, duration))
            : 480;
          let didCommit = false;
          let before: HTMLCanvasElement | null = null;
          let after: HTMLCanvasElement | null = null;
          let mounted: HtmlCanvasSurface | null = null;
          let frame = 0;
          let watchdog = 0;
          const supported = !forceDom && canCaptureHtml();
          const gpu = supported
            ? makeInspectionWebGL(target, variant, () => finish("dom"))
            : null;
          const flat = supported && !gpu ? makeCanvasOverlay(target) : null;
          const output = gpu?.canvas ?? flat?.canvas;
          const themePalette = output ? trackEffectPalette(target) : null;

          if (cue) {
            prepareGridSound();
          }
          target.dataset.scanReveal = "pending";
          if (output) {
            output.style.visibility = "hidden";
          }

          function apply() {
            if (!didCommit) {
              didCommit = true;
              commit();
            }
          }

          function cancel() {
            cancelAnimationFrame(frame);
            window.clearTimeout(watchdog);
            mounted?.dispose();
            themePalette?.dispose();
            flat?.canvas.remove();
            gpu?.dispose();
            if (target) {
              target.dataset.scanReveal = "idle";
            }
          }
          attempt.cancel = cancel;

          function finish(renderer: RevealRenderer) {
            if (current.current !== attempt) {
              return;
            }
            current.current = null;
            cancel();
            apply();
            if (cue) {
              playGridSound(cue);
            }
            onComplete?.(renderer);
          }

          function drawGpu(source: HTMLCanvasElement, progress: number) {
            return gpu?.draw({
              height: source.clientHeight,
              palette: themePalette?.get(),
              pixelHeight: source.height,
              pixelWidth: source.width,
              progress,
              strength: intensity.current,
              width: source.clientWidth,
            });
          }

          function presentBefore(source: HTMLCanvasElement) {
            if (!(before && mounted && output)) {
              return false;
            }
            if (gpu && !(gpu.upload(0, before) && drawGpu(source, 0))) {
              return false;
            }
            if (flat) {
              output.width = before.width;
              output.height = before.height;
              flat.context.drawImage(before, 0, 0);
            }
            output.style.visibility = "visible";
            mounted.canvas.style.opacity = "0";
            try {
              flushSync(apply);
            } catch (error) {
              current.current = null;
              cancel();
              throw error;
            }
            mounted.requestPaint();
            return true;
          }

          function onPaint(source: HTMLCanvasElement) {
            if (!(output && target) || current.current !== attempt || after) {
              return;
            }
            if (!before) {
              before = snapshot(source);
              if (!presentBefore(source)) {
                finish("dom");
              }
              return;
            }
            after = snapshot(source);
            if (
              !after ||
              after.width !== before.width ||
              after.height !== before.height
            ) {
              finish("dom");
              return;
            }
            if (gpu && !gpu.upload(1, after)) {
              finish("dom");
              return;
            }
            const previous = before;
            const next = after;
            const begin = performance.now();
            target.dataset.scanReveal = "canvas";

            function tick(now: number) {
              const progress = Math.min(1, (now - begin) / speed);
              if (progress >= 1) {
                finish("canvas");
                return;
              }
              if (gpu && !drawGpu(source, progress)) {
                finish("dom");
                return;
              }
              if (flat) {
                drawReveal(
                  flat.context,
                  previous,
                  next,
                  progress,
                  themePalette?.get() ?? defaultEffectPalette
                );
              }
              frame = requestAnimationFrame(tick);
            }

            frame = requestAnimationFrame(tick);
          }

          if (output) {
            mounted = mountHtmlCanvasSurface({
              onFallback: () => finish("dom"),
              onPaint,
              stage: target,
              surface: content,
            });
          }
          if (mounted) {
            watchdog = window.setTimeout(() => finish("dom"), speed + 1000);
          } else {
            queueMicrotask(() => finish("dom"));
          }
          return true;
        },
      }),
      [duration, forceDom, onComplete, sound, variant]
    );

    return (
      <div
        {...props}
        data-scan-reveal="idle"
        ref={stage}
        style={{ ...style, position: "relative" }}
      >
        <div
          data-scan-reveal-surface=""
          ref={surface}
          style={{ width: "100%" }}
        >
          {children}
        </div>
      </div>
    );
  }
);
