type NativeCanvas = HTMLCanvasElement & {
  content?: string;
  requestPaint?: () => void;
};

type NativeContext = CanvasRenderingContext2D & {
  drawElementImage?: (element: Element, x: number, y: number) => void;
};

const reducedMotion = "(prefers-reduced-motion: reduce)";

export type EffectColor = readonly [number, number, number];

const paletteTokens = [
  {
    fallback: [0.32, 0.95, 1],
    property: "color",
    value: "var(--primary, #51f2ff)",
  },
  {
    fallback: [0.028, 0.06, 0.08],
    property: "backgroundColor",
    value: "var(--background, #080f14)",
  },
  {
    fallback: [0.88, 0.98, 1],
    property: "borderTopColor",
    value: "var(--foreground, #effbff)",
  },
  {
    fallback: [0.32, 0.95, 1],
    property: "outlineColor",
    value: "var(--secondary, var(--primary, #51f2ff))",
  },
] as const;

export interface EffectPalette {
  accent: EffectColor;
  background: EffectColor;
  foreground: EffectColor;
  secondary: EffectColor;
}

export const defaultEffectPalette: EffectPalette = {
  accent: paletteTokens[0].fallback,
  background: paletteTokens[1].fallback,
  foreground: paletteTokens[2].fallback,
  secondary: paletteTokens[3].fallback,
};

export function effectColorCss(color: EffectColor, alpha = 1) {
  return `rgba(${color.map((channel) => Math.round(channel * 255)).join(",")},${alpha})`;
}

/** Resolve scoped CSS colors (including OKLCH) to sRGB once per theme change. */
export function trackEffectPalette(stage: HTMLElement, onChange?: () => void) {
  const probe = document.createElement("span");
  probe.hidden = true;
  probe.setAttribute("aria-hidden", "true");
  probe.style.display = "none";
  for (const { property, value } of paletteTokens) {
    probe.style[property] = value;
  }
  stage.prepend(probe);
  const sampler = document.createElement("canvas");
  sampler.width = paletteTokens.length;
  sampler.height = 1;
  const ctx = sampler.getContext("2d", { willReadFrequently: true });
  let previous: string[] | undefined;
  let palette = defaultEffectPalette;

  function refresh() {
    if (ctx) {
      const computed = getComputedStyle(probe);
      const colors = paletteTokens.map(({ property }) => computed[property]);
      if (!previous || colors.some((color, i) => color !== previous?.[i])) {
        previous = colors;
        ctx.clearRect(0, 0, paletteTokens.length, 1);
        for (const [i, color] of colors.entries()) {
          ctx.fillStyle = effectColorCss(paletteTokens[i].fallback);
          ctx.fillStyle = color;
          ctx.fillRect(i, 0, 1, 1);
        }
        try {
          const { data } = ctx.getImageData(0, 0, paletteTokens.length, 1);
          function pixel(index: number): EffectColor {
            const offset = index * 4;
            return data[offset + 3] === 0
              ? paletteTokens[index].fallback
              : [
                  data[offset] / 255,
                  data[offset + 1] / 255,
                  data[offset + 2] / 255,
                ];
          }
          palette = {
            accent: pixel(0),
            background: pixel(1),
            foreground: pixel(2),
            secondary: pixel(3),
          };
        } catch {
          palette = defaultEffectPalette;
        }
      }
    }
  }

  refresh();
  const observer = new MutationObserver(() => {
    refresh();
    onChange?.();
  });
  for (
    let ancestor: HTMLElement | null = stage;
    ancestor;
    ancestor = ancestor.parentElement
  ) {
    observer.observe(ancestor, {
      attributeFilter: ["class", "data-theme", "style"],
    });
  }
  return {
    dispose() {
      observer.disconnect();
      probe.remove();
    },
    get: () => palette,
  };
}

export function canCaptureHtml() {
  // Native capture is deliberately not enabled on Android.
  return (
    !(
      matchMedia(reducedMotion).matches || /Android/i.test(navigator.userAgent)
    ) &&
    "content" in HTMLCanvasElement.prototype &&
    "requestPaint" in HTMLCanvasElement.prototype &&
    typeof CanvasRenderingContext2D !== "undefined" &&
    "drawElementImage" in CanvasRenderingContext2D.prototype
  );
}

export function createHtmlCanvasSource() {
  if (!canCaptureHtml()) {
    return null;
  }
  const canvas: NativeCanvas = document.createElement("canvas");
  if (!("content" in canvas && canvas.requestPaint)) {
    return null;
  }
  canvas.setAttribute("content", "drawable");
  const ctx = canvas.getContext("2d") as NativeContext | null;
  return ctx?.drawElementImage ? { canvas, ctx } : null;
}

export interface HtmlCanvasSurface {
  canvas: HTMLCanvasElement;
  dispose: () => void;
  requestPaint: () => void;
}

/** Mounts the original, interactive DOM temporarily, never a duplicate. */
export function mountHtmlCanvasSurface({
  onFallback,
  onPaint,
  stage,
  surface,
}: {
  onFallback: () => void;
  onPaint: (source: HTMLCanvasElement) => void;
  stage: HTMLElement;
  surface: HTMLElement;
}): HtmlCanvasSurface | null {
  const source = createHtmlCanvasSource();
  if (!(source && stage.clientWidth && surface.offsetHeight)) {
    return null;
  }

  const { canvas, ctx } = source;
  const motion = matchMedia(reducedMotion);
  const previousFocus = surface.contains(document.activeElement)
    ? (document.activeElement as HTMLElement)
    : undefined;

  let ready = false;
  let disposed = false;
  let watchdog = 0;
  const requestPaint = () => canvas.requestPaint?.();

  Object.assign(canvas.style, {
    display: "block",
    height: `${surface.offsetHeight}px`,
    width: "100%",
  });

  function resize() {
    const height = surface.offsetHeight;
    const scale = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.round(stage.clientWidth * scale);
    const h = Math.round(height * scale);
    if (canvas.width !== w) {
      canvas.width = w;
    }
    if (canvas.height !== h) {
      canvas.height = h;
    }
    canvas.style.height = `${height}px`;
    requestPaint();
  }

  const observer = new ResizeObserver(resize);

  function dispose() {
    if (disposed) {
      return;
    }
    disposed = true;
    window.clearTimeout(watchdog);
    observer.disconnect();
    motion.removeEventListener("change", handleMotion);
    canvas.removeEventListener("paint", paint);
    const active = document.activeElement;
    const focused = surface.contains(active)
      ? (active as HTMLElement)
      : undefined;
    const restore =
      focused ?? (active === document.body ? previousFocus : undefined);
    surface.removeAttribute("drawable");
    if (canvas.parentNode === stage) {
      stage.insertBefore(surface, canvas);
      canvas.remove();
    }
    if (restore?.isConnected) {
      restore.focus({ preventScroll: true });
    }
  }

  function fallback() {
    if (!disposed) {
      dispose();
      onFallback();
    }
  }

  function handleMotion() {
    if (motion.matches) {
      fallback();
    }
  }

  function paint() {
    try {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawElementImage?.(surface, 0, 0);
    } catch {
      if (ready) {
        fallback();
      }
      return;
    }
    if (!ready) {
      ready = true;
      window.clearTimeout(watchdog);
      if (document.activeElement === document.body) {
        previousFocus?.focus({ preventScroll: true });
      }
    }
    onPaint(canvas);
  }

  try {
    canvas.addEventListener("paint", paint);
    motion.addEventListener("change", handleMotion);
    stage.insertBefore(canvas, surface);
    surface.setAttribute("drawable", "");
    canvas.append(surface);
    watchdog = window.setTimeout(fallback, 400);
    observer.observe(stage);
    observer.observe(surface);
    resize();
    return { canvas, dispose, requestPaint };
  } catch {
    dispose();
    return null;
  }
}

export function placeCanvasOverlay(
  stage: HTMLElement,
  canvas: HTMLCanvasElement
) {
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    display: "block",
    height: "100%",
    inset: "0",
    pointerEvents: "none",
    position: "absolute",
    width: "100%",
    zIndex: "1",
  });
  stage.append(canvas);
}

export function makeCanvasOverlay(stage: HTMLElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  canvas.dataset.effectRenderer = "2d";
  placeCanvasOverlay(stage, canvas);
  return { canvas, context };
}
