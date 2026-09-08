"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

type StackIcon = {
  src: string;
  label: string;
};

type FrontendLinks = {
  live?: string;
  code?: string;
  design?: string;
};

type FrontendImplementationCardProps = {
  title: string;
  year: string;
  description: string;
  imagePath: string;
  imageFit?: "cover" | "contain";
  stackIcons: StackIcon[];
  links?: FrontendLinks;
};

function FrontendAction({
  label,
  href,
  icon,
}: {
  label: string;
  href?: string;
  icon: string;
}) {
  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-label={`${label} is not available yet`}
        title="Link coming soon"
        className="relative z-10 flex h-[24px] w-fit cursor-not-allowed items-center justify-center gap-1.5 whitespace-nowrap rounded border-[0.5px] border-white/35 px-2.5 text-[11.5px] font-normal leading-none text-white/45"
      >
        <span>{label}</span>
        <Image
          src={icon}
          alt=""
          width={14}
          height={14}
          aria-hidden="true"
          className="h-[14px] w-[14px] shrink-0 object-contain opacity-45"
        />
      </button>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative z-10 flex h-[24px] w-fit items-center justify-center gap-1.5 whitespace-nowrap rounded border-[0.5px] border-white px-2.5 text-[11.5px] font-normal leading-none text-white transition-all duration-300 ease-out hover:bg-white hover:text-black"
    >
      <span>{label}</span>
      <Image
        src={icon}
        alt=""
        width={14}
        height={14}
        aria-hidden="true"
        className="h-[14px] w-[14px] shrink-0 object-contain transition-all duration-300 group-hover:invert group-hover:brightness-0"
      />
    </Link>
  );
}

export function FrontendImplementationCard({
  title,
  year,
  description,
  imagePath,
  imageFit = "cover",
  stackIcons,
  links,
}: FrontendImplementationCardProps) {
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

    setIsResetting(false);
    setMousePosition({ x, y });
    setRotation({
      x: -((y / rect.height - 0.5) * 12),
      y: (x / rect.width - 0.5) * 12,
    });
  }

  function handleMouseEnter() {
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    setIsResetting(false);
    setIsImageHovered(true);
  }

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

  const imageClassName =
    imageFit === "contain"
      ? "object-contain transition-transform duration-500 ease-out group-hover:scale-110"
      : "object-cover transition-transform duration-500 ease-out group-hover:scale-110";

  return (
    <div className="relative isolate flex w-[406px] max-w-full flex-col">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative z-0 h-[330px] w-[406px] max-w-full overflow-hidden rounded-[16px] transition-transform ease-out ${
          isResetting ? "duration-500" : "duration-75"
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06) 0px, rgba(56,189,248,0.04) 120px, transparent 360px)`,
            opacity: isImageHovered ? 1 : 0,
          }}
        />

        <Image
          src={imagePath}
          alt={`${title} project preview`}
          fill
          sizes="406px"
          quality={100}
          unoptimized
          className={imageClassName}
        />

        <div
          className="absolute left-4 top-4 z-10 flex items-center"
          style={{ gap: 10 }}
          aria-label="Technology stack"
        >
          {stackIcons.map((stack) => (
            <Image
              key={stack.label}
              src={stack.src}
              alt={stack.label}
              width={16}
              height={16}
              className="h-4 w-4 shrink-0 object-contain"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-[12px] flex w-full items-start justify-between gap-4">
        <h3 className="min-w-0 text-[18px] font-normal leading-[1.2] text-white">
          {title}
        </h3>
        <span className="shrink-0 pt-[2px] text-[15px] font-normal leading-none text-[#AAAAAA]">
          {year}
        </span>
      </div>

      <p className="relative z-10 mt-[12px] line-clamp-3 min-h-[61px] text-[15px] font-normal leading-[1.35] text-white/70">
        {description}
      </p>

      <div className="relative z-10 mt-[12px] flex flex-wrap items-center gap-2">
        <FrontendAction
          label="View Live Demo"
          href={links?.live}
          icon="/icons/Right%20Arrow.svg"
        />
        <FrontendAction
          label="View Code"
          href={links?.code}
          icon="/icons/github.svg"
        />
        <FrontendAction
          label="View Design"
          href={links?.design}
          icon="/icons/figma.svg"
        />
      </div>
    </div>
  );
}
