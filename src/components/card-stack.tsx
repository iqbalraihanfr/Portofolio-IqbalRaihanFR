"use client";
import * as React from "react";
import { motion } from "framer-motion";

// =======================
// Types
// =======================
export type PhotoItem = {
  id: string;
  src: string;
  alt?: string;
};

export interface PhotoCardStackProps {
  photos: PhotoItem[];
  className?: string; // container wrapper
  /** How many layers to render (perf) */
  visibleCount?: number; // default 4
  /** Frame dimensions via Tailwind (width/height/aspect). Keep stack consistent. */
  frameClassName?: string; // default: "w-full max-w-xl aspect-[16/9]"
  /** Fit behavior for mixed aspect ratios: "contain" (no crop) | "cover" (edge crop) */
  fit?: "contain" | "cover"; // default: contain (no gepeng)
  /** Auto-advance front card to back */
  autoAdvance?: boolean; // default false
  /** Interval in ms for auto-advance */
  intervalMs?: number; // default 2800
  /** Callback when front card changes */
  onIndexChange?: (frontIndex: number, frontId: string) => void;
}

// =======================
// Utils
// =======================
function cx(...a: Array<string | false | undefined | null>) {
  return a.filter(Boolean).join(" ");
}

const shadowFor = (depth: number) => `0 ${2 + depth}px ${10 + depth * 3}px rgba(0,0,0,0.22)`;

// =======================
// Component
// =======================
export function PhotoCardStack({
  photos,
  className,
  visibleCount = 4,
  frameClassName = "w-full max-w-xl aspect-[16/9]",
  fit = "contain",
  autoAdvance = false,
  intervalMs = 2800,
  onIndexChange,
}: PhotoCardStackProps) {
  const [order, setOrder] = React.useState<string[]>(() => photos.map((p) => p.id));
  const [leavingId, setLeavingId] = React.useState<string | null>(null);
  const byId = React.useMemo(() => new Map(photos.map((p) => [p.id, p])), [photos]);

  // sync when photos change
  React.useEffect(() => {
    const ids = photos.map((p) => p.id);
    setOrder((prev) => {
      const filtered = prev.filter((id) => ids.includes(id));
      const missing = ids.filter((id) => !filtered.includes(id));
      return filtered.concat(missing);
    });
  }, [photos]);

  const advance = React.useCallback(() => {
    if (leavingId) return;
    if (!order.length) return;
    setLeavingId(order[0]);
  }, [order, leavingId]);

  // auto advance
  React.useEffect(() => {
    if (!autoAdvance || order.length <= 1) return;
    const t = setInterval(() => advance(), intervalMs);
    return () => clearInterval(t);
  }, [autoAdvance, intervalMs, order, advance]);

  // keyboard (Space / →)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowRight") {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const onExitComplete = React.useCallback(
    (id: string) => {
      setOrder((prev) => {
        if (prev[0] !== id) return prev; // stale
        const next = [...prev.slice(1), id];
        const frontId = next[0];
        const idx = photos.findIndex((p) => p.id === frontId);
        onIndexChange?.(idx, frontId);
        return next;
      });
      setLeavingId(null);
    },
    [photos, onIndexChange]
  );

  const layers = order.slice(0, Math.min(visibleCount, order.length));

  return (
    <div className={cx("relative mx-auto select-none", className)} aria-label="Photo card stack" role="region">
      <div
        className={cx(
          "relative overflow-visible [perspective:1200px]",
          "rounded-xl",
          frameClassName
        )}
      >
        {layers
          .slice()
          .reverse()
          .map((id, idxFromBack) => {
            const depth = layers.length - 1 - idxFromBack; // 0 back .. N-1 front
            const photo = byId.get(id);
            if (!photo) return null;
            const isFront = depth === layers.length - 1;
            const isLeaving = leavingId === id;

            // Layout parameters for depth
            const y = depth * 14; // px downward
            const s = 1 - depth * 0.04; // scale
            const r = depth * -2; // rotateZ

            return (
              <motion.button
                key={id}
                type="button"
                layout
                initial={false}
                animate={
                  isLeaving
                    ? { x: 280, rotateZ: 16, opacity: 0 }
                    : { x: 0, y, scale: s, rotateZ: r, opacity: 1 }
                }
                transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.7 }}
                onAnimationComplete={() => isLeaving && onExitComplete(id)}
                className={cx(
                  "absolute inset-0 origin-center will-change-transform",
                  "rounded-xl overflow-hidden border border-white/8 shadow-xl",
                  isFront ? "cursor-pointer" : "pointer-events-none"
                )}
                style={{ zIndex: 100 + depth, boxShadow: shadowFor(depth), transformStyle: "preserve-3d" }}
                aria-label={isFront ? "Next photo" : undefined}
                onClick={() => isFront && advance()}
              >
                {/* Image frame keeps size consistent; object-fit avoids distorting */}
                <div className="absolute inset-0 bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={photo.alt ?? "photo"}
                    loading="lazy"
                    className={cx(
                      "h-full w-full",
                      fit === "contain" ? "object-contain" : "object-cover"
                    )}
                    draggable={false}
                  />
                </div>
              </motion.button>
            );
          })}

        {/* Subtle fake drop shadow below stack */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 h-2 w-40 -translate-x-1/2 rounded-full bg-black/50 blur-2xl opacity-50" />
      </div>
    </div>
  );
}

// =======================
// Minimal demo for preview in canvas (optional default export)
// Replace with your images in-app.
// =======================
const demo: PhotoItem[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", alt: "stage" },
  { id: "2", src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", alt: "crowd" },
  { id: "3", src: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1200&auto=format&fit=crop", alt: "award" },
  { id: "4", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop", alt: "mic" },
];

export default function DemoPhotoCardStack() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center bg-neutral-950 p-6">
      <PhotoCardStack photos={demo} fit="contain" />
    </div>
  );
}

/*
Usage in your app:

import { PhotoCardStack } from "./PhotoCardStack";

const pics = [
  { id: "a", src: "/me-competition.jpg", alt: "Me at competition" },
  { id: "b", src: "/me-hosting.jpg", alt: "MC moment" },
  { id: "c", src: "/me-stage.jpg" },
];

<PhotoCardStack
  photos={pics}
  frameClassName="w-full max-w-2xl aspect-[16/9]" // keep stack size
  fit="contain" // or "cover" for edge-to-edge with crop
  visibleCount={4}
  autoAdvance={false}
/>;
*/
