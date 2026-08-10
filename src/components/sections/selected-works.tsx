"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { ProjectCard } from "@/components/work/project-card";
import { WorkInProgress } from "@/components/work/work-in-progress";
import { useViewportMode } from "@/hooks/use-viewport-mode";

type TabName = "Mobile projects" | "Web projects" | "Landing Page Designs" | "Applied AI & Workflows" | "Front-End Implementations";

type Project = {
  title: string;
  year: string;
  tag: string;
  description: string;
  imagePath: string;
  imageFit?: "cover" | "contain";
  href?: string;
};

type MobileWorkCategory = {
  label: TabName;
  href: string;
  iconPath: string;
};

const tabs: Array<{ name: TabName; count?: number }> = [
  { name: "Mobile projects", count: 7 },
  { name: "Web projects", count: 5 },
  { name: "Landing Page Designs", count: 1 },
  { name: "Applied AI & Workflows" },
  { name: "Front-End Implementations" },
];

const tabUrlValues: Record<TabName, string> = {
  "Mobile projects": "mobile-projects",
  "Web projects": "web-projects",
  "Landing Page Designs": "landing-page-designs",
  "Applied AI & Workflows": "applied-ai-workflows",
  "Front-End Implementations": "front-end-implementations",
};

const urlValueToTab = Object.fromEntries(
  Object.entries(tabUrlValues).map(([tab, value]) => [value, tab]),
) as Record<string, TabName>;


const mobileWorkCategories: MobileWorkCategory[] = [
  {
    label: "Mobile projects",
    href: "/work?category=mobile-projects",
    iconPath: "/icons/Mobile%20icon.svg",
  },
  {
    label: "Web projects",
    href: "/work?category=web-projects",
    iconPath: "/icons/Web%20icon.svg",
  },
  {
    label: "Landing Page Designs",
    href: "/work?category=landing-page-designs",
    iconPath: "/icons/Landingpage%20icon.svg",
  },
  {
    label: "Applied AI & Workflows",
    href: "/work?category=applied-ai-workflows",
    iconPath: "/icons/AI%20Icon.svg",
  },
  {
    label: "Front-End Implementations",
    href: "/work?category=front-end-implementations",
    iconPath: "/icons/FrontEnd%20Icon.svg",
  },
];


const projectSets: Record<TabName, Project[]> = {
  "Mobile projects": [
    {
      title: "Homelander",
      year: "2025",
      tag: "Real Estate",
      description:
        "A rental discovery app for finding verified homes, avoiding fake listings, and connecting safely with property reps.",
      imagePath: "/projects/mobile-projects/homelander/Homelander%20Thumbnail.png",
      href: "https://www.behance.net/gallery/239965821/Homelander-UX-Case-Study-for-a-Property-Discovery-App",
    },
    {
      title: "Zowe",
      year: "2025",
      tag: "Events",
      description:
        "An event discovery marketplace for browsing shows, buying tickets, and hiring verified vendors in one mobile flow.",
      imagePath: "/projects/mobile-projects/zowe/ZoweThumbnail.png",
      href: "https://www.behance.net/gallery/232975121/Zowe-Events-Ticketing-and-Vendor-Sourcing-Mobile-App",
    },
    {
      title: "Loafsy",
      year: "2025",
      tag: "Bakery",
      description:
        "A bakery app built around fresh-bake alerts, easy ordering, and short tutorials that connect customers to the craft.",
      imagePath: "/projects/mobile-projects/loafsy/Loafsy%20thumbnail.png",
      href: "https://www.behance.net/gallery/225094225/Bakery-App-Visual-Design",
    },
    {
      title: "Hype & Wear",
      year: "2025",
      tag: "Video Commerce",
      description:
        "A video-first retail concept that turns product discovery, sizing, and checkout into a polished mobile shopping flow.",
      imagePath: "/projects/mobile-projects/hype-and-wear/HWThumbnail.png",
    },
    {
      title: "Findit",
      year: "2025",
      tag: "Lost & Found",
      description:
        "A centralized lost-and-found platform for reporting items, organizing community claims, and encouraging trusted returns.",
      imagePath: "/projects/mobile-projects/findit/FinditThumbnail.png",
    },
    {
      title: "Freshpaddy",
      year: "2025",
      tag: "Grocery",
      description:
        "A grocery commerce app connecting shoppers with trusted local produce vendors, food bundles, and safety guidance.",
      imagePath: "/projects/mobile-projects/freshpaddy/FreshpaddyThumbnail.png",
    },
    {
      title: "Minglo+",
      year: "2025",
      tag: "Social",
      description:
        "A social discovery app combining local event discovery, profile matching, and chat to help people connect around events they plan to attend.",
      imagePath: "/projects/mobile-projects/minglo/mingloThumbnail.png",
    },
  ],
  "Web projects": [
    {
      title: "Hedgewears",
      year: "2026",
      tag: "E-commerce",
      description:
        "A fashion e-commerce platform for discovering, video shopping, and managing modern style online.",
      imagePath:
        "/projects/web-projects/hedgewears-fashion-ecommerce/Hedgewears-thumbnail.webp",
      imageFit: "contain",
      href: "/projects/hedgewears",
    },
    {
      title: "Travel.ng",
      year: "2025",
      tag: "Travel",
      description:
        "A travel platform for discovering curated trips, booking complete packages, and listing local experiences across Nigeria.",
      imagePath:
        "/projects/web-projects/travel-ng/TravelNg-Thumbnail.webp",
      imageFit: "contain",
      href: "/projects/travelng",
    },
    {
      title: "Edufund",
      year: "2025",
      tag: "EdTech",
      description:
        "An education crowdfunding platform helping verified schools raise student funding through trusted donation flows.",
      imagePath: "/projects/web-projects/edufund/EdufundThumbnail.png",
    },
    {
      title: "OpenDoors",
      year: "2025",
      tag: "UX Audit",
      description:
        "A UX audit and homepage redesign for an inclusive jobs platform, improving navigation, clarity, and calls to action.",
      imagePath: "/projects/web-projects/opendoors/OpendoorThumbnail.png",
      href: "https://www.behance.net/gallery/234807337/UX-Audit-Website-Redesign-OpendoorsInitiative",
    },
    {
      title: "Med Spectra",
      year: "2024",
      tag: "HealthTech",
      description:
        "An AI-powered healthcare dashboard turning patient metrics into clear, scannable visuals for faster clinical decisions.",
      imagePath: "/projects/web-projects/med-spectra/MedSpectraThumbnail.png",
      href: "https://www.behance.net/gallery/223971659/Clean-Intelligent-Healthcare-Dashboard-Powered-by-AI",
    },
  ],
  "Landing Page Designs": [
    {
      title: "La Vague",
      year: "2025",
      tag: "Visual Design",
      description:
        "A minimalist coastal-fashion landing page concept shaped around clean product storytelling, monochrome styling, and refined visual direction.",
      imagePath: "/projects/landing-page-designs/la-vague/Lavague%20Thumbnail.png",
      imageFit: "contain",
      href: "https://www.behance.net/gallery/217365915/La-Vague-E-commerce-Exploration",
    },
  ],
  "Applied AI & Workflows": [],
  "Front-End Implementations": [],
};

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

function HomepageProjectSkeleton() {
  return (
    <div aria-hidden="true" className="flex w-[406px] max-w-full animate-pulse flex-col">
      <div className="h-[330px] w-[406px] max-w-full rounded-[16px] bg-white/[0.075]" />
      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="h-[18px] w-[46%] rounded bg-white/[0.09]" />
        <div className="h-[14px] w-[46px] rounded bg-white/[0.07]" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-[13px] w-full rounded bg-white/[0.06]" />
        <div className="h-[13px] w-[88%] rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

function ProjectGrid({
  projects,
  isLoading = false,
  transitionKey = "initial",
}: {
  projects: Project[];
  isLoading?: boolean;
  transitionKey?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let revealFrame = 0;

    const resetFrame = requestAnimationFrame(() => {
      setIsVisible(false);

      if (!isLoading) {
        revealFrame = requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }
    });

    return () => {
      cancelAnimationFrame(resetFrame);
      if (revealFrame) cancelAnimationFrame(revealFrame);
    };
  }, [isLoading, transitionKey]);

  const gridClassName =
    "grid grid-cols-3 gap-x-[31px] gap-y-[80px] w-full max-w-[1280px] mx-auto";

  if (projects.length === 0) {
    return <WorkInProgress />;
  }

  if (isLoading) {
    return (
      <div className={gridClassName} aria-label="Loading selected projects">
        {Array.from({ length: Math.min(6, projects.length) }, (_, index) => (
          <HomepageProjectSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div
      key={transitionKey}
      className={`${gridClassName} transition-[opacity,transform] duration-[340ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          title={project.title}
          year={project.year}
          tag={project.tag}
          description={project.description}
          imagePath={project.imagePath}
          imageFit={project.imageFit}
          href={project.href}
        />
      ))}
    </div>
  );
}

function MobileWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.28 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-works"
      aria-labelledby="selected-works-title"
      className="mx-auto w-full"
      style={{ width: "100%", maxWidth: 640, paddingLeft: 20, paddingRight: 20, boxSizing: "border-box", position: "relative", zIndex: 0 }}
    >
      <h2
        id="selected-works-title"
        className="font-medium text-[#AAAAAA]"
        style={{ fontSize: 14.6, lineHeight: "18px" }}
      >
        My work
      </h2>

      <div className="flex w-full flex-col" style={{ marginTop: 16, gap: 16 }}>
        {mobileWorkCategories.map((category, index) => (
          <Link
            key={category.label}
            href={`${category.href}&from=home`}
            aria-label={`Open ${category.label}`}
            className="text-[#AAAAAA]"
            style={{
              width: "100%",
              height: 60,
              padding: "18px 24px",
              borderRadius: 16,
              backgroundColor: "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(-18px)",
              transitionProperty: "opacity, transform",
              transitionDuration: "620ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
              position: "relative",
              zIndex: 0,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: 0,
                flex: "1 1 auto",
              }}
            >
              <Image
                src={category.iconPath}
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
                style={{ width: 24, height: 24, objectFit: "contain", flexShrink: 0 }}
              />
              <span
                className="truncate font-normal text-[#AAAAAA]"
                style={{ marginLeft: 12, fontSize: 14.6, lineHeight: "18px" }}
              >
                {category.label}
              </span>
            </span>
            <Image
              src="/icons/topright%20icon.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
              style={{ width: 24, height: 24, objectFit: "contain", flexShrink: 0 }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

function TabletWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-works"
      aria-labelledby="selected-works-title"
      className="mx-auto mt-4 w-full max-w-[1024px] px-12"
    >
      <div className="mx-auto w-full max-w-[864px]">
        <h2
          id="selected-works-title"
          className="text-[16px] font-medium leading-none text-[#AAAAAA]"
        >
          My work
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {mobileWorkCategories.map((category, index) => (
            <Link
              key={category.label}
              href={`${category.href}&from=home`}
              aria-label={`Open ${category.label}`}
              className={`group flex h-[76px] items-center justify-between rounded-[18px] bg-[#262626] px-5 text-[#AAAAAA] transition-[opacity,transform,background-color] duration-500 ease-out hover:bg-[#303030] ${
                index === mobileWorkCategories.length - 1 ? "col-span-2" : ""
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(14px)",
                transitionDelay: isVisible ? `${index * 70}ms` : "0ms",
              }}
            >
              <span className="flex min-w-0 items-center">
                <Image
                  src={category.iconPath}
                  alt=""
                  width={26}
                  height={26}
                  aria-hidden="true"
                  className="h-[26px] w-[26px] shrink-0 object-contain"
                />
                <span className="ml-3 truncate text-[14px] font-medium text-[#BDBDBD] transition-colors duration-300 group-hover:text-white">
                  {category.label}
                </span>
              </span>

              <Image
                src="/icons/topright%20icon.svg"
                alt=""
                width={22}
                height={22}
                aria-hidden="true"
                className="h-[22px] w-[22px] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopSelectedWorks() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabName>("Mobile projects");
  const [hasRestoredTab, setHasRestoredTab] = useState(false);
  const [isGridLoading, setIsGridLoading] = useState(true);
  const [hasCompletedInitialLoad, setHasCompletedInitialLoad] = useState(false);
  const [tabIndicator, setTabIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const tabNavRef = useRef<HTMLElement>(null);
  const tabButtonRefs = useRef<Partial<Record<TabName, HTMLButtonElement | null>>>({});

  useLayoutEffect(() => {
    const restoreTabFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const savedCategory = params.get("workCategory");
      const restoredTab = savedCategory
        ? urlValueToTab[savedCategory]
        : undefined;

      setActiveTab(restoredTab ?? "Mobile projects");
      setHasRestoredTab(true);
    };

    restoreTabFromUrl();

    window.addEventListener("popstate", restoreTabFromUrl);
    window.addEventListener("pageshow", restoreTabFromUrl);

    return () => {
      window.removeEventListener("popstate", restoreTabFromUrl);
      window.removeEventListener("pageshow", restoreTabFromUrl);
    };
  }, []);

  useEffect(() => {
    if (!hasRestoredTab || hasCompletedInitialLoad) return;

    const section = sectionRef.current;
    if (!section) return;

    let timer: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        timer = window.setTimeout(() => {
          setIsGridLoading(false);
          setHasCompletedInitialLoad(true);
        }, 360);
      },
      { threshold: 0.12 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [hasCompletedInitialLoad, hasRestoredTab]);

  useEffect(() => {
    if (!hasCompletedInitialLoad || !isGridLoading) return;

    const timer = window.setTimeout(() => {
      setIsGridLoading(false);
    }, 360);

    return () => window.clearTimeout(timer);
  }, [activeTab, hasCompletedInitialLoad, isGridLoading]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const nav = tabNavRef.current;
      const button = tabButtonRefs.current[activeTab];
      if (!nav || !button) return;

      const navRect = nav.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      setTabIndicator({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
        ready: true,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="selected-works"
      aria-labelledby="selected-works-title"
      className="w-full max-w-[1440px] mx-auto px-[80px] mt-[80px]"
    >
      <h2 id="selected-works-title" className="sr-only">
        Selected Works
      </h2>

      <nav
        ref={tabNavRef}
        aria-label="Project categories"
        className="relative mb-[36px] flex w-full flex-row items-end gap-8"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;

          return (
            <button
              ref={(element) => {
                tabButtonRefs.current[tab.name] = element;
              }}
              key={tab.name}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                if (isActive) return;

                const params = new URLSearchParams(window.location.search);
                params.set("workCategory", tabUrlValues[tab.name]);

                router.replace(
                  `/?${params.toString()}#selected-works`,
                  { scroll: false },
                );

                setIsGridLoading(true);
                setActiveTab(tab.name);
              }}
              className={`cursor-pointer pb-[7px] text-[13.3px] leading-none font-bold transition-colors duration-300 ${
                isActive ? "text-white" : "text-[#999999] hover:text-[#FFFFFF]"
              }`}
            >
              {tab.name}
              {tab.count !== undefined ? (
                <sup className="ml-[2px] text-[9px]">{tab.count}</sup>
              ) : null}
            </button>
          );
        })}

        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-white"
          style={{
            left: tabIndicator.left,
            width: tabIndicator.width,
            opacity: tabIndicator.ready ? 1 : 0,
            transition:
              "left 340ms cubic-bezier(0.65, 0, 0.35, 1), width 340ms cubic-bezier(0.65, 0, 0.35, 1), opacity 160ms ease",
          }}
        />
      </nav>

      <ProjectGrid
        projects={projectSets[activeTab]}
        isLoading={isGridLoading}
        transitionKey={activeTab}
      />

      <div className="mt-[80px] flex w-full flex-row items-center justify-center gap-[10px]">
        <Link
          href="/work"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          style={tiltButtonStyle}
          className="flex h-[64px] w-[330px] max-w-full items-center justify-center rounded-[4px] bg-[#38BDF8] text-[14px] leading-none font-semibold text-white transition-transform duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:bg-[#1EADEB] active:scale-95"
        >
          View More
        </Link>
        <a
          href="https://www.behance.net/johnoduntan1"
          target="_blank"
          rel="noreferrer"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          style={tiltButtonStyle}
          className="flex h-[64px] w-[330px] max-w-full items-center justify-center gap-2 rounded-[4px] bg-[#272727] text-[14px] leading-none font-semibold text-white transition-transform duration-300 ease-out [transform:perspective(1000px)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))_scale(var(--tw-scale-x,1),var(--tw-scale-y,1))] hover:bg-[#333333] active:scale-95"
        >
          <Image
            src="/icons/behance.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
            className="brightness-0 invert"
          />
          Visit Behance
        </a>
      </div>
    </section>
  );
}

export function SelectedWorks() {
  const viewportMode = useViewportMode();

  if (viewportMode === "mobile") return <MobileWorkSection />;
  if (viewportMode === "tablet") return <TabletWorkSection />;
  return <DesktopSelectedWorks />;
}










