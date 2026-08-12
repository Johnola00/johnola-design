"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import { useViewportMode } from "@/hooks/use-viewport-mode";

const aboutParagraphs = [
  "I’ve always been the kind of person who asks why something works the way it does and whether there’s a better way to do it. That curiosity is a big part of how I found design. I liked the idea that I could take something confusing, think through it properly, and turn it into something people could actually use.",
  "Over time, that curiosity has gone beyond just designing screens. I enjoy learning how products are built, understanding the thinking behind them, and sometimes experimenting with my own ideas. I’d like to build products of my own someday, so I’m constantly learning from the things I work on and the people I work with.",
  "Outside work, I’m naturally more reserved and I enjoy having time to myself. I run, experiment with cooking, watch documentaries, read when I can, and play video games from time to time. I’m still figuring things out, but I like being in that process of learning, trying things, and getting a little better as I go.",
];

const tiltButtonStyle = {
  "--tilt-x": "0deg",
  "--tilt-y": "0deg",
} as CSSProperties;


function handleTilt(event: MouseEvent<HTMLElement>) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
  const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 12;

  button.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
  button.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
}

function resetTilt(event: MouseEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

function MailIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 7L12 12.2L19 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StaticPortrait({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden bg-[#4A4A4A]"
      style={
        mobile
          ? { width: 116, height: 149, borderRadius: 4 }
          : { width: "100%", height: "100%", borderRadius: 16 }
      }
    >
      <Image
        src="/brand/Johnola.jpg"
        alt="John Oduntan portrait"
        fill
        sizes={mobile ? "116px" : "(max-width: 1024px) 100vw, 402px"}
        priority
        className="object-cover"
      />
    </div>
  );
}

function MobileAboutMe() {
  return (
    <section
      id="about"
      aria-labelledby="about-me-title"
      className="mx-auto mt-[48px] flex w-full flex-col"
      style={{ width: "100%", maxWidth: 640, paddingLeft: 20, paddingRight: 20, boxSizing: "border-box" }}
    >
      <div className="flex flex-col items-start gap-[12px]">
        <h2
          id="about-me-title"
          className="text-[19px] leading-none font-semibold text-white"
        >
          About Me
        </h2>
        <p className="text-[13px] leading-none font-medium text-white/70">
          Here&apos;s a little bit more about me
        </p>
      </div>

      <div style={{ marginTop: 16 }}>
        <StaticPortrait mobile />
      </div>

      <h3 className="mt-[12px] text-[20px] leading-[24px] font-semibold text-white">
        I’m curious by nature. I like figuring things out, building things,
        and seeing how far an idea can go
      </h3>

      <div className="mt-[16px] flex flex-col gap-[16px] text-[11px] leading-[16px] font-normal text-white/80">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-[36px] flex flex-row items-center gap-[10px]">
        <a
          href="mailto:Johnola21091@gmail.com"
          onMouseMove={handleTilt}
          onMouseEnter={resetTilt}
          onMouseLeave={resetTilt}
          style={{ ...tiltButtonStyle, width: 111, height: 40 }}
          className="flex items-center justify-center gap-[6px] rounded-[8px] bg-[#38BDF8] text-[11px] leading-none font-semibold text-white transition-[opacity,transform] duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:opacity-90 active:scale-95"
        >
          <MailIcon size={18} />
          Meet John
        </a>

        <Link
          href="/john-oduntan-resume.pdf"
          download
          onMouseMove={handleTilt}
          onMouseEnter={resetTilt}
          onMouseLeave={resetTilt}
          style={{ ...tiltButtonStyle, width: 132, height: 40 }}
          className="flex items-center justify-center rounded-[8px] bg-[#272727] text-[11px] leading-none font-semibold text-white transition-[background-color,transform] duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:bg-neutral-800 active:scale-95"
        >
          Download Resume
        </Link>
      </div>
    </section>
  );
}

function TabletAboutMe() {
  return (
    <section
      id="about"
      aria-labelledby="about-me-title"
      className="mx-auto mt-24 w-full max-w-[1024px] px-12"
    >
      <div className="mx-auto w-full max-w-[864px]">
        <div className="flex flex-col items-start gap-3">
          <h2
            id="about-me-title"
            className="text-[19px] font-semibold leading-none text-white"
          >
            About Me
          </h2>
          <p className="text-[13px] font-medium leading-none text-white/70">
            Here&apos;s a little bit more about me
          </p>
        </div>

        <div className="mt-8 h-[210px] w-[164px] overflow-hidden rounded-[10px] bg-[#4A4A4A]">
          <StaticPortrait />
        </div>

        <h3 className="mt-8 max-w-[800px] text-[30px] font-semibold leading-[1.24] tracking-[-0.02em] text-white">
          I’m curious by nature. I like figuring things out, building things,
          and seeing how far an idea can go
        </h3>

        <div className="mt-5 max-w-[820px] space-y-5 text-[14px] font-normal leading-[1.72] text-white/70">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="mailto:Johnola21091@gmail.com"
            onMouseMove={handleTilt}
            onMouseEnter={resetTilt}
            onMouseLeave={resetTilt}
            style={tiltButtonStyle}
            className="flex h-[46px] w-[128px] items-center justify-center gap-2 rounded-[8px] bg-[#38BDF8] text-[12px] font-semibold leading-none text-white transition-[opacity,transform] duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:opacity-90 active:scale-95"
          >
            <MailIcon size={20} />
            Meet John
          </a>

          <Link
            href="/john-oduntan-resume.pdf"
            download
            onMouseMove={handleTilt}
            onMouseEnter={resetTilt}
            onMouseLeave={resetTilt}
            style={tiltButtonStyle}
            className="flex h-[46px] items-center justify-center rounded-[8px] bg-[#272727] px-5 text-[12px] font-semibold leading-none text-white transition-[background-color,transform] duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:bg-neutral-800 active:scale-95"
          >
            Download Resume
          </Link>
        </div>
      </div>
    </section>
  );
}

function DesktopAboutMe() {
  return (
    <section
      id="about"
      aria-labelledby="about-me-title"
      className="mt-[100px] flex w-full flex-col px-[80px]"
    >
      <div className="mb-[40px] flex w-full max-w-[1262px] mx-auto flex-col items-start gap-[12px]">
        <h2
          id="about-me-title"
          className="text-[19px] leading-none font-semibold text-white"
        >
          About Me
        </h2>
        <p className="text-[13px] leading-none font-medium text-white/70">
          Here&apos;s a little bit more about me
        </p>
      </div>

      <div className="flex flex-row gap-[40px] items-start justify-center w-full max-w-[1262px] mx-auto">
        <div
          className="relative shrink-0 self-stretch overflow-hidden rounded-[16px] bg-[#4A4A4A]"
          style={{ width: 402, height: "auto" }}
        >
          <StaticPortrait />
        </div>

        <div className="flex flex-col justify-between flex-1 py-2">
          <div>
            <h3 className="text-[26px] leading-[33.6px] font-semibold text-white">
              I’m curious by nature. I like figuring things out, building
              things, and seeing how far an idea can go
            </h3>

            <div className="mt-[16px] flex flex-col gap-4 text-[13px] leading-[24px] font-normal text-white/70">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-[36px] flex flex-row items-center gap-4">
            <a
              href="mailto:Johnola21091@gmail.com"
              onMouseMove={handleTilt}
              onMouseEnter={resetTilt}
              onMouseLeave={resetTilt}
              style={tiltButtonStyle}
              className="flex h-[48px] w-[133px] items-center justify-center gap-[8px] rounded-[8px] bg-[#38BDF8] text-[13px] leading-none font-semibold text-white transition-[opacity,transform] duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:opacity-90 active:scale-95"
            >
              <MailIcon />
              Meet John
            </a>

            <Link
              href="/john-oduntan-resume.pdf"
              download
              onMouseMove={handleTilt}
              onMouseEnter={resetTilt}
              onMouseLeave={resetTilt}
              style={tiltButtonStyle}
              className="flex h-[48px] items-center justify-center rounded-[8px] bg-[#272727] px-[20px] text-[13px] leading-none font-semibold text-white transition-[background-color,transform] duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:bg-neutral-800 active:scale-95"
            >
              Download Resume
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutMe() {
  const viewportMode = useViewportMode();

  if (viewportMode === "mobile") return <MobileAboutMe />;
  if (viewportMode === "tablet") return <TabletAboutMe />;
  return <DesktopAboutMe />;
}







