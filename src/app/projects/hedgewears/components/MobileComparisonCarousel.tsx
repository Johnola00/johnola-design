"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";

export type ComparisonItem = {
  gap: string;
  improvement: string;
  impact: string;
};

type MobileComparisonCarouselProps = {
  items: readonly ComparisonItem[];
};

type Direction = "next" | "previous";
type TransitionPhase = "idle" | "exit" | "enter";

const EXIT_DURATION = 140;
const ENTER_DURATION = 220;
const SWIPE_THRESHOLD = 44;

export function MobileComparisonCarousel({
  items,
}: MobileComparisonCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("next");
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastIndex = items.length - 1;
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < lastIndex;
  const activeItem = items[activeIndex];

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      if (enterTimer.current) clearTimeout(enterTimer.current);
      if (finishTimer.current) clearTimeout(finishTimer.current);
    };
  }, []);

  if (!activeItem) {
    return null;
  }

  const moveTo = (nextIndex: number, nextDirection: Direction) => {
    if (
      isTransitioning ||
      nextIndex < 0 ||
      nextIndex > lastIndex ||
      nextIndex === activeIndex
    ) {
      return;
    }

    setDirection(nextDirection);
    setIsTransitioning(true);
    setPhase("exit");

    exitTimer.current = setTimeout(() => {
      setActiveIndex(nextIndex);
      setPhase("enter");

      // Give the incoming content a rendered starting position before
      // transitioning it into place.
      enterTimer.current = setTimeout(() => {
        setPhase("idle");

        finishTimer.current = setTimeout(() => {
          setIsTransitioning(false);
        }, ENTER_DURATION);
      }, 24);
    }, EXIT_DURATION);
  };

  const goPrevious = () => {
    if (canGoPrevious) {
      moveTo(activeIndex - 1, "previous");
    }
  };

  const goNext = () => {
    if (canGoNext) {
      moveTo(activeIndex + 1, "next");
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null || isTransitioning) {
      setTouchStartX(null);
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - endX;

    if (Math.abs(distance) >= SWIPE_THRESHOLD) {
      if (distance > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }

    setTouchStartX(null);
  };

  const contentMotionClass = (() => {
    if (phase === "exit") {
      return direction === "next"
        ? "-translate-x-3 opacity-0"
        : "translate-x-3 opacity-0";
    }

    if (phase === "enter") {
      return direction === "next"
        ? "translate-x-3 opacity-0"
        : "-translate-x-3 opacity-0";
    }

    return "translate-x-0 opacity-100";
  })();

  return (
    <article
      className="overflow-hidden rounded-[20px] border border-white/20 bg-[#202020]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <header className="flex min-h-[58px] items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
        <span className="font-inter text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-white/50">
          Comparison {String(activeIndex + 1).padStart(2, "0")}
        </span>

        <div className="flex shrink-0 items-center gap-[14px]">
          <button
            type="button"
            onClick={goPrevious}
            disabled={!canGoPrevious || isTransitioning}
            aria-label="Previous comparison"
            className={`flex h-6 w-6 items-center justify-center transition-opacity duration-200 ${
              canGoPrevious && !isTransitioning
                ? "cursor-pointer opacity-100"
                : "cursor-default opacity-25"
            }`}
          >
            <Image
              src="/icons/viewer-arrow-left.svg"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px]"
            />
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext || isTransitioning}
            aria-label="Next comparison"
            className={`flex h-6 w-6 items-center justify-center transition-opacity duration-200 ${
              canGoNext && !isTransitioning
                ? "cursor-pointer opacity-100"
                : "cursor-default opacity-25"
            }`}
          >
            <Image
              src="/icons/viewer-arrow-right.svg"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px]"
            />
          </button>
        </div>
      </header>

      <div
        aria-live="polite"
        className={`px-5 py-5 transition-[transform,opacity] ease-out ${
          phase === "exit"
            ? "duration-[140ms]"
            : "duration-[220ms]"
        } ${contentMotionClass}`}
      >
        <div>
          <h3 className="font-inter text-[15px] font-semibold leading-[1.3] text-white">
            Design Gap
          </h3>
          <p className="mt-[8px] font-inter text-[15px] font-normal leading-[1.42] text-white/75">
            {activeItem.gap}
          </p>
        </div>

        <div className="mt-[22px]">
          <h3 className="font-inter text-[15px] font-semibold leading-[1.3] text-white">
            My Improvement
          </h3>
          <p className="mt-[8px] font-inter text-[15px] font-normal leading-[1.42] text-white/75">
            {activeItem.improvement}
          </p>
        </div>

        <div className="mt-[22px]">
          <h3 className="font-inter text-[15px] font-semibold leading-[1.3] text-white">
            Impact on Experience
          </h3>
          <p className="mt-[8px] font-inter text-[15px] font-normal leading-[1.42] text-white/75">
            {activeItem.impact}
          </p>
        </div>
      </div>
    </article>
  );
}