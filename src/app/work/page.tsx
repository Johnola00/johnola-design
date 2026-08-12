"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ProjectCard } from "@/components/work/project-card";
import { WorkInProgress } from "@/components/work/work-in-progress";
import { useViewportMode } from "@/hooks/use-viewport-mode";

type TabName =
  | "Mobile projects"
  | "Web projects"
  | "Landing Page Designs"
  | "Applied AI & Workflows"
  | "Front-End Implementations";

type MobileWorkCategory = {
  label: TabName;
  href: string;
  iconPath: string;
};

type Project = {
  title: string;
  year: string;
  tag: string;
  description: string;
  imagePath: string;
  imageFit?: "cover" | "contain";
  href?: string;
};

const tabs: Array<{ name: TabName; count?: number }> = [
  { name: "Mobile projects", count: 9 },
  { name: "Web projects", count: 5 },
  { name: "Landing Page Designs", count: 1 },
  { name: "Applied AI & Workflows" },
  { name: "Front-End Implementations" },
];

const categorySlugs: Record<TabName, string> = {
  "Mobile projects": "mobile-projects",
  "Web projects": "web-projects",
  "Landing Page Designs": "landing-page-designs",
  "Applied AI & Workflows": "applied-ai-workflows",
  "Front-End Implementations": "front-end-implementations",
};

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
      href: "/projects/hype-wear",
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
      title: "Kidcoder",
      year: "2025",
      tag: "EdTech",
      description:
        "A playful coding app that introduces kids to programming through gamified lessons, streaks, and progress milestones.",
      imagePath: "/projects/mobile-projects/kidcoder/KCThumbnail.png",
    },
    {
      title: "Minglo+",
      year: "2025",
      tag: "Social",
      description:
        "A social discovery app combining local event discovery, profile matching, and chat to help people connect around events they plan to attend.",
      imagePath: "/projects/mobile-projects/minglo/mingloThumbnail.png",
    },
    {
      title: "Villascape",
      year: "2025",
      tag: "Real Estate",
      description:
        "A clean real-estate interface concept for browsing listings, scanning property details, and booking inspections quickly.",
      imagePath: "/projects/mobile-projects/villascape/VSThumbnail.png",
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
        "/projects/web-projects/hedgewears-fashion-ecommerce/Hedgewears-thumbnail-delivery.webp",
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
        "/projects/web-projects/travel-ng/TravelNg-Thumbnail-delivery.webp",
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

const desktopProjectsPerPage = 6;
const mobileProjectsPerPage = 3;

function getTabFromCategoryParam(category: string | null): TabName | null {
  if (!category) return null;
  return tabs.find((tab) => categorySlugs[tab.name] === category)?.name ?? null;
}

function getCategoryMeta(tabName: TabName) {
  const category = mobileWorkCategories.find((item) => item.label === tabName);
  const tab = tabs.find((item) => item.name === tabName);

  return {
    iconPath: category?.iconPath ?? "/icons/Mobile%20icon.svg",
    count: tab?.count,
  };
}

function ProjectCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex w-[406px] max-w-full animate-pulse flex-col"
    >
      <div className="h-[330px] w-[406px] max-w-full rounded-[16px] bg-white/[0.075]" />

      <div className="mt-[12px] flex items-center justify-between gap-4">
        <div className="h-[18px] w-[46%] rounded bg-white/[0.09]" />
        <div className="h-[15px] w-[48px] rounded bg-white/[0.07]" />
      </div>

      <div className="mt-[12px] space-y-2">
        <div className="h-[13px] w-full rounded bg-white/[0.065]" />
        <div className="h-[13px] w-[92%] rounded bg-white/[0.065]" />
        <div className="h-[13px] w-[68%] rounded bg-white/[0.065]" />
      </div>

      <div className="mt-[12px] h-[24px] w-[128px] rounded bg-white/[0.08]" />
    </div>
  );
}

function ProjectGrid({
  projects,
  isLoading,
  transitionKey,
}: {
  projects: Project[];
  isLoading: boolean;
  transitionKey: string;
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    let revealFrame = 0;

    const resetFrame = requestAnimationFrame(() => {
      setIsRevealed(false);

      if (!isLoading) {
        revealFrame = requestAnimationFrame(() => {
          setIsRevealed(true);
        });
      }
    });

    return () => {
      cancelAnimationFrame(resetFrame);
      if (revealFrame) cancelAnimationFrame(revealFrame);
    };
  }, [isLoading, transitionKey]);

  const gridClassName =
    "grid w-full max-w-[1280px] grid-cols-3 gap-x-[31px] gap-y-[80px] max-[1100px]:grid-cols-2 max-[720px]:grid-cols-1";

  if (projects.length === 0) {
    return <WorkInProgress />;
  }

  if (isLoading) {
    const skeletonCount = Math.max(1, Math.min(6, projects.length));

    return (
      <div className={gridClassName} aria-label="Loading projects">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div
      key={transitionKey}
      className={`${gridClassName} transition-[opacity,transform] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isRevealed
          ? "translate-y-0 opacity-100"
          : "translate-y-[10px] opacity-0"
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

function MobileWorkNavigation() {
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
      aria-labelledby="work-mobile-title"
      className="mx-auto w-full"
      style={{
        maxWidth: 640,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 18,
        boxSizing: "border-box",
        position: "relative",
        zIndex: 0,
      }}
    >
      <h1
        id="work-mobile-title"
        className="font-medium text-[#AAAAAA]"
        style={{ fontSize: 14.6, lineHeight: "18px" }}
      >
        My work
      </h1>

      <div className="flex w-full flex-col" style={{ marginTop: 16, gap: 16 }}>
        {mobileWorkCategories.map((category, index) => (
          <Link
            key={category.label}
            href={category.href}
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

function MobileCategorySummaryCard({ tabName }: { tabName: TabName }) {
  const meta = getCategoryMeta(tabName);

  return (
    <div
      className="flex w-full items-center justify-between bg-[#262626] text-[#AAAAAA]"
      style={{ height: 60, padding: "18px 24px", borderRadius: 16, backgroundColor: "#262626" }}
    >
      <span className="flex min-w-0 flex-1 items-center">
        <Image
          src={meta.iconPath}
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
          {tabName}
        </span>
      </span>
      {meta.count !== undefined ? (
        <span className="font-medium text-white" style={{ fontSize: 14, lineHeight: "18px" }}>
          {meta.count}
        </span>
      ) : null}
    </div>
  );
}

function MobileProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex w-full flex-col">
      <div
        className="relative w-full overflow-hidden bg-white"
        style={{ height: 286.92, borderRadius: 8 }}
      >
        <Image
          src={project.imagePath}
          alt={`${project.title} project preview`}
          fill
          sizes="353px"
          quality={100}
          unoptimized
          className={project.imageFit === "contain" ? "object-contain" : "object-cover"}
        />
        <span
          className="absolute left-2 top-2 flex items-center justify-center bg-[#38BDF8] font-[family-name:var(--font-pt-sans-caption)] font-bold text-white"
          style={{ minWidth: project.tag === "E-commerce" ? 78 : 45, width: "fit-content", height: 24, paddingLeft: 8, paddingRight: 8, borderRadius: 6, fontSize: 10, lineHeight: "10px" }}
        >
          {project.tag}
        </span>
      </div>

      <div className="flex w-full items-center justify-between" style={{ marginTop: 12 }}>
        <h2 className="font-normal text-white" style={{ fontSize: 14, lineHeight: "17px" }}>
          {project.title}
        </h2>
        <span className="font-normal text-[#AAAAAA]" style={{ fontSize: 12, lineHeight: "14px" }}>
          {project.year}
        </span>
      </div>

      <p
        className="line-clamp-3 min-h-[42px] font-normal text-white/70"
        style={{ marginTop: 10, fontSize: 12, lineHeight: "14px" }}
      >
        {project.description}
      </p>

      {project.href ? (
        <Link
          href={project.href}
          target={project.href.startsWith("http") ? "_blank" : undefined}
          rel={project.href.startsWith("http") ? "noreferrer" : undefined}
          className="flex items-center justify-center gap-1 rounded border-[0.5px] border-white text-white"
          style={{ marginTop: 10, width: 80, height: 20, fontSize: 9, lineHeight: "10px" }}
        >
          <span>View Project</span>
          <Image
            src="/icons/Right%20Arrow.svg"
            alt=""
            width={12}
            height={12}
            aria-hidden="true"
            style={{ width: 12, height: 12 }}
          />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          aria-label={`${project.title} project page is not available yet`}
          title="Project page coming soon"
          className="flex cursor-not-allowed items-center justify-center gap-1 rounded border-[0.5px] border-white/35 text-white/45"
          style={{ marginTop: 10, width: 80, height: 20, fontSize: 9, lineHeight: "10px" }}
        >
          <span>View Project</span>
          <svg
            aria-hidden="true"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            style={{ width: 11, height: 11 }}
          >
            <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 10V7.5C8 5.57 9.57 4 11.5 4H12.5C14.43 4 16 5.57 16 7.5V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </article>
  );
}


function MobileProjectCardSkeleton() {
  return (
    <div aria-hidden="true" className="flex w-full animate-pulse flex-col">
      <div className="h-[286.92px] w-full rounded-[8px] bg-white/[0.07]" />

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="h-[14px] w-[42%] rounded bg-white/[0.09]" />
        <div className="h-[12px] w-[42px] rounded bg-white/[0.06]" />
      </div>

      <div className="mt-[10px] space-y-2">
        <div className="h-[11px] w-full rounded bg-white/[0.06]" />
        <div className="h-[11px] w-[88%] rounded bg-white/[0.06]" />
        <div className="h-[11px] w-[64%] rounded bg-white/[0.06]" />
      </div>

      <div className="mt-[10px] h-[20px] w-[80px] rounded bg-white/[0.08]" />
    </div>
  );
}

function TabletProjectCardSkeleton() {
  return (
    <div aria-hidden="true" className="flex min-w-0 w-full animate-pulse flex-col">
      <div className="aspect-[406/330] w-full rounded-[14px] bg-white/[0.07]" />

      <div className="mt-3 flex items-center justify-between gap-4">
        <div className="h-[16px] w-[44%] rounded bg-white/[0.09]" />
        <div className="h-[13px] w-[46px] rounded bg-white/[0.06]" />
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-[12px] w-full rounded bg-white/[0.06]" />
        <div className="h-[12px] w-[90%] rounded bg-white/[0.06]" />
        <div className="h-[12px] w-[68%] rounded bg-white/[0.06]" />
      </div>

      <div className="mt-3 h-[25px] w-[112px] rounded bg-white/[0.08]" />
    </div>
  );
}

function MobileProjectPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-center" style={{ marginTop: 56, gap: 5 }}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={
          currentPage === 1
            ? "font-semibold text-[#AAAAAA]"
            : "font-bold text-white transition-colors hover:text-[#38BDF8]"
        }
        style={{ fontSize: 13, lineHeight: "13px" }}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={
            currentPage === page
              ? "flex items-center justify-center rounded-[8px] bg-[#38BDF8] font-semibold text-white"
              : "flex items-center justify-center rounded-[8px] bg-white font-semibold text-black transition-colors hover:bg-gray-200"
          }
          style={{ width: 32, height: 32, fontSize: 13 }}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages
            ? "font-semibold text-[#AAAAAA]"
            : "font-bold text-white transition-colors hover:text-[#38BDF8]"
        }
        style={{ fontSize: 13, lineHeight: "13px" }}
      >
        Next
      </button>
    </div>
  );
}

function MobileProjectDestination({
  tabName,
  backHref,
  backLabel,
}: {
  tabName: TabName;
  backHref: string;
  backLabel: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isPageRevealed, setIsPageRevealed] = useState(true);
  const [pageDirection, setPageDirection] = useState<"next" | "previous">("next");

  const projects = projectSets[tabName];
  const totalPages = Math.max(1, Math.ceil(projects.length / mobileProjectsPerPage));
  const page = Math.min(currentPage, totalPages);
  const paginationPage = pendingPage ?? page;
  const visibleProjects = projects.slice(
    (page - 1) * mobileProjectsPerPage,
    page * mobileProjectsPerPage,
  );

  const changePage = (nextPage: number) => {
    const boundedPage = Math.max(1, Math.min(totalPages, nextPage));

    if (
      boundedPage === page ||
      isPageLoading ||
      totalPages <= 1
    ) {
      return;
    }

    setPageDirection(boundedPage > page ? "next" : "previous");
    setPendingPage(boundedPage);
    setIsPageRevealed(false);

    window.setTimeout(() => {
      setIsPageLoading(true);

      window.setTimeout(() => {
        setCurrentPage(boundedPage);
        setPendingPage(null);
        setIsPageLoading(false);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsPageRevealed(true);
          });
        });
      }, 360);
    }, 140);
  };

  const mobileEnterClass = isPageRevealed
    ? "translate-x-0 opacity-100"
    : pageDirection === "next"
      ? "translate-x-[12px] opacity-0"
      : "-translate-x-[12px] opacity-0";

  return (
    <>
      <main
        className="mx-auto flex w-full max-w-[640px] flex-col bg-[#191919]"
        style={{ padding: "24px 20px 56px" }}
      >
        <a
          href={backHref}
          className="flex w-fit items-center text-[#AAAAAA] transition-colors duration-300 hover:text-white"
          style={{ fontSize: 14, fontWeight: 500, lineHeight: "17px" }}
        >
          <Image
            src="/icons/arrow-back.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
            style={{ width: 16, height: 16, marginRight: 8 }}
          />
          <span>{backLabel}</span>
        </a>

        <div style={{ marginTop: 16 }}>
          <MobileCategorySummaryCard tabName={tabName} />
        </div>

        {projects.length === 0 ? (
          <div className="mt-4">
            <WorkInProgress />
          </div>
        ) : isPageLoading ? (
          <div
            className="flex w-full flex-col"
            style={{ marginTop: 32, gap: 24 }}
            aria-label="Loading projects"
          >
            {Array.from(
              {
                length: Math.min(
                  mobileProjectsPerPage,
                  Math.max(1, projects.length),
                ),
              },
              (_, index) => (
                <MobileProjectCardSkeleton key={index} />
              ),
            )}
          </div>
        ) : (
          <div
            key={`${tabName}-${page}`}
            className={`flex w-full flex-col transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileEnterClass}`}
            style={{ marginTop: 32, gap: 24 }}
          >
            {visibleProjects.map((project) => (
              <MobileProjectCard key={project.title} project={project} />
            ))}
          </div>
        )}

        {projects.length > 0 ? (
          <MobileProjectPagination
            currentPage={paginationPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        ) : null}
      </main>

      <div className="[&>footer]:mt-0">
        <Footer />
      </div>
    </>
  );
}

function TabletWorkNavigation() {
  return (
    <div
      className="mx-auto flex w-full max-w-[1024px] flex-col bg-[#191919]"
      style={{ minHeight: "100dvh" }}
    >
      <main className="flex w-full flex-col">
        <Header activePath="/work" />

        <section
          aria-labelledby="tablet-work-title"
          className="mx-auto w-full max-w-[928px] px-8 pb-14 pt-10"
        >
          <h1
            id="tablet-work-title"
            className="text-[18px] font-medium leading-none text-[#AAAAAA]"
          >
            My work
          </h1>

          <p className="mt-3 max-w-[560px] text-[13px] leading-[1.5] text-white/50">
            Browse my work by category.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {mobileWorkCategories.map((category, index) => (
              <Link
                key={category.label}
                href={category.href}
                aria-label={`Open ${category.label}`}
                className={`group flex h-[76px] items-center justify-between rounded-[18px] bg-[#262626] px-5 text-[#AAAAAA] transition-colors duration-300 hover:bg-[#303030] ${
                  index === mobileWorkCategories.length - 1 ? "col-span-2" : ""
                }`}
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
        </section>
      </main>

      <div className="mt-auto [&>footer]:mt-0">
        <Footer />
      </div>
    </div>
  );
}

function TabletProjectCard({ project }: { project: Project }) {
  const isExternalLink = project.href?.startsWith("http");

  return (
    <article className="flex min-w-0 w-full flex-col">
      <div className="group relative aspect-[406/330] w-full overflow-hidden rounded-[14px] bg-white">
        <Image
          src={project.imagePath}
          alt={`${project.title} project preview`}
          fill
          quality={100}
          unoptimized
          sizes="(max-width: 1024px) 43vw, 406px"
          className={`transition-transform duration-500 ease-out group-hover:scale-[1.025] ${
            project.imageFit === "contain" ? "object-contain" : "object-cover"
          }`}
        />

        <span className="absolute left-3 top-3 z-10 flex h-[25px] w-fit min-w-[52px] items-center justify-center rounded-[7px] bg-[#38BDF8] px-2.5 font-[family-name:var(--font-pt-sans-caption)] text-[10px] font-bold leading-none text-white">
          {project.tag}
        </span>
      </div>

      <div className="mt-3 flex w-full items-center justify-between gap-4">
        <h2 className="min-w-0 truncate text-[16px] font-medium leading-none text-white">
          {project.title}
        </h2>
        <span className="shrink-0 text-[13px] font-normal leading-none text-[#AAAAAA]">
          {project.year}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 min-h-[54px] text-[13px] font-normal leading-[1.4] text-white/70">
        {project.description}
      </p>

      {project.href ? (
        <Link
          href={project.href}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noreferrer" : undefined}
          className="group mt-3 flex h-[25px] w-fit items-center justify-center gap-2 rounded border-[0.5px] border-white px-3 text-[11px] font-normal leading-none text-white transition-colors duration-300 hover:bg-white hover:text-black"
        >
          <span>View Project</span>
          <Image
            src="/icons/Right%20Arrow.svg"
            alt=""
            width={14}
            height={14}
            aria-hidden="true"
            className="h-[14px] w-[14px] transition-all duration-300 group-hover:invert group-hover:brightness-0"
          />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          aria-label={`${project.title} project page is not available yet`}
          title="Project page coming soon"
          className="mt-3 flex h-[25px] w-fit cursor-not-allowed items-center justify-center gap-2 rounded border-[0.5px] border-white/35 px-3 text-[11px] font-normal leading-none text-white/45"
        >
          <span>View Project</span>
          <svg
            aria-hidden="true"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            className="h-[13px] w-[13px]"
          >
            <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 10V7.5C8 5.57 9.57 4 11.5 4H12.5C14.43 4 16 5.57 16 7.5V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </article>
  );
}

function TabletCategorySummaryCard({ tabName }: { tabName: TabName }) {
  const meta = getCategoryMeta(tabName);

  return (
    <div className="flex h-[64px] w-full items-center justify-between rounded-[16px] bg-[#262626] px-5 text-[#AAAAAA]">
      <span className="flex min-w-0 items-center">
        <Image
          src={meta.iconPath}
          alt=""
          width={26}
          height={26}
          aria-hidden="true"
          className="h-[26px] w-[26px] shrink-0 object-contain"
        />
        <span className="ml-3 truncate text-[14px] font-medium">
          {tabName}
        </span>
      </span>
      {meta.count !== undefined ? (
        <span className="text-[13px] font-semibold text-white">
          {meta.count}
        </span>
      ) : null}
    </div>
  );
}

const tabletProjectsPerPage = 4;

function TabletProjectDestination({
  tabName,
  backHref,
  backLabel,
}: {
  tabName: TabName;
  backHref: string;
  backLabel: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isPageRevealed, setIsPageRevealed] = useState(true);
  const [pageDirection, setPageDirection] = useState<"next" | "previous">("next");

  const projects = projectSets[tabName];
  const totalPages = Math.max(1, Math.ceil(projects.length / tabletProjectsPerPage));
  const page = Math.min(currentPage, totalPages);
  const paginationPage = pendingPage ?? page;
  const visibleProjects = projects.slice(
    (page - 1) * tabletProjectsPerPage,
    page * tabletProjectsPerPage,
  );

  const changePage = (nextPage: number) => {
    const boundedPage = Math.max(1, Math.min(totalPages, nextPage));

    if (
      boundedPage === page ||
      isPageLoading ||
      totalPages <= 1
    ) {
      return;
    }

    setPageDirection(boundedPage > page ? "next" : "previous");
    setPendingPage(boundedPage);
    setIsPageRevealed(false);

    window.setTimeout(() => {
      setIsPageLoading(true);

      window.setTimeout(() => {
        setCurrentPage(boundedPage);
        setPendingPage(null);
        setIsPageLoading(false);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsPageRevealed(true);
          });
        });
      }, 360);
    }, 140);
  };

  const tabletEnterClass = isPageRevealed
    ? "translate-x-0 opacity-100"
    : pageDirection === "next"
      ? "translate-x-[14px] opacity-0"
      : "-translate-x-[14px] opacity-0";

  return (
    <div
      className="mx-auto flex w-full max-w-[1024px] flex-col bg-[#191919]"
      style={{ minHeight: "100dvh" }}
    >
      <main className="flex w-full flex-col">
        <Header activePath="/work" />

        <section className="mx-auto w-full max-w-[928px] px-8 pb-14 pt-7">
          <Link
            href={backHref}
            className="flex w-fit items-center text-[13px] font-medium leading-none text-[#AAAAAA] transition-colors duration-300 hover:text-white"
          >
            <Image
              src="/icons/arrow-back.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
              className="mr-2 h-4 w-4"
            />
            <span>{backLabel}</span>
          </Link>

          <div className="mt-5">
            <TabletCategorySummaryCard tabName={tabName} />
          </div>

          {projects.length === 0 ? (
            <div className="mt-4">
              <WorkInProgress />
            </div>
          ) : isPageLoading ? (
            <div
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12"
              aria-label="Loading projects"
            >
              {Array.from(
                {
                  length: Math.min(
                    tabletProjectsPerPage,
                    Math.max(1, projects.length),
                  ),
                },
                (_, index) => (
                  <TabletProjectCardSkeleton key={index} />
                ),
              )}
            </div>
          ) : (
            <div
              key={`${tabName}-${page}`}
              className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-12 transition-[opacity,transform] duration-[340ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${tabletEnterClass}`}
            >
              {visibleProjects.map((project) => (
                <TabletProjectCard key={project.title} project={project} />
              ))}
            </div>
          )}

          {projects.length > 0 ? (
            <MobileProjectPagination
              currentPage={paginationPage}
              totalPages={totalPages}
              onPageChange={changePage}
            />
          ) : null}
        </section>
      </main>

      <div className="mt-auto [&>footer]:mt-0">
        <Footer />
      </div>
    </div>
  );
}

function WorkPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedMobileTab = getTabFromCategoryParam(searchParams.get("category"));
  const [activeTab, setActiveTab] = useState<TabName>(selectedMobileTab ?? "Mobile projects");
  const [hasManualDesktopSelection, setHasManualDesktopSelection] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDesktopGridLoading, setIsDesktopGridLoading] = useState(false);
  const [tabIndicator, setTabIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });
  const tabNavRef = useRef<HTMLElement>(null);
  const tabButtonRefs = useRef<Partial<Record<TabName, HTMLButtonElement | null>>>({});
  const hasRenderedDesktopGrid = useRef(false);
  const viewportMode = useViewportMode();
  const cameFromHome = searchParams.get("from") === "home";
  const categoryBackHref = cameFromHome ? "/#selected-works" : "/work";
  const categoryBackLabel = cameFromHome ? "Back to My Work" : "Back to Projects";
  const visibleDesktopTab = hasManualDesktopSelection ? activeTab : selectedMobileTab ?? activeTab;

  const projects = projectSets[visibleDesktopTab];
  const desktopTotalPages = Math.max(
    1,
    Math.ceil(projects.length / desktopProjectsPerPage),
  );
  const desktopPage = Math.min(currentPage, desktopTotalPages);
  const visibleDesktopProjects = projects.slice(
    (desktopPage - 1) * desktopProjectsPerPage,
    desktopPage * desktopProjectsPerPage,
  );

  useEffect(() => {
    if (!selectedMobileTab) return;

    const frame = requestAnimationFrame(() => {
      setActiveTab(selectedMobileTab);
      setHasManualDesktopSelection(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedMobileTab]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setCurrentPage(1);
    });

    return () => cancelAnimationFrame(frame);
  }, [visibleDesktopTab]);

  useEffect(() => {
    if (!hasRenderedDesktopGrid.current) {
      hasRenderedDesktopGrid.current = true;
      setIsDesktopGridLoading(false);
      return;
    }

    setIsDesktopGridLoading(true);

    const timer = window.setTimeout(() => {
      setIsDesktopGridLoading(false);
    }, 360);

    return () => window.clearTimeout(timer);
  }, [visibleDesktopTab, desktopPage]);

  useLayoutEffect(() => {
    if (viewportMode !== "desktop") return;

    const updateIndicator = () => {
      const nav = tabNavRef.current;
      const activeButton = tabButtonRefs.current[visibleDesktopTab];

      if (!nav || !activeButton) return;

      const navRect = nav.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setTabIndicator({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
        ready: true,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [visibleDesktopTab, viewportMode]);

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function goToNextPage() {
    setCurrentPage((page) => Math.min(desktopTotalPages, page + 1));
  }

  if (viewportMode === "mobile") {
    if (selectedMobileTab) {
      return (
        <MobileProjectDestination
          key={selectedMobileTab}
          tabName={selectedMobileTab}
          backHref={categoryBackHref}
          backLabel={categoryBackLabel}
        />
      );
    }

    return (
      <>
        <main className="mx-auto flex w-full max-w-[640px] flex-col bg-[#191919] pb-[32px]">
          <Header activePath="/work" />
          <MobileWorkNavigation />
        </main>

        <div className="mt-[32px] [&>footer]:mt-0">
          <Footer />
        </div>
      </>
    );
  }

  if (viewportMode === "tablet") {
    if (selectedMobileTab) {
      return (
        <TabletProjectDestination
          key={selectedMobileTab}
          tabName={selectedMobileTab}
          backHref={categoryBackHref}
          backLabel={categoryBackLabel}
        />
      );
    }

    return <TabletWorkNavigation />;
  }

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-[80px]">
        <div className="-mx-[80px]">
          <Header activePath="/work" />
        </div>

        <section aria-labelledby="work-title" className="flex w-full flex-col pt-[20px]">
          <h1 id="work-title" className="sr-only">
            My Work
          </h1>

          <nav
            ref={tabNavRef}
            aria-label="Project categories"
            className="relative mb-[36px] flex w-full flex-row items-end gap-8 max-[600px]:gap-4"
          >
            {tabs.map((tab) => {
              const isActive = visibleDesktopTab === tab.name;

              return (
                <button
                  ref={(element) => {
                    tabButtonRefs.current[tab.name] = element;
                  }}
                  key={tab.name}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    if (visibleDesktopTab === tab.name) return;

                    setHasManualDesktopSelection(true);
                    setIsDesktopGridLoading(true);

                    const params = new URLSearchParams(searchParams.toString());
                    params.set("category", categorySlugs[tab.name]);

                    router.replace(`/work?${params.toString()}`, {
                      scroll: false,
                    });

                    setActiveTab(tab.name);
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer pb-[7px] text-[13.3px] leading-none font-bold transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-[#999999] hover:text-[#FFFFFF]"
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
            projects={visibleDesktopProjects}
            isLoading={isDesktopGridLoading}
            transitionKey={`${visibleDesktopTab}-${desktopPage}`}
          />

          {desktopTotalPages > 1 ? (
            <div className="mt-[48px] flex w-full items-center justify-center gap-[5px]">
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={desktopPage === 1}
                className={
                  desktopPage === 1
                    ? "text-[13px] leading-none font-semibold text-[#AAAAAA]"
                    : "cursor-pointer text-[13px] leading-none font-bold text-[#FFFFFF] transition-colors hover:text-[#38BDF8]"
                }
              >
                Prev
              </button>

              {Array.from(
                { length: desktopTotalPages },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-current={desktopPage === page ? "page" : undefined}
                  className={
                    desktopPage === page
                      ? "flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#38BDF8] text-[13px] font-semibold text-white"
                      : "flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[8px] bg-white text-[13px] font-semibold text-black transition-colors hover:bg-gray-200"
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={goToNextPage}
                disabled={desktopPage === desktopTotalPages}
                className={
                  desktopPage === desktopTotalPages
                    ? "text-[13px] leading-none font-semibold text-[#AAAAAA]"
                    : "cursor-pointer text-[13px] leading-none font-bold text-[#FFFFFF] transition-colors hover:text-[#38BDF8]"
                }
              >
                Next
              </button>
            </div>
          ) : null}
        </section>
      </main>

      <div className="mt-[56px] [&>footer]:mt-0">
        <Footer />
      </div>
    </>
  );
}
export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkPageContent />
    </Suspense>
  );
}











