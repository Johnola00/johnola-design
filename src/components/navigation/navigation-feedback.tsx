"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 260;
const FINISH_MS = 180;

function isInternalNavigation(anchor: HTMLAnchorElement) {
  const rawHref = anchor.getAttribute("href");

  if (
    !rawHref ||
    rawHref.startsWith("#") ||
    anchor.target === "_blank" ||
    anchor.hasAttribute("download")
  ) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);

  if (url.origin !== window.location.origin) {
    return false;
  }

  const current = new URL(window.location.href);

  if (
    url.pathname === current.pathname &&
    url.search === current.search &&
    url.hash
  ) {
    return false;
  }

  return (
    url.pathname !== current.pathname ||
    url.search !== current.search
  );
}

export function NavigationFeedback() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const startedAt = useRef(0);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest("a");

      if (!(anchor instanceof HTMLAnchorElement) || !isInternalNavigation(anchor)) {
        return;
      }

      if (finishTimer.current) clearTimeout(finishTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);

      startedAt.current = performance.now();
      setVisible(true);
      setProgress(10);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setProgress(72);
        });
      });
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const elapsed = performance.now() - startedAt.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    finishTimer.current = setTimeout(() => {
      setProgress(100);

      hideTimer.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, FINISH_MS);
    }, remaining);

    return () => {
      if (finishTimer.current) clearTimeout(finishTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [pathname, searchParams, visible]);

  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[9998] bg-black transition-opacity duration-200 ${
          visible ? "opacity-[0.08]" : "opacity-0"
        }`}
      />

      <div
        role="progressbar"
        aria-label="Loading page"
        aria-hidden={!visible}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-[3px] bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.55)] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: `${progress}%`,
          transition:
            progress === 100
              ? "width 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease"
              : "width 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 120ms ease",
        }}
      />
    </>
  );
}
