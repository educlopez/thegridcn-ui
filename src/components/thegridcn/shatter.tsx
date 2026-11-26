"use client";

import {
  forwardRef,
  type HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  type GridSound,
  playGridSound,
  prepareGridSound,
} from "@/lib/grid-sounds";
import {
  type CanvasEffectResult,
  canPlayCanvasEffect,
  playCanvasEffect,
} from "./effects/html-in-canvas";

export interface ShatterHandle {
  /** Starts one run; returns false if a run is already in progress. */
  play: () => boolean;
}

export interface ShatterProps extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
  forceDom?: boolean;
  onComplete?: (renderer: CanvasEffectResult) => void;
  /** Supply a cue to respect the global Grid Sounds opt-in. Silent by default. */
  sound?: GridSound | false;
}

/** Wrap a panel; call ref.current.play() from a button or other intentional action. */
// biome-ignore lint/suspicious/noReactForwardRef: registry consumers may use React 18.
export const Shatter = forwardRef<ShatterHandle, ShatterProps>(function Shatter(
  {
    children,
    duration = 1440,
    forceDom = false,
    onComplete,
    sound = false,
    style,
    ...props
  },
  ref
) {
  const stage = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const current = useRef<{ dispose?: () => void } | null>(null);

  useEffect(
    () => () => {
      current.current?.dispose?.();
      current.current = null;
    },
    []
  );

  useImperativeHandle(
    ref,
    () => ({
      play() {
        const stageElement = stage.current;
        const surfaceElement = surface.current;
        if (current.current || !stageElement || !surfaceElement) {
          return false;
        }
        const attempt: { dispose?: () => void } = {};
        current.current = attempt;
        stageElement.dataset.shatter = "playing";
        if (sound) {
          prepareGridSound();
        }

        function finish(renderer: CanvasEffectResult) {
          if (current.current !== attempt || !stageElement) {
            return;
          }
          current.current = null;
          delete stageElement.dataset.canvasEffect;
          stageElement.dataset.shatter = "idle";
          if (sound) {
            playGridSound(sound);
          }
          onComplete?.(renderer);
        }

        // Always return control to the caller before completing the flat path.
        if (forceDom || !canPlayCanvasEffect()) {
          queueMicrotask(() => finish("dom"));
          return true;
        }

        import("./effects/shatter-renderer")
          .then(({ createShatterRenderer }) => {
            if (current.current !== attempt) {
              return;
            }
            attempt.dispose = playCanvasEffect({
              createRenderer: createShatterRenderer,
              duration: Number.isFinite(duration)
                ? Math.min(2600, Math.max(250, duration))
                : 1440,
              onComplete: finish,
              stage: stageElement,
              surface: surfaceElement,
            });
          })
          .catch(() => finish("dom"));
        return true;
      },
    }),
    [duration, forceDom, onComplete, sound]
  );

  return (
    <div
      {...props}
      data-shatter="idle"
      ref={stage}
      style={{ ...style, position: "relative" }}
    >
      <div data-shatter-surface="" ref={surface} style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
});
