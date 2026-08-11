"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useViewportMode } from "@/hooks/use-viewport-mode";

const orbitLabels = [
  "Business Research",
  "Design Review",
  "User Research",
  "User Journey",
  "Informaton Architecture",
  "Accesibility & Inclusive Design",
  "Usability & A/B Testing",
  "Client Alignment",
  "Design Handover & QA",
  "Frontend Implementation",
];

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
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

function Orbit({ mobile = false }: { mobile?: boolean }) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [mobileWidth, setMobileWidth] = useState(351);

  useEffect(() => {
    if (!mobile) return;

    const element = orbitRef.current;
    if (!element) return;

    const updateWidth = () => {
      setMobileWidth(Math.min(element.getBoundingClientRect().width || 351, 351));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);

    return () => observer.disconnect();
  }, [mobile]);

  const mobilePillWidth = 94;
  const mobileRadius = Math.max(
    84,
    Math.min(121, (mobileWidth - mobilePillWidth) / 2 - 4),
  );
  const mobileRingSize = Math.max(190, Math.min(242, mobileRadius * 2));
  const mobileBorderWidth = Math.max(18, Math.min(22, mobileRingSize * 0.09));
  const radius = mobile ? `-${mobileRadius}px` : "-150px";
  const wrapperStyle: CSSProperties | undefined = mobile
    ? {
        width: "100%",
        maxWidth: 351,
        height: 288,
        marginTop: 36,
        alignSelf: "center",
        overflow: "visible",
        zIndex: 0,
      }
    : undefined;
  const ringStyle: CSSProperties | undefined = mobile
    ? { width: mobileRingSize, height: mobileRingSize, borderWidth: mobileBorderWidth }
    : undefined;
  const pillShellStyle: CSSProperties | undefined = mobile
    ? { width: mobilePillWidth, height: 31 }
    : undefined;
  const pillStyle: CSSProperties | undefined = mobile
    ? {
        width: mobilePillWidth,
        height: 31,
        fontSize: 8,
        lineHeight: "9px",
        paddingLeft: 5,
        paddingRight: 5,
      }
    : undefined;

  return (
    <div
      ref={orbitRef}
      className="relative flex h-[400px] w-[400px] flex-shrink-0 items-center justify-center"
      style={wrapperStyle}
      aria-label="Product design and frontend development process"
    >
      <div
        className="animate-orbit relative h-[300px] w-[300px] rounded-full border-[25px] border-[#ABABAB]/25"
        style={ringStyle}
      >
        {orbitLabels.map((label, index) => (
          <div
            key={label}
            className="orbit-pill-position absolute left-1/2 top-1/2 h-0 w-0"
            style={
              {
                "--orbit-angle": `${index * 36}deg`,
                "--orbit-radius": radius,
              } as React.CSSProperties
            }
          >
            <div className="animate-counter-orbit h-[35px] w-[101px]" style={pillShellStyle}>
              <div
                className="flex h-[35px] w-[101px] items-center justify-center rounded-[8px] border border-white/10 bg-[#38BDF8]/24 px-[6px] text-center font-[family-name:var(--font-pt-sans-caption)] text-[10px] leading-[12px] font-bold text-[#F7F0DF] backdrop-blur-md"
                style={pillStyle}
              >
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

function HeroButtons({ mobile = false }: { mobile?: boolean }) {
  const buttonStyle: CSSProperties | undefined = mobile ? { width: "100%", height: 48, minWidth: 0, paddingLeft: 0, paddingRight: 0 } : undefined;

  return (
    <div
      className="flex flex-row"
      style={mobile ? { marginTop: 28, gap: 16, width: "100%", maxWidth: 430, display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)" } : { marginTop: 32, gap: 12 }}
    >
      <a
        href="mailto:Johnola21091@gmail.com"
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        style={{ ...tiltButtonStyle, ...buttonStyle }}
        className="flex h-[48px] w-[133px] items-center justify-center gap-[8px] rounded-[8px] bg-[#38BDF8] text-[13px] leading-none font-semibold text-white transition-[opacity,transform] duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:opacity-90 active:scale-95"
      >
        <MailIcon />
        Meet John
      </a>

      <Link
        href="/john-oduntan-resume.pdf"
        download
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        style={{ ...tiltButtonStyle, ...buttonStyle, paddingLeft: mobile ? 0 : 20, paddingRight: mobile ? 0 : 20 }}
        className="flex h-[48px] items-center justify-center rounded-[8px] bg-[#272727] text-[13px] leading-none font-semibold text-white transition-[background-color,transform] duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:bg-neutral-800 active:scale-95"
      >
        Download Resume
      </Link>
    </div>
  );
}

function TabletHero() {
  return (
    <section className="mx-auto w-full max-w-[1024px] px-8 pb-16 pt-12">
      <div className="mx-auto w-full max-w-[864px]">
        <div className="flex flex-row items-center gap-4">
          <Image
            src="/brand/Johnola.jpg"
            alt="Portrait of John Oduntan"
            width={72}
            height={72}
            priority
            className="h-[72px] w-[72px] shrink-0 rounded-[10px] object-cover"
          />

          <div className="flex min-w-0 flex-col">
            <p className="text-[17px] leading-none font-medium text-white">
              John Oduntan
            </p>
            <p className="mt-[6px] whitespace-nowrap text-[12px] leading-none font-medium text-[#B9B9B9]">
              Product Designer · Design Engineer
            </p>
            <p className="mt-[6px] whitespace-nowrap text-[11px] leading-none font-normal text-[#ABABAB]">
              Designer by profession. Builder by curiosity
            </p>
            <p className="mt-[7px] text-[10px] leading-none font-normal text-[#B9B9B9]">
              Lagos, Nigeria
            </p>
          </div>
        </div>

        <h1 className="mt-7 max-w-[700px] text-[32px] font-semibold leading-[1.18] tracking-[-0.02em] text-white">
          I help startups and businesses design clear, usable web and mobile
          products, and use AI to turn early ideas from concept to working
          digital products.
        </h1>

        <p className="mt-4 max-w-[560px] text-[14px] font-normal leading-[1.55] text-white/60">
          Product Designer and Design Engineer focused on turning complex
          product problems into clear, usable experiences.
        </p>

        <HeroButtons />
      </div>
    </section>
  );
}

export function Hero() {
  const viewportMode = useViewportMode();

  if (viewportMode === "mobile") {
    return (
      <section style={{ width: "100%", padding: "40px 20px 32px", overflow: "hidden", boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: 620, margin: "0 auto", boxSizing: "border-box" }}>
          <div className="flex w-full flex-row items-center overflow-hidden" style={{ height: 73, gap: 12 }}>
            <Image
              src="/brand/Johnola.jpg"
              alt="Portrait of John Oduntan"
              width={73}
              height={73}
              priority
              style={{ width: 73, height: 73, borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
            />

            <div className="flex min-w-0 flex-1 flex-col">
              <h1 className="text-white" style={{ fontSize: 14, fontWeight: 500, lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                John Oduntan
              </h1>
              <p className="text-white/90" style={{ marginTop: 8, fontSize: 12, fontWeight: 400, lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Product Designer · Design Engineer
              </p>
              <p className="text-[#AAAAAA]" style={{ marginTop: 12, fontSize: 10, fontStyle: "italic", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Designer by profession. Builder by curiosity
              </p>
              <p className="text-[#AAAAAA]" style={{ marginTop: 8, fontSize: 9, lineHeight: 1 }}>
                Lagos, Nigeria
              </p>
            </div>
          </div>

          <h2 className="text-white" style={{ marginTop: 40, width: "100%", maxWidth: 520, fontSize: 20, fontWeight: 600, lineHeight: "24px" }}>
            I help startups and businesses design clear, usable web and mobile
            products, and use AI to turn early ideas from concept to working
            digital products.
          </h2>

          <HeroButtons mobile />
        </div>
      </section>
    );
  }

  if (viewportMode === "tablet") {
    return <TabletHero />;
  }

  return (
    <section className="mx-auto mt-4 w-full max-w-[1440px] px-[80px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-row items-center justify-between">
        <div className="flex w-full max-w-[600px] flex-col">
          <div className="flex h-[106px] flex-row items-center gap-[16px]">
            <Image
              src="/brand/Johnola.jpg"
              alt="Portrait of John Oduntan"
              width={106}
              height={106}
              priority
              className="h-[106px] w-[106px] rounded-[16px] object-cover"
            />

            <div className="flex flex-col">
              <h1 className="text-[22px] leading-none font-medium text-white">
                John Oduntan
              </h1>
              <p className="mt-[7px] text-[15px] leading-none font-medium text-[#B9B9B9]">
                Product Designer · Design Engineer
              </p>
              <p className="mt-[7px] text-[14px] leading-none font-normal text-[#ABABAB]">
                Designer by profession. Builder by curiosity
              </p>
              <p className="mt-[8.8px] text-[12.8px] leading-none font-normal text-[#B9B9B9]">
                Lagos, Nigeria
              </p>
            </div>
          </div>

          <h2 className="mt-[22px] max-w-xl text-[26.4px] leading-[1.32] font-semibold text-white">
            I help startups and businesses design clear, usable web and mobile products, and use AI to turn early ideas from concept to working digital products
          </h2>

          <HeroButtons />
        </div>

        <Orbit />
      </div>
    </section>
  );
}




