"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { useViewportMode } from "@/hooks/use-viewport-mode";

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
      style={{
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        boxSizing: "border-box",
      }}
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

function TabletDesignProcess() {
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
    if (Math.abs(delta) > 44) {
      if (delta > 0) showPreviousStep();
      else showNextStep();
    }

    setTouchStartX(null);
  }

  return (
    <section
      aria-labelledby="design-process-title"
      className="mx-auto mt-20 w-full max-w-[1024px] px-8"
    >
      <h2 id="design-process-title" className="sr-only">
        My Design Process
      </h2>

      <div className="mx-auto w-full max-w-[864px] overflow-hidden">
        <div className="flex h-[156px] items-center bg-[#7780F4] px-10">
          <Image
            src="/icons/Myprocess.svg"
            alt="My Design Process"
            width={360}
            height={110}
            priority
            className="h-auto w-[360px] max-w-[62%] object-contain"
          />
        </div>

        <div
          className="border-2 border-white bg-[#4C39B6] px-10 py-8"
          onTouchStart={(event) =>
            setTouchStartX(event.touches[0]?.clientX ?? null)
          }
          onTouchEnd={(event) =>
            handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)
          }
        >
          <div className="flex items-start justify-between gap-8">
            <div key={activeStep.title} className="max-w-[610px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                Step {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[25px] font-bold leading-none text-white">
                {activeStep.title}
              </h3>
              <p className="mt-3 text-[17px] font-semibold leading-[1.35] text-white/72">
                {activeStep.description}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                aria-label="Previous design process step"
                onClick={showPreviousStep}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white/15"
              >
                <Image
                  src="/icons/viewer-arrow-left.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </button>
              <button
                type="button"
                aria-label="Next design process step"
                onClick={showNextStep}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white/15"
              >
                <Image
                  src="/icons/viewer-arrow-right.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-2" aria-label="Design process slides">
            {processSteps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                aria-label={`Show ${step.title}`}
                aria-current={activeIndex === index ? "step" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                  activeIndex === index ? "bg-white" : "bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function useWideShortViewport() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(
        "(min-width: 900px) and (max-height: 700px)",
      );

      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () =>
      window.matchMedia("(min-width: 900px) and (max-height: 700px)").matches,
    () => false,
  );
}

function WideShortDesignProcess() {
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
      className="mx-auto mt-[100px] w-full max-w-[1440px] px-[80px]"
    >
      <h2 id="design-process-title" className="sr-only">
        My Design Process
      </h2>

      <div className="mx-auto flex w-full max-w-[1262px] flex-col gap-0 overflow-hidden">
        <Image
          src="/brand/Johncouch.png"
          alt="John Oduntan working on a laptop while seated on a couch"
          width={1262}
          height={375}
          sizes="(max-width: 1262px) 100vw, 1262px"
          className="block aspect-[1262/375] h-auto w-full object-cover"
          priority
        />

        <div
          className="w-full bg-[#4C39B6] px-8 py-7"
          onTouchStart={(event) =>
            setTouchStartX(event.touches[0]?.clientX ?? null)
          }
          onTouchEnd={(event) =>
            handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)
          }
        >
          <div className="flex min-h-[170px] items-start justify-between gap-8 border-2 border-white px-8 py-7">
            <div key={activeStep.title} className="max-w-[650px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">
                Step {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-[23px] leading-none font-bold text-white">
                {activeStep.title}
              </h3>
              <p className="mt-3 text-[17px] leading-[1.35] font-semibold text-white/70">
                {activeStep.description}
              </p>

              <div
                className="mt-6 flex items-center gap-2"
                aria-label="Design process slides"
              >
                {processSteps.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    aria-label={`Show ${step.title}`}
                    aria-current={activeIndex === index ? "step" : undefined}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                      activeIndex === index ? "bg-white" : "bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                aria-label="Previous design process step"
                onClick={showPreviousStep}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white/15"
              >
                <Image
                  src="/icons/viewer-arrow-left.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </button>
              <button
                type="button"
                aria-label="Next design process step"
                onClick={showNextStep}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white/15"
              >
                <Image
                  src="/icons/viewer-arrow-right.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
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
  const viewportMode = useViewportMode();
  const isWideShortViewport = useWideShortViewport();

  if (isWideShortViewport) return <WideShortDesignProcess />;
  if (viewportMode === "mobile") return <MobileDesignProcess />;
  if (viewportMode === "tablet") return <TabletDesignProcess />;
  return <DesktopDesignProcess />;
}
