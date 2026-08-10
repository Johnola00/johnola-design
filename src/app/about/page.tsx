"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutMe } from "@/components/sections/about-me";
import { useViewportMode } from "@/hooks/use-viewport-mode";

type Experience = {
  company: string;
  date: string;
  title: string;
  type: string;
  desc: string;
  image: string;
};

type Certification = {
  title: string;
  issuer: string;
  image: string;
  href: string;
};

const experiences: Experience[] = [
  {
    company: "Avaye",
    date: "Mar 2026 - Jun 2026 / Remote",
    title: "Product Designer",
    type: "(contract)",
    desc: "At Avaye, I worked on improving web and mobile experiences across role-based dashboards for Guests, Property Managers, Content Creators, and Service Providers, while refining settings, simplifying complex flows, auditing product screens, and creating brand guidelines to support a more consistent product experience.",
    image: "avayelogo.png",
  },
  {
    company: "HNG TECH",
    date: "Oct 2025 - Dec 2025 / Remote",
    title: "Lead Product Designer",
    type: "(Internship)",
    desc: "At HNG TECH, I led the design of TravelNG across web and mobile, shaping the user flows, wireframes, and high-fidelity interfaces while working with the team to create a consistent and easy-to-use travel experience.",
    image: "hnglogo.png",
  },
  {
    company: "Talenvo",
    date: "Mar 2025 - Apr 2025 / Remote",
    title: "Product Designer",
    type: "(Internship)",
    desc: "At TALENVO, I gained hands-on product design experience through design tasks and a hackathon project, where my team created EduFund, a 1st place winning educational financing solution for students.",
    image: "Talenvologo.png",
  },
  {
    company: "HNG TECH",
    date: "Jan 2025 - Mar 2025 / Remote",
    title: "Product Designer",
    type: "(Internship)",
    desc: "At HNG TECH, I worked on eVote by designing key product screens, refining wireframes into usable interface flows, and supporting the team with consistent UI patterns for an online voting experience.",
    image: "hnglogo.png",
  },
];

const certifications: Certification[] = [
  {
    title: "IBM UI/UX Designer",
    issuer: "Coursera - 2025",
    image: "/brand/ibmlogo.png",
    href: "#",
  },
  {
    title: "Certificate of Proficiency",
    issuer: "HNG TECH - 2025",
    image: "/brand/hnglogo2.png",
    href: "#",
  },
  {
    title: "Google AI Essentials",
    issuer: "Coursera - 2025",
    image: "/brand/googlelogo.png",
    href: "#",
  },
  {
    title: "Prompting Essentials",
    issuer: "Coursera - 2025",
    image: "/brand/googlelogo.png",
    href: "#",
  },
  {
    title: "Google Ux Design specialization",
    issuer: "Coursera - 2025",
    image: "/brand/googlelogo.png",
    href: "#",
  },
];

function useDescriptionOverflow(
  text: string,
  collapsedHeight: number,
) {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [canExpand, setCanExpand] = useState(false);

  useLayoutEffect(() => {
    const element = descriptionRef.current;

    if (!element) return;

    const measure = () => {
      // scrollHeight keeps the full rendered text height even when its parent clips it.
      setCanExpand(element.scrollHeight > collapsedHeight + 1);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [text, collapsedHeight]);

  return {
    descriptionRef,
    canExpand,
  };
}

function ExperienceCard({ exp }: { exp: Experience }) {
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const collapsedDescriptionHeight = 44;
  const { descriptionRef, canExpand } = useDescriptionOverflow(
    exp.desc,
    collapsedDescriptionHeight,
  );

  return (
    <article
      className="my-6 flex w-full items-start overflow-hidden rounded-[28px] bg-[#242424] p-5"
      style={{ minHeight: 184 }}
    >
      <div className="relative h-[144px] w-[144px] shrink-0 overflow-hidden rounded-[18px] bg-white/5">
        <Image
          alt={exp.company}
          src={`/brand/${exp.image}`}
          fill
          sizes="144px"
          className="object-cover"
        />
      </div>

      <div className="ml-6 min-w-0 flex-1 text-left">
        <p className="font-inter text-[13px] font-medium leading-[1.2] text-[#929292]">
          {exp.date}
        </p>

        <h3 className="mt-2 font-inter text-[18px] font-semibold leading-[1.15] text-white">
          {exp.company}
        </h3>

        <p className="mt-2 font-inter text-[14px] font-semibold leading-[1.25] text-white">
          {exp.title}{" "}
          <span className="font-medium text-[#929292]">{exp.type}</span>
        </p>

        <div
          className="relative mt-3 overflow-hidden transition-[max-height] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            maxHeight:
              canExpand && !isCardExpanded
                ? collapsedDescriptionHeight
                : 220,
          }}
        >
          <p
            ref={descriptionRef}
            className={`max-w-[860px] font-inter text-[14px] font-normal leading-[1.55] text-white/75 transition-[opacity,transform] duration-[380ms] ease-out ${
              isCardExpanded
                ? "translate-y-0 opacity-100"
                : "translate-y-[-2px] opacity-90"
            }`}
          >
            {exp.desc}
          </p>

          {canExpand && !isCardExpanded ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#242424] to-transparent"
            />
          ) : null}
        </div>

        {canExpand ? (
          <button
            type="button"
            aria-expanded={isCardExpanded}
            onClick={() => setIsCardExpanded((current) => !current)}
            className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-medium leading-none text-[#38BDF8] transition-colors duration-200 hover:text-white"
          >
            <span>{isCardExpanded ? "Show Less" : "See More"}</span>
            <span
              aria-hidden="true"
              className="inline-block text-[13px] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: isCardExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ↓
            </span>
          </button>
        ) : null}
      </div>
    </article>
  );
}

function MobileExperienceCard({
  exp,
  isExpanded,
  onToggle,
}: {
  exp: Experience;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const collapsedDescriptionHeight = 28;
  const { descriptionRef, canExpand } = useDescriptionOverflow(
    exp.desc,
    collapsedDescriptionHeight,
  );

  return (
    <article
      className="w-full overflow-hidden"
      style={{
        minHeight: 145,
        backgroundColor: "#262626",
        borderRadius: 14,
        padding: 16,
      }}
    >
      <div className="flex flex-row items-start">
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ width: 64, height: 64, borderRadius: 9 }}
        >
          <Image
            alt={exp.company}
            src={`/brand/${exp.image}`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1" style={{ marginLeft: 10 }}>
          <p
            className="truncate text-[#AAAAAA]"
            style={{ fontSize: 10, fontWeight: 400, lineHeight: "12px" }}
          >
            {exp.date}
          </p>

          <h3
            className="truncate text-white"
            style={{
              marginTop: 6,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "16px",
            }}
          >
            {exp.company}
          </h3>

          <p
            className="truncate text-white"
            style={{
              marginTop: 8,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: "16px",
            }}
          >
            {exp.title} <span className="text-[#AAAAAA]">{exp.type}</span>
          </p>
        </div>
      </div>

      <div
        className="relative overflow-hidden transition-[max-height] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          marginTop: 8,
          maxHeight:
            canExpand && !isExpanded
              ? collapsedDescriptionHeight
              : 220,
        }}
      >
        <p
          ref={descriptionRef}
          className={`text-white transition-[opacity,transform] duration-[380ms] ease-out ${
            isExpanded
              ? "translate-y-0 opacity-100"
              : "translate-y-[-2px] opacity-90"
          }`}
          style={{
            fontSize: 12,
            fontWeight: 400,
            lineHeight: "14px",
          }}
        >
          {exp.desc}
        </p>

        {canExpand && !isExpanded ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#262626] to-transparent"
          />
        ) : null}
      </div>

      {canExpand ? (
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={onToggle}
          className="mt-[6px] inline-flex items-center gap-1.5 text-left text-[#38BDF8]"
          style={{ fontSize: 12, fontWeight: 400, lineHeight: "14px" }}
        >
          <span>{isExpanded ? "Show Less" : "See More"}</span>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ↓
          </span>
        </button>
      ) : null}
    </article>
  );
}

function MobileExperiencesSection({
  expandedExperience,
  onToggleExperience,
}: {
  expandedExperience: string | null;
  onToggleExperience: (id: string) => void;
}) {
  return (
    <section
      aria-labelledby="mobile-experiences-title"
      className="mx-auto w-full"
      style={{ maxWidth: 640, marginTop: 56 }}
    >
      <h2
        id="mobile-experiences-title"
        className="text-white"
        style={{ fontSize: 19, fontWeight: 600, lineHeight: "23px" }}
      >
        Experiences
      </h2>

      <div className="flex flex-col" style={{ marginTop: 16, gap: 12 }}>
        {experiences.map((exp) => {
          const id = `${exp.company}-${exp.date}`;

          return (
            <MobileExperienceCard
              key={id}
              exp={exp}
              isExpanded={expandedExperience === id}
              onToggle={() => onToggleExperience(id)}
            />
          );
        })}
      </div>
    </section>
  );
}
function MobileCertificationItem({ certification }: { certification: Certification }) {
  return (
    <a
      href={certification.href}
      className="group flex shrink-0 cursor-pointer flex-col items-center justify-center"
      style={{ width: 112, height: 104, flexShrink: 0 }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: 56, height: 56, borderRadius: 6 }}
      >
        <Image
          src={certification.image}
          alt={`${certification.title} logo`}
          fill
          sizes="56px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h4
        className="text-center text-white"
        style={{ marginTop: 4, fontSize: 8, fontWeight: 500, lineHeight: "10px" }}
      >
        {certification.title}
      </h4>
      <p
        className="text-center text-[#AAAAAA]"
        style={{ marginTop: 4, fontSize: 8, fontWeight: 700, lineHeight: "10px" }}
      >
        {certification.issuer}
      </p>
    </a>
  );
}

function MobileCertificationsSection({ items }: { items: Certification[] }) {
  return (
    <section
      aria-labelledby="mobile-certifications-title"
      className="w-full"
      style={{ marginTop: 48 }}
    >
      <h2
        id="mobile-certifications-title"
        className="text-white"
        style={{ fontSize: 19, fontWeight: 600, lineHeight: "23px" }}
      >
        Certifications
      </h2>

      <div
        className="relative flex w-screen items-center overflow-hidden bg-[#262626]"
        style={{
          height: 120,
          marginTop: 16,
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          backgroundColor: "#262626",
        }}
      >
        <div
          className="flex w-max flex-row items-center animate-[certificationsScroll_34s_linear_infinite]"
          style={{
            width: "max-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            animation: "certificationsScroll 34s linear infinite",
            willChange: "transform",
          }}
        >
          {items.map((certification, index) => (
            <MobileCertificationItem
              key={`${certification.title}-${index}`}
              certification={certification}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationItem({ certification }: { certification: Certification }) {
  return (
    <a
      href={certification.href}
      className="group mx-4 flex h-[166px] w-[176px] shrink-0 cursor-pointer flex-col items-center justify-center"
    >
      <div className="relative h-[88px] w-[88px] overflow-hidden rounded-[12px] bg-white">
        <Image
          src={certification.image}
          alt={`${certification.title} logo`}
          fill
          sizes="88px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <h4 className="mt-3 max-w-[168px] text-center text-[14px] font-semibold leading-[1.2] text-white">
        {certification.title}
      </h4>

      <p className="mt-2 text-center text-[12px] font-medium leading-none text-[#929292]">
        {certification.issuer}
      </p>
    </a>
  );
}

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedMobileExperience, setExpandedMobileExperience] = useState<string | null>(null);
  const viewportMode = useViewportMode();
  const isMobile = viewportMode === "mobile";
  const isTablet = viewportMode === "tablet";
  const baseExperiences = experiences.slice(0, 3);
  const extraExperience = experiences[3];
  const marqueeItems = [...certifications, ...certifications];

  return (
    <>
      <main
        className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col"
        style={{
          paddingLeft: viewportMode === "desktop" ? 72 : viewportMode === "tablet" ? 32 : 20,
          paddingRight: viewportMode === "desktop" ? 72 : viewportMode === "tablet" ? 32 : 20,
        }}
      >
        <div
          style={{
            marginLeft: viewportMode === "desktop" ? -72 : viewportMode === "tablet" ? -32 : -20,
            marginRight: viewportMode === "desktop" ? -72 : viewportMode === "tablet" ? -32 : -20,
          }}
        >
          <Header activePath="/about" />
        </div>

        <div
          className="[&>section]:mt-[40px]"
          style={{
            marginLeft: viewportMode === "desktop" ? -80 : viewportMode === "tablet" ? -32 : -20,
            marginRight: viewportMode === "desktop" ? -80 : viewportMode === "tablet" ? -32 : -20,
          }}
        >
          <AboutMe />
        </div>

        {isMobile ? (
          <MobileExperiencesSection
            expandedExperience={expandedMobileExperience}
            onToggleExperience={(id) =>
              setExpandedMobileExperience((current) => (current === id ? null : id))
            }
          />
        ) : (
          <div className={isTablet ? "mx-auto w-full max-w-[864px]" : "w-full"}>
            <div className="mb-7 mt-12 h-px w-full bg-white/20" />

            <section aria-labelledby="experiences-title" className="w-full">
              <h2
                id="experiences-title"
                className="text-[18px] font-semibold leading-none text-white"
              >
                Experiences
              </h2>

              {baseExperiences.map((exp) => (
                <ExperienceCard key={`${exp.company}-${exp.date}`} exp={exp} />
              ))}

              <div
                aria-hidden={!isExpanded}
                style={{
                  maxHeight: isExpanded ? 230 : 0,
                  opacity: isExpanded ? 1 : 0,
                  overflow: "hidden",
                  transform: isExpanded ? "translateY(0)" : "translateY(-16px)",
                  transition:
                    "max-height 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 360ms ease, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  pointerEvents: isExpanded ? "auto" : "none",
                }}
              >
                <ExperienceCard exp={extraExperience} />
              </div>

              <div className="relative mb-12 mt-12 flex h-10 w-full items-center justify-center">
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/20" />

                <button
                  type="button"
                  onClick={() => setIsExpanded((current) => !current)}
                  className="relative z-10 flex h-10 min-w-[154px] items-center justify-center rounded-full border border-[#38BDF8] bg-[#121212] px-5 text-[12px] font-semibold leading-none text-[#38BDF8] transition-colors duration-300 hover:bg-[#38BDF8] hover:text-white"
                >
                  {isExpanded ? "Show Less" : "See More Experiences"}
                </button>
              </div>
            </section>
          </div>
        )}

        {isMobile ? (
          <MobileCertificationsSection items={marqueeItems} />
        ) : (
          <section
            aria-labelledby="certifications-title"
            className={isTablet ? "mx-auto w-full max-w-[864px]" : "w-full"}
            style={{ marginTop: 0 }}
          >
            <h2
              id="certifications-title"
              className="text-[18px] font-semibold leading-none text-white"
            >
              Certifications
            </h2>

            <div className="relative mt-6 flex h-[220px] w-full items-center overflow-hidden rounded-[30px] bg-[#242424]">
              <div
                className="flex w-max flex-row items-center animate-[certificationsScroll_34s_linear_infinite]"
                style={{
                  width: "max-content",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  animation: "certificationsScroll 34s linear infinite",
                  willChange: "transform",
                }}
              >
                {marqueeItems.map((certification, index) => (
                  <CertificationItem
                    key={`${certification.title}-${index}`}
                    certification={certification}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <div className="mt-12 [&>footer]:mt-0">
        <Footer />
      </div>

      <style jsx global>{`
        @keyframes certificationsScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}


