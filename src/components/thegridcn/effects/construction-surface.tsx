"use client";

import { type ReactNode, useEffect, useRef } from "react";
import {
  type EffectColor,
  effectColorCss,
  makeCanvasOverlay,
  mountHtmlCanvasSurface,
  trackEffectPalette,
} from "./html-canvas-surface";

function drawFragments(
  ctx: CanvasRenderingContext2D,
  source: HTMLCanvasElement,
  mode: "decode" | "field",
  t: number,
  accent: EffectColor
) {
  const { width: w, height: h } = ctx.canvas;
  const cols = mode === "field" ? 4 : 1;
  const rows = mode === "field" ? 3 : 9;
  const cw = w / cols,
    ch = h / rows;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const delay = mode === "field" ? (x + y) * 0.075 : y * 0.048;
      const reveal = Math.min(1, Math.max(0, (t - delay) / 0.58));
      const dx = x * cw,
        dy = y * ch;
      ctx.strokeStyle = effectColorCss(accent, (1 - reveal) * 0.65);
      ctx.strokeRect(dx + 0.5, dy + 0.5, cw - 1, ch - 1);
      if (reveal > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(dx, dy, cw, ch);
        ctx.clip();
        const shift =
          mode === "decode" ? (1 - reveal) * cw * 0.16 * (y % 2 ? 1 : -1) : 0;
        const inset = mode === "field" ? (1 - reveal) * 0.26 : 0;
        ctx.globalAlpha = reveal;
        ctx.drawImage(
          source,
          dx,
          dy,
          cw,
          ch,
          dx + shift + cw * inset,
          dy + ch * inset,
          cw * (1 - 2 * inset),
          ch * (1 - 2 * inset)
        );
        ctx.restore();
      }
    }
  }
}

/** Animate a new revision of live HTML, then release both canvases. */
export function ConstructionSurface({
  children,
  revision,
  mode,
  forceDom,
}: {
  children: ReactNode;
  revision: string;
  mode: "rod" | "scaffold" | "decode" | "field";
  forceDom?: boolean;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const previous = useRef(revision);
  useEffect(() => {
    const oldReading = previous.current;
    const changed = oldReading !== revision;
    previous.current = revision;
    const root = stage.current;
    const surface = content.current;
    if (!changed || forceDom || !root || !surface) {
      return;
    }
    let frame = 0;
    let output: ReturnType<typeof makeCanvasOverlay> = null;
    let palette: ReturnType<typeof trackEffectPalette> | undefined;
    function release() {
      cancelAnimationFrame(frame);
      output?.canvas.remove();
      palette?.dispose();
    }
    const capture = mountHtmlCanvasSurface({
      onFallback: release,
      onPaint(source) {
        if (output) {
          return;
        }
        output = makeCanvasOverlay(root);
        if (!output) {
          capture?.dispose();
          return;
        }
        const { canvas, context: ctx } = output;
        canvas.dataset.effectMode = mode;
        palette = trackEffectPalette(root);
        canvas.width = source.width;
        canvas.height = source.height;
        const w = canvas.width,
          h = canvas.height;
        const font = getComputedStyle(surface);
        const scale = w / Math.max(1, root.clientWidth);
        source.style.opacity = "0";
        const start = performance.now();
        function draw(now: number) {
          const t = Math.min(1, (now - start) / 360);
          if (t >= 1) {
            release();
            capture?.dispose();
            return;
          }
          if (!palette) {
            return;
          }
          ctx.clearRect(0, 0, w, h);
          const { accent, background } = palette.get();
          ctx.fillStyle = effectColorCss(background);
          ctx.fillRect(0, 0, w, h);
          const front = w * (1 - (1 - t) ** 2);
          if (mode === "field" || mode === "decode") {
            drawFragments(ctx, source, mode, t, accent);
            frame = requestAnimationFrame(draw);
            return;
          }
          if (mode === "scaffold") {
            ctx.strokeStyle = effectColorCss(accent, (1 - t) * 0.65);
            ctx.beginPath();
            for (let x = front; x < w; x += h / 3) {
              ctx.moveTo(x, 0);
              ctx.lineTo(x, h);
            }
            ctx.moveTo(front, h / 2);
            ctx.lineTo(w, h / 2);
            ctx.stroke();
            ctx.font = `${Number.parseFloat(font.fontSize) * scale}px ${font.fontFamily}`;
            ctx.textBaseline = "middle";
            ctx.strokeText(oldReading, 0, h * 0.5);
          } else {
            ctx.globalAlpha = 0.5;
            ctx.drawImage(source, 0, 0);
            ctx.globalAlpha = 1;
          }
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, 0, front, h);
          ctx.clip();
          ctx.drawImage(source, 0, 0);
          ctx.restore();
          frame = requestAnimationFrame(draw);
        }
        draw(start);
      },
      stage: root,
      surface,
    });
    return () => {
      release();
      capture?.dispose();
    };
  }, [revision, mode, forceDom]);
  return (
    <div className="relative min-w-0" ref={stage}>
      <div ref={content}>{children}</div>
    </div>
  );
}
