"use client";

import {
  type HTMLAttributes,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { type GridSound, playGridSound } from "@/lib/grid-sounds";
import {
  canCaptureHtml,
  type EffectPalette,
  effectColorCss,
  type HtmlCanvasSurface,
  makeCanvasOverlay,
  mountHtmlCanvasSurface,
  trackEffectPalette,
} from "./effects/html-canvas-surface";
import {
  makeInspectionWebGL,
  normalizeInspectionStrength,
} from "./effects/inspection-webgl";

interface Point {
  x: number;
  y: number;
}

type Renderer = "canvas" | "dom" | "pending";

export interface FocusLensProps extends HTMLAttributes<HTMLDivElement> {
  /** Direct mode opens the lens without a click and stays silent. */
  activation?: "toggle" | "direct";
  controlClassName?: string;
  /** Edge distortion multiplier from 0 to 2, updated without remounting. */
  edgeRefraction?: number;
  forceDom?: boolean;
  radius?: number;
  sound?: GridSound | false;
  variant?: "glass" | "contrast";
  zoom?: number;
}

const center: Point = { x: 0.5, y: 0.5 };
const arrows: Record<string, Point> = {
  ArrowDown: { x: 0, y: 0.12 },
  ArrowLeft: { x: -0.12, y: 0 },
  ArrowRight: { x: 0.12, y: 0 },
  ArrowUp: { x: 0, y: -0.12 },
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function drawLens(
  context: CanvasRenderingContext2D,
  source: HTMLCanvasElement,
  point: Point,
  zoom: number,
  requestedRadius: number,
  palette: EffectPalette
) {
  const { canvas } = context;
  const width = source.clientWidth;
  const height = source.clientHeight;
  if (!(width && height && source.width && source.height)) {
    return;
  }
  if (canvas.width !== source.width) {
    canvas.width = source.width;
  }
  if (canvas.height !== source.height) {
    canvas.height = source.height;
  }

  const sx = source.width / width;
  const sy = source.height / height;
  context.setTransform(sx, 0, 0, sy, 0, 0);
  context.clearRect(0, 0, width, height);
  const radius = Math.min(requestedRadius, width / 2 - 3, height / 2 - 3);
  if (radius < 12) {
    return;
  }
  const x = point.x * width;
  const y = point.y * height;
  const cx = clamp(x, radius + 3, width - radius - 3);
  const cy = clamp(y, radius + 3, height - radius - 3);
  const crop = radius / zoom;
  const left = clamp(x - crop, 0, width - crop * 2);
  const top = clamp(y - crop, 0, height - crop * 2);

  context.save();
  context.beginPath();
  context.arc(cx, cy, radius, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = effectColorCss(palette.background);
  context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  context.drawImage(
    source,
    left * sx,
    top * sy,
    crop * 2 * sx,
    crop * 2 * sy,
    cx - radius,
    cy - radius,
    radius * 2,
    radius * 2
  );
  context.fillStyle = effectColorCss(palette.accent);
  context.globalAlpha = 0.07;
  context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  context.restore();

  context.beginPath();
  context.arc(cx, cy, radius, 0, Math.PI * 2);
  context.lineWidth = 1.5;
  context.strokeStyle = effectColorCss(palette.accent);
  context.stroke();
  context.beginPath();
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    context.moveTo(cx + cos * (radius - 3), cy + sin * (radius - 3));
    context.lineTo(cx + cos * (radius - 9), cy + sin * (radius - 9));
  }
  context.stroke();
}

/** Pointer/touch inspection, keyboard-controlled by the toggle, DOM zoom by default. */
export function FocusLens({
  activation = "toggle",
  children,
  controlClassName = "rounded border px-3 py-2 text-sm",
  edgeRefraction = 1,
  forceDom = false,
  radius = 85,
  sound = false,
  variant = "glass",
  zoom = 1.8,
  ...props
}: FocusLensProps) {
  const direct = activation === "direct";
  const [toggleActive, setInspecting] = useState(false);
  const inspecting = direct || toggleActive;
  const [renderer, setRenderer] = useState<Renderer>(
    direct ? "pending" : "dom"
  );
  const stage = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const point = useRef(center);
  const renderAtPoint = useRef<(() => void) | undefined>(undefined);
  const id = useId();
  const refraction = useRef(normalizeInspectionStrength(edgeRefraction));
  const safeZoom = Number.isFinite(zoom) ? clamp(zoom, 1.1, 3) : 1.8;
  const safeRadius = Number.isFinite(radius) ? clamp(radius, 32, 180) : 85;

  useEffect(() => {
    if (!(inspecting && stage.current && surface.current)) {
      return;
    }
    const target = stage.current;
    const supported = !forceDom && canCaptureHtml();
    const gpu = supported
      ? makeInspectionWebGL(
          target,
          variant === "contrast" ? "contrast" : "lens",
          fallback
        )
      : null;
    const output = supported && !gpu ? makeCanvasOverlay(target) : null;
    if (!(gpu || output)) {
      setRenderer("dom");
      return;
    }
    let native: HtmlCanvasSurface | null = null;
    let source: HTMLCanvasElement | undefined;
    let frame = 0;
    let reported = false;
    let dirty = true;
    let disposed = false;
    const themePalette = trackEffectPalette(target, () => {
      native?.requestPaint();
      renderAtPoint.current?.();
    });

    function cleanup() {
      if (disposed) {
        return;
      }
      disposed = true;
      themePalette.dispose();
      cancelAnimationFrame(frame);
      renderAtPoint.current = undefined;
      native?.dispose();
      output?.canvas.remove();
      gpu?.dispose();
    }

    function fallback() {
      cleanup();
      setRenderer("dom");
    }

    const paint = () => {
      frame = 0;
      if (!source || disposed) {
        return;
      }
      const palette = themePalette.get();
      if (gpu) {
        const width = source.clientWidth;
        const height = source.clientHeight;
        const lensRadius = Math.min(safeRadius, width / 2 - 3, height / 2 - 3);
        if (lensRadius < 12) {
          return;
        }
        if (
          (dirty && !gpu.upload(0, source)) ||
          !gpu.draw({
            height,
            palette,
            pixelHeight: source.height,
            pixelWidth: source.width,
            radius: lensRadius,
            strength: refraction.current,
            width,
            x: point.current.x,
            y: point.current.y,
            zoom: safeZoom,
          })
        ) {
          fallback();
          return;
        }
        dirty = false;
      } else if (output) {
        drawLens(
          output.context,
          source,
          point.current,
          safeZoom,
          safeRadius,
          palette
        );
      }
    };
    renderAtPoint.current = () => {
      if (!frame) {
        frame = requestAnimationFrame(paint);
      }
    };
    native = mountHtmlCanvasSurface({
      onFallback: fallback,
      onPaint: (canvas) => {
        source = canvas;
        dirty = true;
        if (!reported) {
          reported = true;
          setRenderer("canvas");
        }
        renderAtPoint.current?.();
      },
      stage: target,
      surface: surface.current,
    });
    if (!native) {
      cleanup();
      setRenderer("dom");
    }
    return cleanup;
  }, [forceDom, inspecting, safeRadius, safeZoom, variant]);

  useEffect(() => {
    refraction.current = normalizeInspectionStrength(edgeRefraction);
    renderAtPoint.current?.();
  }, [edgeRefraction]);

  function movePoint(x: number, y: number) {
    if (!inspecting || renderer !== "canvas" || !stage.current) {
      return;
    }
    const rect = stage.current.getBoundingClientRect();
    point.current = {
      x: clamp((x - rect.left) / Math.max(1, rect.width), 0, 1),
      y: clamp((y - rect.top) / Math.max(1, rect.height), 0, 1),
    };
    renderAtPoint.current?.();
  }

  function handleKeys(event: KeyboardEvent<HTMLElement>) {
    if (!inspecting) {
      return;
    }
    if (event.key === "Escape") {
      if (direct) {
        point.current = center;
        renderAtPoint.current?.();
        return;
      }
      setInspecting(false);
      setRenderer("dom");
      return;
    }
    const offset = arrows[event.key];
    if (renderer === "canvas" && offset) {
      event.preventDefault();
      point.current = {
        x: clamp(point.current.x + offset.x, 0, 1),
        y: clamp(point.current.y + offset.y, 0, 1),
      };
      renderAtPoint.current?.();
    }
  }

  const domZoom = inspecting && renderer === "dom";
  return (
    <div {...props}>
      {!direct && (
        <button
          aria-controls={`${id}-data`}
          aria-describedby={`${id}-hint`}
          aria-pressed={inspecting}
          className={controlClassName}
          onClick={() => {
            if (inspecting) {
              setRenderer("dom");
            } else {
              point.current = center;
              setRenderer("pending");
              if (sound) {
                playGridSound(sound);
              }
            }
            setInspecting(!inspecting);
          }}
          onKeyDown={handleKeys}
          type="button"
        >
          Inspect data
        </button>
      )}
      <p
        id={`${id}-hint`}
        style={{ fontSize: "0.8125em", marginBlock: "0.5em 0.75em" }}
      >
        {inspecting
          ? renderer === "canvas"
            ? direct
              ? "Move the pointer or tap an area. Focus the panel and use the arrow keys to move the lens."
              : "Move the pointer or tap an area. Use arrow keys on Inspect data to move the lens."
            : renderer === "pending"
              ? "Preparing inspection."
              : "Inspection is on. The data is enlarged in place."
          : "Turn on inspection to magnify the data."}
      </p>
      <div
        aria-describedby={direct ? `${id}-hint` : undefined}
        aria-label={direct ? "Lens inspection" : undefined}
        data-focus-lens={inspecting ? renderer : "idle"}
        id={`${id}-data`}
        onFocus={(event) => {
          const rect = event.target.getBoundingClientRect();
          movePoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
        }}
        onKeyDown={direct ? handleKeys : undefined}
        onPointerDown={(event) => movePoint(event.clientX, event.clientY)}
        onPointerMove={(event) => {
          if (event.pointerType !== "touch") {
            movePoint(event.clientX, event.clientY);
          }
        }}
        ref={stage}
        role="group"
        style={{ position: "relative" }}
        tabIndex={direct && renderer === "canvas" ? 0 : undefined}
      >
        <div
          ref={surface}
          style={{ width: domZoom ? "auto" : "100%", zoom: domZoom ? 1.2 : 1 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
