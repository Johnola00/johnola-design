"use client";

import { useEffect, useState } from "react";

export type ViewportMode = "mobile" | "tablet" | "desktop";

function getViewportWidth() {
  if (typeof window === "undefined") return 1440;

  const widths = [
    window.innerWidth,
    document.documentElement.clientWidth,
    window.visualViewport?.width,
  ].filter((width): width is number => Boolean(width && width > 0));

  return widths.length > 0 ? Math.min(...widths) : 1440;
}

function resolveViewportMode(): ViewportMode {
  const width = getViewportWidth();

  if (width <= 700) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
}

export function useViewportMode() {
  const [mode, setMode] = useState<ViewportMode>("desktop");

  useEffect(() => {
    const update = () => setMode(resolveViewportMode());
    update();

    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return mode;
}
