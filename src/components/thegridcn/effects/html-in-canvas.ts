import {
  createHtmlCanvasSource,
  type EffectPalette,
  trackEffectPalette,
} from "./html-canvas-surface";

export interface CanvasEffectRenderer {
  dispose: () => void;
  draw: (
    source: HTMLCanvasElement,
    progress: number,
    palette: EffectPalette,
    captureVersion: number
  ) => boolean;
}

export type CanvasEffectResult = "webgl" | "dom";

export function canPlayCanvasEffect() {
  return createHtmlCanvasSource() !== null;
}

/** The effect owns only a temporary presentation; React keeps the live DOM. */
export function playCanvasEffect({
  createRenderer,
  duration,
  onComplete,
  stage,
  surface,
}: {
  createRenderer: (output: HTMLCanvasElement) => CanvasEffectRenderer | null;
  duration: number;
  onComplete: (result: CanvasEffectResult) => void;
  stage: HTMLElement;
  surface: HTMLElement;
}) {
  const source = createHtmlCanvasSource();
  const rect = stage.getBoundingClientRect();
  if (!(source && rect.width && surface.offsetHeight)) {
    onComplete("dom");
    return;
  }

  const output = document.createElement("canvas");
  let renderer: CanvasEffectRenderer | null;
  try {
    renderer = createRenderer(output);
  } catch {
    renderer = null;
  }
  if (!renderer) {
    onComplete("dom");
    return;
  }

  const { canvas, ctx } = source;
  const themePalette = trackEffectPalette(stage, () => canvas.requestPaint?.());
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const previousFocus = surface.contains(document.activeElement)
    ? (document.activeElement as HTMLElement)
    : undefined;
  let frame = 0;
  let start: number | undefined;
  let watchdog: number | undefined;
  let disposed = false;
  let captureVersion = 0;

  output.setAttribute("aria-hidden", "true");
  Object.assign(output.style, {
    display: "block",
    pointerEvents: "none",
    position: "absolute",
    visibility: "hidden",
    zIndex: "1",
  });
  Object.assign(canvas.style, {
    display: "block",
    height: `${surface.offsetHeight}px`,
    width: "100%",
  });

  function resize() {
    const bounds = stage.getBoundingClientRect();
    const height = surface.offsetHeight;
    const gutterX = Math.max(
      0,
      Math.min(110, bounds.left - 1, window.innerWidth - bounds.right - 1)
    );
    const gutterY = Math.min(96, height * 0.22);
    const scale = Math.min(2, window.devicePixelRatio || 1);
    const widthPx = Math.round(bounds.width * scale);
    const heightPx = Math.round(height * scale);
    if (canvas.width !== widthPx) {
      canvas.width = widthPx;
    }
    if (canvas.height !== heightPx) {
      canvas.height = heightPx;
    }
    canvas.style.height = `${height}px`;
    output.style.inset = `-${gutterY}px -${gutterX}px`;
    output.style.width = `calc(100% + ${2 * gutterX}px)`;
    output.style.height = `calc(100% + ${2 * gutterY}px)`;
    canvas.requestPaint?.();
  }

  const observer = new ResizeObserver(resize);
  function dispose() {
    if (disposed) {
      return;
    }
    disposed = true;
    window.clearTimeout(watchdog);
    cancelAnimationFrame(frame);
    observer.disconnect();
    themePalette.dispose();
    motion.removeEventListener("change", handleMotion);
    canvas.removeEventListener("paint", paint);
    output.removeEventListener("webglcontextlost", handleContextLost);
    const active = document.activeElement;
    const focused = surface.contains(active)
      ? (active as HTMLElement)
      : undefined;
    const restoreFocus =
      focused ?? (active === document.body ? previousFocus : undefined);
    surface.removeAttribute("drawable");
    if (canvas.parentNode === stage) {
      stage.insertBefore(surface, canvas);
      canvas.remove();
    }
    output.remove();
    renderer?.dispose();
    if (restoreFocus?.isConnected) {
      restoreFocus.focus({ preventScroll: true });
    }
  }

  function finish(result: CanvasEffectResult) {
    if (!disposed) {
      dispose();
      onComplete(result);
    }
  }

  function handleMotion() {
    if (motion.matches) {
      finish("dom");
    }
  }

  function handleContextLost() {
    finish("dom");
  }

  function draw(now: number) {
    if (start === undefined || disposed) {
      return;
    }
    const progress = (now - start) / duration;
    if (progress >= 1) {
      finish("webgl");
      return;
    }
    try {
      if (
        renderer?.draw(canvas, progress, themePalette.get(), captureVersion)
      ) {
        frame = requestAnimationFrame(draw);
        return;
      }
    } catch {
      // The original surface is restored if the GPU renderer fails.
    }
    finish("dom");
  }

  function paint() {
    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawElementImage?.(surface, 0, 0);
      captureVersion += 1;
    } catch {
      if (start !== undefined) {
        finish("dom");
      }
      return;
    }
    if (start === undefined) {
      start = performance.now();
      window.clearTimeout(watchdog);
      watchdog = window.setTimeout(() => finish("dom"), duration + 300);
      stage.dataset.canvasEffect = "webgl";
      draw(start);
      if (!disposed) {
        canvas.style.opacity = "0";
        output.style.visibility = "visible";
        if (document.activeElement === document.body) {
          previousFocus?.focus({ preventScroll: true });
        }
      }
    }
  }

  canvas.addEventListener("paint", paint);
  output.addEventListener("webglcontextlost", handleContextLost);
  motion.addEventListener("change", handleMotion);
  try {
    stage.insertBefore(canvas, surface);
    surface.setAttribute("drawable", "");
    canvas.append(surface);
    stage.append(output);
    watchdog = window.setTimeout(() => finish("dom"), 400);
    observer.observe(stage);
    observer.observe(surface);
    resize();
    return dispose;
  } catch {
    finish("dom");
  }
}
