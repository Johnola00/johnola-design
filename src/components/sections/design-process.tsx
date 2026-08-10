"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const processSteps = [
  {
    title: "Understand",
    description:
      "Identifying your business goals and user needs to define the exact problem we are solving.",
  },
  {
    title: "Plan",
    description:
      "Mapping out the information architecture and user journeys for clear, straightforward navigation.",
  },
  {
    title: "Design",
    description:
      "Crafting high-fidelity, pixel-perfect interfaces with a strict focus on accessibility and aesthetics.",
  },
  {
    title: "Test",
    description:
      "Validating interactions with real users and securing final alignment before writing any code.",
  },
  {
    title: "Build",
    description:
      "Converting approved designs into fully functional, production-ready frontend code.",
  },
];

function isMobileViewport() {
  if (typeof window === "undefined") return false;

  const widths = [
    window.innerWidth,
    document.documentElement.clientWidth,
    window.visualViewport?.width,
  ].filter((width): width is number => Boolean(width && width > 0));
  const viewportWidth = widths.length > 0 ? Math.min(...widths) : 1200;
  const mobileLike =
    window.matchMedia("(max-width: 700px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent);

  return viewportWidth <= 700 || (mobileLike && viewportWidth <= 1100);
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(isMobileViewport());
    update();

    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return isMobile;
}

function MobileDesignProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const activeStep = processSteps[activeIndex];

  function showPreviousStep() {
    setActiveIndex((index) =>
      index === 0 ? processSteps.length - 1 : index - 1,
    );
  }

  function showNextStep() {
    setActiveIndex((index) => (index + 1) % processSteps.length);
  }

  function handleTouchEnd(clientX: number) {
    if (touchStartX === null) return;

    const delta = clientX - touchStartX;
    if (Math.abs(delta) > 36) {
      if (delta > 0) showPreviousStep();
      else showNextStep();
    }

    setTouchStartX(null);
  }

  return (
    <section
      aria-labelledby="design-process-title"
      className="mx-auto mt-[100px] flex w-full flex-col items-center"
      style={{ width: "100%", maxWidth: 393, paddingLeft: 20, paddingRight: 20, boxSizing: "border-box" }}
    >
      <h2 id="design-process-title" className="sr-only">
        My Design Process
      </h2>

      <div
        className="flex items-center"
        style={{
          width: "100%",
          height: 125,
          paddingLeft: 28,
          backgroundColor: "#7780F4",
          overflow: "hidden",
        }}
      >
        <Image
          src="/icons/Myprocess.svg"
          alt="My Design Process"
          width={305}
          height={93}
          priority
          style={{ width: 305, height: 93, objectFit: "contain" }}
        />
      </div>

      <div
        className="w-full"
        style={{
          height: 208,
          padding: "32px 24px",
          backgroundColor: "#4C39B6",
          border: "3px solid #FFFFFF",
          boxSizing: "border-box",
        }}
        onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      >
        <div key={activeStep.title} className="transition-opacity duration-300 ease-out">
          <h3 className="text-[20px] leading-none font-bold text-white">
            {activeStep.title}
          </h3>
          <p className="mt-2 text-[16px] leading-[20px] font-semibold text-white/70">
            {activeStep.description}
          </p>
        </div>

        <div style={{ marginTop: 24, display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }} aria-label="Design process slides">
          {processSteps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              aria-label={`Show ${step.title}`}
              aria-current={activeIndex === index ? "step" : undefined}
              onClick={() => setActiveIndex(index)}
              style={{
                width: 10,
                height: 10,
                minWidth: 10,
                minHeight: 10,
                display: "block",
                padding: 0,
                border: 0,
                borderRadius: 9999,
                backgroundColor: activeIndex === index ? "#FFFFFF" : "#AAAAAA",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopDesignProcess() {
  return (
    <section
      aria-labelledby="design-process-title"
      className="w-full max-w-[1440px] mx-auto px-[80px] mt-[100px] flex flex-col items-center max-[700px]:px-5"
    >
      <h2 id="design-process-title" className="sr-only">
        My Design Process
      </h2>

      <div className="flex w-full max-w-[1262px] flex-col gap-0">
        <Image
          src="/brand/Johncouch.png"
          alt="John Oduntan working on a laptop while seated on a couch"
          width={1262}
          height={375}
          sizes="(max-width: 1262px) 100vw, 1262px"
          className="block aspect-[1262/375] h-auto w-full object-cover"
        />

        <div className="flex h-[356px] w-full max-w-[1262px] items-center justify-center bg-[#4C39B6] max-md:h-auto max-md:px-5 max-md:py-8">
          <div className="h-[290px] w-[1170px] max-w-[calc(100%-40px)] border-2 border-white max-md:h-auto max-md:max-w-full">
            <div className="grid h-full grid-cols-5 items-center px-8 max-md:flex max-md:flex-col max-md:items-stretch max-md:px-6 max-md:py-2">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={
                    index === 0
                      ? "h-fit pr-6 max-md:py-6 max-md:pr-0"
                      : "h-fit border-l border-white/50 px-6 max-md:border-t max-md:border-l-0 max-md:px-0 max-md:py-6"
                  }
                >
                  <h3 className="text-[20px] leading-none font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-[16px] text-[19px] leading-[1.2] font-semibold text-white/70">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DesignProcess() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileDesignProcess /> : <DesktopDesignProcess />;
}
