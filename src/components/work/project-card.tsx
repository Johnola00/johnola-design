"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

type ProjectCardProps = {
  title: string;
  year: string;
  tag: string;
  description: string;
  imagePath: string;
  imageFit?: "cover" | "contain";
  href?: string;
};

export function ProjectCard({
  title,
  year,
  tag,
  description,
  imagePath,
  imageFit = "cover",
  href,
}: ProjectCardProps) {
  const isExternalLink = href?.startsWith("http") ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const resetCard = () => {
      setRotation({ x: 0, y: 0 });
      setIsImageHovered(false);
      setIsResetting(true);
    };

    window.addEventListener("blur", resetCard);
    return () => {
      window.removeEventListener("blur", resetCard);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = -((y / rect.height - 0.5) * 12);
    const rotateY = (x / rect.width - 0.5) * 12;

    setIsResetting(false);
    setMousePosition({ x, y });
    setRotation({ x: rotateX, y: rotateY });
  }

  function handleMouseEnter() {
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    setIsResetting(false);
    setIsImageHovered(true);
  }

  const imageClassName =
    imageFit === "contain"
      ? "object-fill transition-transform duration-500 ease-out group-hover:scale-110"
      : "object-cover transition-transform duration-500 ease-out group-hover:scale-110";

  function handleMouseLeave() {
    setRotation({ x: 0, y: 0 });
    setIsImageHovered(false);
    setIsResetting(true);

    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => {
      setIsResetting(false);
      resetTimeoutRef.current = null;
    }, 500);
  }

  return (
    // FIX 1: `isolate` creates a self-contained stacking context so this card's
    // internal z-indexes (z-0, z-10, z-50) never compete with elements outside
    // the card Ã¢â‚¬â€ like your tab labels. Without this, the child `z-10` image
    // container silently promoted the whole card into a page-level stacking
    // context that physically overlapped adjacent elements.
    <div className="isolate flex w-[406px] max-w-full flex-col relative">

      {/* FIX 2: Dropped from z-10 to z-0. Inside an `isolate` boundary, z-0
          is the correct base layer. z-10 here was the original source of the
          bleed Ã¢â‚¬â€ it was winning against un-indexed siblings on the page. */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative h-[330px] w-[406px] max-w-full overflow-hidden rounded-[16px] transition-transform ease-out z-0 ${
          isResetting ? "duration-500" : "duration-75"
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* MAGNETIC SPOTLIGHT GLARE */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06) 0px, rgba(56,189,248,0.04) 120px, transparent 360px)`,
            opacity: isImageHovered ? 1 : 0,
          }}
        />

        {/* PROJECT IMAGE */}
        <Image
          src={imagePath}
          alt={`${title} project preview`}
          fill
          sizes="406px"
          quality={75}
          unoptimized={imagePath.endsWith(".webp")}
          className={imageClassName}
        />

        {/* TOP LEFT TAG */}
        <span className="absolute top-4 left-4 z-10 flex h-[26px] min-w-[52px] w-fit items-center justify-center rounded-[8px] bg-[#38BDF8] px-3 font-[family-name:var(--font-pt-sans-caption)] text-[11px] leading-none font-bold text-white">
          {tag}
        </span>
      </div>

      {/* FIX 3: Text content layer sits at z-10 *inside* the isolate boundary,
          so it correctly paints above the z-0 image container but remains
          invisible to the page-level stacking order outside the card. */}
      <div className="mt-[12px] flex w-full flex-row items-center justify-between relative z-10">
        <h3 className="text-[18px] leading-none font-normal text-white">
          {title}
        </h3>
        <span className="text-[15px] leading-none font-normal text-[#AAAAAA]">
          {year}
        </span>
      </div>

      <p className="mt-[12px] line-clamp-3 min-h-[61px] text-[15px] leading-[1.35] font-normal text-white/70 relative z-10">
        {description}
      </p>

      {/* FIX 4: Link stays at z-10 (was z-50, which was punching out of the
          card's local context and becoming a page-level shield). It still
          renders above the image container (z-0) correctly. The hover styles
          are unchanged and will now work because nothing is intercepting
          pointer events from outside the card boundary. */}
      {href ? (
        <Link
          href={href}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noreferrer" : undefined}
          className="group relative z-10 pointer-events-auto mt-[12px] flex h-[24px] w-fit cursor-pointer flex-row items-center justify-between gap-2 whitespace-nowrap rounded border-[0.5px] border-white px-3 text-[13.3px] leading-none font-normal text-white transition-all duration-300 ease-out hover:bg-white hover:text-black"
        >
          <span>View Project</span>
          <Image
            src="/icons/Right%20Arrow.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
            className="shrink-0 transition-all duration-300 group-hover:invert group-hover:brightness-0"
          />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          aria-label={`${title} project page is not available yet`}
          title="Project page coming soon"
          className="relative z-10 mt-[12px] flex h-[24px] w-fit cursor-not-allowed flex-row items-center justify-between gap-2 whitespace-nowrap rounded border-[0.5px] border-white/35 px-3 text-[13.3px] leading-none font-normal text-white/45"
        >
          <span>View Project</span>
          <svg
            aria-hidden="true"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 10V7.5C8 5.57 9.57 4 11.5 4H12.5C14.43 4 16 5.57 16 7.5V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}




