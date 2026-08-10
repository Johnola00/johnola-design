"use client";

import { useEffect, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const overviewColumns = [
  [
    { label: "Role", value: "Design Team Lead & Lead Product Designer" },
    { label: "Timeline", value: "October - November 2026" },
    { label: "Duration", value: "4 Weeks" },
  ],
  [
    { label: "Platform", value: "Responsive Web" },
    { label: "Industry", value: "Travel & Leisure" },
    { label: "Project Type", value: "Marketplace (0-to-1 MVP)" },
  ],
];

const focusAreas = [
  "Product Strategy",
  "End-to-End UX/UI",
  "Responsive Design",
  "Team Leadership",
  "Design System",
];

const tools = ["Figma", "FigJam", "ChatGpt", "Google Meet", "Slack"];
const coreExperienceImages = [
  "/projects/web-projects/travel-ng/core-experience-01.webp",
  "/projects/web-projects/travel-ng/core-experience-02.webp",
];

const coreExperienceTwoImages = [
  "/projects/web-projects/travel-ng/core-experience-03.webp",
];

const coreExperienceThreeImages = [
  "/projects/web-projects/travel-ng/core-experience-04.webp",
];

const coreExperienceDecisions = [
  "Combined multiple travel services into one booking flow.",
  "Reduced decision fatigue by presenting curated packages.",
  "Clear package summaries before payment.",
  "Clear package summaries before payment.",
];


function ExpandableCoreCopy({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-[20px]">
      <div
        className={`relative flex flex-col gap-[18px] overflow-hidden font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8] transition-[max-height] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:max-h-none ${
          isExpanded ? "max-md:max-h-[520px]" : "max-md:max-h-[92px]"
        }`}
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {!isExpanded ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-8 bg-gradient-to-t from-[#262626] via-[#262626]/90 to-transparent max-md:block"
          />
        ) : null}
      </div>

      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
        className="mt-[10px] hidden items-center gap-1.5 text-left font-inter text-[12px] font-medium leading-none text-[#38BDF8] transition-colors duration-200 hover:text-white max-md:inline-flex"
      >
        <span>{isExpanded ? "Show Less" : "See More"}</span>
        <span
          aria-hidden="true"
          className="inline-block text-[13px] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ↓
        </span>
      </button>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-inter text-[16px] font-semibold leading-[1.2] text-[#F5F5F5] md:leading-none">
        {label} :
      </p>
      <p className="mt-[8px] font-inter text-[13px] font-normal leading-[1.35] text-[#B8B8B8] md:mt-[10px] md:leading-none">
        {value}
      </p>
    </div>
  );
}

function BulletColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-inter text-[16px] font-semibold leading-none text-[#F5F5F5]">
        {title}
      </p>
      <ul className="mt-[16px] flex flex-col gap-[12px]">
        {items.map((item) => (
          <li key={item} className="font-inter text-[13px] font-bold leading-none text-[#B8B8B8]">
            &bull; {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TravelNgProjectPage() {
  const [activeCoreImage, setActiveCoreImage] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState(coreExperienceImages);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  const [viewerExpanded, setViewerExpanded] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      [
        ...coreExperienceImages,
        ...coreExperienceTwoImages,
        ...coreExperienceThreeImages,
        "/projects/web-projects/travel-ng/information-architecture.webp",
      ].forEach((src) => {
        const image = new window.Image();
        image.decoding = "async";
        image.src = src;
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  const showPreviousCoreImage = () => {
    setActiveCoreImage((current) =>
      current === 0 ? coreExperienceImages.length - 1 : current - 1,
    );
  };

  const showNextCoreImage = () => {
    setActiveCoreImage((current) =>
      current === coreExperienceImages.length - 1 ? 0 : current + 1,
    );
  };

  const openViewer = (images: string[], index = 0) => {
    setViewerImages(images);
    setViewerImageIndex(index);
    setViewerExpanded(false);
    setViewerOpen(true);
  };
  const showPreviousViewerImage = () => {
    setViewerImageIndex((current) =>
      current === 0 ? viewerImages.length - 1 : current - 1,
    );
  };

  const showNextViewerImage = () => {
    setViewerImageIndex((current) =>
      current === viewerImages.length - 1 ? 0 : current + 1,
    );
  };

  const toggleLandscapeViewer = () => {
    setViewerExpanded((current) => !current);
  };

  const closeViewer = () => {
    setViewerExpanded(false);
    setViewerOpen(false);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - endX;

    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        showNextCoreImage();
      } else {
        showPreviousCoreImage();
      }
    }

    setTouchStartX(null);
  };

  const handleViewerTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - endX;

    if (viewerImages.length > 1 && Math.abs(distance) > 40) {
      if (distance > 0) {
        showNextViewerImage();
      } else {
        showPreviousViewerImage();
      }
    }

    setTouchStartX(null);
  };
  return (
    <>
      <main className="min-h-screen w-full bg-[#191919] text-[#F5F5F5]">
        <Header activePath="/work" />

        <section className="mx-auto flex w-full max-w-[1440px] flex-col px-[80px] pb-[56px] pt-[56px] max-md:px-5 max-md:pt-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <div>
              <h1 className="font-inter text-[19px] font-semibold leading-none text-[#F5F5F5]">
                TravelNG - Travel & Leisure
              </h1>
              <p className="mt-[20px] font-inter text-[13px] font-normal leading-none text-[#909090]">
                Designing a Two-Sided Travel Marketplace for Nigeria
              </p>
            </div>

            <div className="mt-[32px] w-full overflow-hidden bg-[#E6F7FF]">
              <Image
                src="/projects/web-projects/travel-ng/hero.webp"
                alt="Travel.ng marketplace interface presentation"
                width={1280}
                height={868}
                priority
                quality={100}
                unoptimized
                sizes="(max-width: 767px) calc(100vw - 40px), 1280px"
                className="h-auto w-full object-contain"
              />
            </div>

            {/* Full project metadata for tablet and desktop */}
            <div className="mt-[32px] hidden min-h-[205px] w-full grid-cols-2 gap-x-[72px] gap-y-10 rounded-[24px] bg-[#262626] px-[56px] py-[32px] md:grid lg:grid-cols-4 lg:gap-y-0">
              {overviewColumns.map((column, index) => (
                <div key={index} className="flex flex-col justify-start gap-[28px]">
                  {column.map((item) => (
                    <DetailItem key={item.label} label={item.label} value={item.value} />
                  ))}
                </div>
              ))}

              <BulletColumn title="Focus Areas" items={focusAreas} />
              <BulletColumn title="Tools" items={tools} />
            </div>

            {/* Compact project metadata for mobile */}
            <div className="mt-[28px] w-full rounded-[24px] bg-[#262626] px-6 py-2 md:hidden">
              {[
                ["Role", "Design Team Lead & Lead Product Designer"],
                ["Duration", "4 Weeks"],
                ["Platform", "Responsive Web"],
                ["Project Type", "Marketplace (0-to-1 MVP)"],
              ].map(([label, value], index, items) => (
                <div
                  key={label}
                  className={`grid grid-cols-[104px_minmax(0,1fr)] items-start gap-4 py-5 ${
                    index < items.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <p className="font-inter text-[14px] font-semibold leading-[1.35] text-[#F5F5F5]">
                    {label} :
                  </p>
                  <p className="font-inter text-[14px] font-normal leading-[1.45] text-[#B8B8B8]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-[48px] w-full">
              <h2 className="font-inter text-[19px] font-semibold leading-none text-[#F5F5F5]">
                Project Overview
              </h2>
              <div className="mt-[24px] flex flex-col gap-[18px] font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8]">
                <p>
                  Travel.ng was designed to simplify how people plan and book travel experiences across Nigeria.
                  Instead of asking travelers to book hotels, flights, transportation, and activities from different platforms, we combined everything into curated travel packages that can be reserved through a single booking flow.
                </p>
                <p>
                  At the same time, the platform gives travel agencies and independent organizers a dedicated workspace to create packages, manage listings, communicate with travelers, and grow their business.
                </p>
                <p>
                  My responsibility extended beyond interface design. As Design Team Lead, I helped define the overall product structure, coordinated the design team, maintained consistency across the experience, and ensured we delivered a complete MVP within the project timeline.
                </p>
              </div>
            </div>

            <div className="mt-[36px] w-full">
              <h2 className="font-inter text-[19px] font-semibold leading-none text-[#F5F5F5]">
                Design Leadership &amp; Team Execution
              </h2>
              <div className="mt-[24px] flex flex-col gap-[18px] font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8]">
                <p>
                  Building Travel.ng required multiple designers to work on different parts of the product at the same time. My role was to keep everyone aligned while making sure the experience felt like it came from one team instead of several individual designers.
                </p>
                <p>
                  I divided the product into clear workstreams, assigned ownership of features, and established shared design standards before implementation began. Throughout the project, I reviewed work regularly, coordinated design discussions, and provided feedback to maintain consistency across layouts, components, spacing, and interaction patterns.
                </p>
                <p>
                  As the product evolved, I also made final design decisions when multiple solutions were proposed, helping the team move forward without losing momentum. This allowed us to deliver a complete MVP that was organized, developer-ready, and consistent from onboarding through booking and agency management.
                </p>
              </div>
            </div>

            <div className="mt-[36px] w-full">
              <h2 className="font-inter text-[19px] font-semibold leading-none text-[#F5F5F5]">
                Information Architecture - Building for two different users
              </h2>
              <div className="mt-[24px] flex flex-col gap-[18px] font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8]">
                <p>
                  Travel.ng serves two groups with very different goals.<br />
                  On one side are travelers looking for trusted travel experiences they can discover, compare, and book with confidence.
                </p>
                <p>
                  On the other side are travel agencies and experience organizers who need simple tools to create packages, manage listings, receive bookings, and communicate with customers.
                </p>
                <p>
                  Rather than treating these as separate products, we designed them as connected experiences within one ecosystem. This ensured that every action taken by an organizer directly improved the booking experience for travelers, while every traveler interaction provided value back to agencies.
                </p>
              </div>

              <div className="mt-[32px] w-full overflow-hidden">
                <Image
                  src="/projects/web-projects/travel-ng/information-architecture.webp"
                  alt="Travel.ng information architecture showing traveler and agency experiences"
                  width={1280}
                  height={721}
                  unoptimized
                  sizes="(max-width: 767px) calc(100vw - 40px), 1280px"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
            <div className="mt-[56px] w-full">
              <div className="rounded-[24px] bg-[#262626] p-[24px] max-md:p-4">
                <button
                  type="button"
                  onClick={() => openViewer(coreExperienceImages, activeCoreImage)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="group relative block w-full overflow-hidden rounded-[20px] bg-[#DDF0F7] text-left outline-none"
                  aria-label="Open Core Experience 01 image viewer"
                >
                  <Image
                    key={coreExperienceImages[activeCoreImage]}
                    src={coreExperienceImages[activeCoreImage]}
                    alt="Travel.ng core experience screens for discovering and booking travel packages"
                    width={1230}
                    height={712}
                    unoptimized
                    sizes="(max-width: 767px) calc(100vw - 72px), 1230px"
                    className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 font-inter text-[12px] font-semibold leading-none text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                    {activeCoreImage + 1}/{coreExperienceImages.length}
                  </span>
                </button>

                <div className="mt-[20px] flex items-center justify-between gap-4">
                  <h2 className="font-inter text-[19px] font-normal leading-none text-[#F5F5F5]">
                    Core Experience 01 - Discovering and Booking Travel Packages
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={showPreviousCoreImage}
                      className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white"
                      aria-label="Previous core experience image"
                    >
                      <Image
                        src="/icons/viewer-arrow-left.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] transition-all duration-300 group-hover:invert"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={showNextCoreImage}
                      className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white"
                      aria-label="Next core experience image"
                    >
                      <Image
                        src="/icons/viewer-arrow-right.svg"
                        alt=""
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] transition-all duration-300 group-hover:invert"
                      />
                    </button>
                  </div>
                </div>

                <ExpandableCoreCopy
                  paragraphs={[
                    "The traveler experience was designed around one goal: reducing the complexity of trip planning.",
                    "Instead of asking users to search separately for hotels, flights, and activities, Travel.ng presents complete travel packages that combine everything into a single offering. Users can browse featured experiences from the landing page or dashboard, search destinations, filter by travel categories, and compare available packages before making a reservation.",
                    "The booking flow guides travelers from package discovery to package details, reservation, payment, and booking confirmation while keeping important information visible throughout the process.",
                    "Special attention was given to package details, allowing travelers to review itineraries, inclusions, pricing, available dates, accommodation options, and optional flight support before committing to a booking.",
                  ]}
                />
              </div>

              <div className="mt-[40px]">
                <h2 className="font-inter text-[19px] font-semibold leading-none text-[#F5F5F5]">
                  Key UX Decisions
                </h2>
                <ul className="mt-[24px] flex flex-col gap-[12px] font-inter text-[13px] font-bold leading-[15px] text-[#B8B8B8]">
                  {coreExperienceDecisions.map((decision, index) => (
                    <li key={`${decision}-${index}`}>- {decision}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-[56px] w-full">
              <div className="rounded-[24px] bg-[#262626] p-[24px] max-md:p-4">
                <button
                  type="button"
                  onClick={() => openViewer(coreExperienceTwoImages, 0)}
                  className="group relative block w-full overflow-hidden rounded-[20px] bg-[#DDF0F7] text-left outline-none"
                  aria-label="Open Core Experience 02 image viewer"
                >
                  <Image
                    src={coreExperienceTwoImages[0]}
                    alt="Travel.ng package creation workflow screens"
                    width={1230}
                    height={712}
                    unoptimized
                    sizes="(max-width: 767px) calc(100vw - 72px), 1230px"
                    className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </button>

                <div className="mt-[20px]">
                  <h2 className="font-inter text-[19px] font-normal leading-none text-[#F5F5F5]">
                    Core Experience 02 - Creating Travel Packages with Ease
                  </h2>
                </div>

                <ExpandableCoreCopy
                  paragraphs={[
                    "The second side of the marketplace was designed for travel agencies and organizers who create and publish travel experiences for travelers to discover and book.",
                    "Rather than exposing users to a complex admin system, we designed a guided workflow that makes package creation straightforward and easy to manage.",
                    "Organizers can upload package images, enter travel information, define pricing, add hotel and flight inclusions, configure itineraries, and publish packages from one structured workspace.",
                  ]}
                />
              </div>
            </div>
            <div className="mt-[56px] w-full">
              <div className="rounded-[24px] bg-[#262626] p-[24px] max-md:p-4">
                <button
                  type="button"
                  onClick={() => openViewer(coreExperienceThreeImages, 0)}
                  className="group relative block w-full overflow-hidden rounded-[20px] bg-[#DDF0F7] text-left outline-none"
                  aria-label="Open Core Experience 03 image viewer"
                >
                  <Image
                    src={coreExperienceThreeImages[0]}
                    alt="Travel.ng messaging and organizer contact experience"
                    width={1230}
                    height={712}
                    unoptimized
                    sizes="(max-width: 767px) calc(100vw - 72px), 1230px"
                    className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </button>

                <div className="mt-[20px]">
                  <h2 className="font-inter text-[19px] font-normal leading-none text-[#F5F5F5]">
                    Core Experience 03 - Giving travelers a direct way to reach organizers.
                  </h2>
                </div>

                <ExpandableCoreCopy
                  paragraphs={[
                    "Travelers can contact organizers directly through in-app messaging before or after making a booking.",
                    "This helps users ask questions about packages, clarify travel details, and receive updates without leaving the platform. Keeping conversations inside the product also creates a better experience for both travelers and organizers.",
                  ]}
                />
              </div>
            </div>

            <section className="mt-[56px] w-full">
              <h2 className="font-inter text-[19px] font-semibold leading-none text-[#F5F5F5]">
                Future Improvements
              </h2>
              <p className="mt-[24px] font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8]">
                As the product grew, we identified several opportunities that could make the platform even stronger.
              </p>

              <h3 className="mt-[40px] font-inter text-[17px] font-normal leading-none text-[#F5F5F5]">
                Agency Profiles
              </h3>
              <p className="mt-[20px] font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8]">
                Verified organizer profiles with badges, business information, reviews, and published packages to help travelers book with more confidence.
              </p>

              <h3 className="mt-[32px] font-inter text-[17px] font-normal leading-none text-[#F5F5F5]">
                Support Center
              </h3>
              <p className="mt-[20px] font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8]">
                A dedicated support experience where travelers and organizers can resolve payment issues, booking disputes, and request assistance without leaving the platform.
              </p>
            </section>

            <section className="mt-[64px] w-full">
              <h2 className="font-inter text-[19px] font-semibold leading-none text-[#F5F5F5]">
                Outcome - Delivering a complete marketplace MVP.
              </h2>
              <div className="mt-[24px] flex flex-col gap-[18px] font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8]">
                <p>
                  By the end of the project, the team delivered a responsive marketplace covering both the traveler and agency experiences.
                </p>
                <p>
                  The final design included discovery, booking, package creation, dashboard management, messaging, responsive layouts, and reusable components ready for developer handoff.
                </p>
                <p>
                  Beyond the product itself, this project strengthened my experience leading designers while keeping a large product consistent across multiple contributors.
                </p>
              </div>
            </section>

            <section className="mt-[64px] w-full">
              <h2 className="font-inter text-[19px] font-semibold leading-none text-[#F5F5F5]">
                Reflection - What I learned
              </h2>
              <div className="mt-[24px] flex flex-col gap-[18px] font-inter text-[13px] font-normal leading-[15px] text-[#B8B8B8]">
                <p>
                  Leading this project taught me that designing a marketplace is about much more than creating individual screens.
                </p>
                <p>
                  The biggest challenge was keeping different parts of the product connected while several designers worked on different features at the same time. Maintaining shared components, reviewing work regularly, and making clear design decisions helped us deliver a product that felt consistent from start to finish.
                </p>
                <p>
                  If I continued working on Travel.ng, I would focus on expanding agency tools, improving post-booking management, and adding more trust features that help travelers book with confidence.
                </p>
              </div>
            </section>
          </div>
        </section>
      </main>

      {viewerOpen
        ? createPortal(
      <div
        className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
        style={{ zIndex: 2147483647 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleViewerTouchEnd}
      >
              <button
                type="button"
                onClick={closeViewer}
                className="group fixed right-6 top-6 z-[2147483647] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 shadow-[0_0_24px_rgba(0,0,0,0.45)] transition-colors hover:bg-white"
                aria-label="Close image viewer"
              >
                <Image
                  src="/icons/viewer-close.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 transition-all duration-300 group-hover:invert"
                />
              </button>

              {viewerImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPreviousViewerImage}
                    className="group fixed left-6 top-1/2 z-[2147483647] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white md:flex"
                    aria-label="Previous image"
                  >
                    <Image
                      src="/icons/viewer-arrow-left.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 transition-all duration-300 group-hover:invert"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={showNextViewerImage}
                    className="group fixed right-6 top-1/2 z-[2147483647] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white md:flex"
                    aria-label="Next image"
                  >
                    <Image
                      src="/icons/viewer-arrow-right.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 transition-all duration-300 group-hover:invert"
                    />
                  </button>
                </>
              ) : null}

              {viewerImages.length > 1 ? (
                <div
                  className={`fixed left-1/2 z-[2147483647] flex -translate-x-1/2 flex-col items-center gap-3 transition-[bottom] duration-300 ${
                    viewerExpanded ? "bottom-5" : "bottom-[30px]"
                  }`}
                >
                  <div
                    className="flex items-center gap-[7px] md:hidden"
                    aria-label={`Image ${viewerImageIndex + 1} of ${viewerImages.length}`}
                  >
                    {viewerImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setViewerImageIndex(index);
                        }}
                        aria-label={`View image ${index + 1}`}
                        aria-current={index === viewerImageIndex ? "true" : undefined}
                        className={`h-[7px] rounded-full transition-[width,background-color] duration-300 ${
                          index === viewerImageIndex
                            ? "w-[18px] bg-white"
                            : "w-[7px] bg-white/35"
                        }`}
                      />
                    ))}
                  </div>

                  {!viewerExpanded ? (
                    <span className="rounded-full bg-white/10 px-4 py-2 font-inter text-[13px] font-semibold text-white">
                      {viewerImageIndex + 1}/{viewerImages.length}
                    </span>
                  ) : null}
                </div>
              ) : null}

              <button
                type="button"
                onClick={toggleLandscapeViewer}
                aria-label={viewerExpanded ? "Exit expanded inspection view" : "Open expanded inspection view"}
                aria-pressed={viewerExpanded}
                className="fixed bottom-[30px] right-5 z-[2147483647] hidden h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#242424]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[background-color,transform] duration-300 hover:bg-[#323232] active:scale-95 max-md:flex"
              >
                {viewerExpanded ? (
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M9 3V9H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 3V9H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 21V15H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 21V15H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M9 3H3V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 3H21V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 21H3V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 21H21V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>

              <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                <Image
                  key={viewerImages[viewerImageIndex]}
                  src={viewerImages[viewerImageIndex]}
                  alt="Expanded Travel.ng core experience screen"
                  width={1230}
                  height={712}
                  loading="eager"
                  unoptimized
                  sizes="100vw"
                  style={
                    viewerExpanded
                      ? {
                          width: "min(80dvh, 170dvw)",
                          maxWidth: "none",
                          maxHeight: "none",
                          height: "auto",
                          transform: "rotate(90deg)",
                          transformOrigin: "center",
                        }
                      : undefined
                  }
                  className={`rounded-[12px] object-contain transition-[width,max-width,max-height,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    viewerExpanded
                      ? "max-md:shrink-0"
                      : "max-h-[92vh] w-auto max-w-[94vw]"
                  }`}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
      <Footer />
    </>
  );
}






