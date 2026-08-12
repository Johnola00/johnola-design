"use client";

import { useEffect, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const projectRoot = "/projects/mobile-projects/hype-and-wear";

const heroImage = `${projectRoot}/HWHERO.png`;
const typographyImage = `${projectRoot}/HWTC.png`;

const caseStudyImages = [
  {
    title: "Video-First Product Discovery",
    src: `${projectRoot}/Productdiscovery.png`,
    alt: "Hype and Wear video-first product discovery interface documentation",
  },
  {
    title: "Product Details and Selection",
    src: `${projectRoot}/Productdetails.png`,
    alt: "Hype and Wear product details and selection interface documentation",
  },
  {
    title: "Focused Checkout",
    src: `${projectRoot}/Checkout.png`,
    alt: "Hype and Wear focused checkout interface documentation",
  },
];

const overviewColumns = [
  [
    { label: "Role", value: "Product Designer" },
    { label: "Timeline", value: "March 2026" },
    { label: "Duration", value: "1 Day" },
  ],
  [
    { label: "Platform", value: "Mobile App" },
    { label: "Industry", value: "Fashion E-commerce" },
    { label: "Project Type", value: "UI & Interaction Concept" },
  ],
];

const focusAreas = [
  "Video Commerce",
  "Mobile UI",
  "Interaction Design",
  "Checkout",
];

const tools = ["Figma", "ChatGpt"];

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
          <li
            key={item}
            className="font-inter text-[13px] font-bold leading-none text-[#B8B8B8]"
          >
            &bull; {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectImageBlock({
  title,
  src,
  alt,
  onOpen,
}: {
  title: string;
  src: string;
  alt: string;
  onOpen: () => void;
}) {
  return (
    <section className="mt-[32px] w-full">
      <div className="overflow-hidden rounded-[24px] bg-[#262626] p-[24px] max-md:p-4">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${title} image`}
          className="group relative block w-full overflow-hidden rounded-[20px] bg-[#E8F6E8] text-left outline-none max-md:-mx-4 max-md:-mt-4 max-md:w-[calc(100%+32px)] max-md:!rounded-none"
        >
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={835}
            unoptimized
            sizes="(max-width: 767px) calc(100vw - 40px), 1232px"
            className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.008]"
          />
        </button>

        <h2 className="mt-[16px] font-inter text-[18px] font-medium leading-[1.3] text-[#F5F5F5] md:text-[20px]">
          {title}
        </h2>
      </div>
    </section>
  );
}

export default function HypeWearProjectPage() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  const [viewerExpanded, setViewerExpanded] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      [typographyImage, ...caseStudyImages.map((image) => image.src)].forEach(
        (src) => {
          const image = new window.Image();
          image.decoding = "async";
          image.src = src;
        },
      );
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!viewerOpen) return;

    caseStudyImages.forEach((item) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = item.src;
    });
  }, [viewerOpen]);

  const openViewer = (index: number) => {
    setViewerImageIndex(index);
    setViewerExpanded(false);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerExpanded(false);
    setViewerOpen(false);
  };

  const showPreviousViewerImage = () => {
    setViewerImageIndex((current) =>
      current === 0 ? caseStudyImages.length - 1 : current - 1,
    );
  };

  const showNextViewerImage = () => {
    setViewerImageIndex((current) =>
      current === caseStudyImages.length - 1 ? 0 : current + 1,
    );
  };

  const toggleLandscapeViewer = () => {
    setViewerExpanded((current) => !current);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleViewerTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - endX;

    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        showNextViewerImage();
      } else {
        showPreviousViewerImage();
      }
    }

    setTouchStartX(null);
  };

  const activeViewerImage = caseStudyImages[viewerImageIndex];

  return (
    <main className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      <Header />

      <section className="mx-auto w-full max-w-[1440px] px-5 pb-[96px] pt-[32px] lg:px-[80px] lg:pt-[48px]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div>
            <h1 className="font-inter text-[18px] font-medium leading-none text-[#F5F5F5] lg:text-[24px]">
              Hype &amp; Wear - Fashion E-commerce
            </h1>
            <p className="mt-[16px] font-inter text-[13px] font-normal leading-[1.35] text-[#909090] lg:text-[15px]">
              Designing a Video-First Fashion Shopping Experience
            </p>
          </div>

          <div className="mt-[32px] w-full overflow-hidden">
            <Image
              src={heroImage}
              alt="Hype and Wear video-first fashion shopping experience"
              width={1440}
              height={978}
              priority
              unoptimized
              sizes="(max-width: 1024px) calc(100vw - 40px), 1280px"
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Full project metadata for tablet and desktop */}
          <section className="mt-[32px] hidden w-full rounded-[28px] bg-[#262626] px-6 py-6 md:block lg:rounded-[32px] lg:px-[56px] lg:py-[30px]">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-[88px]">
              {overviewColumns.map((column, index) => (
                <div key={index} className="flex flex-col gap-[22px]">
                  {column.map((item) => (
                    <DetailItem
                      key={item.label}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </div>
              ))}

              <BulletColumn title="Focus Areas" items={focusAreas} />
              <BulletColumn title="Tools" items={tools} />
            </div>
          </section>

          {/* Compact project metadata for mobile */}
          <section className="mt-[28px] w-full rounded-[24px] bg-[#262626] px-6 py-2 md:hidden">
            {[
              ["Role", "Product Designer"],
              ["Duration", "1 Day"],
              ["Platform", "Mobile App"],
              ["Project Type", "UI & Interaction Concept"],
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
          </section>

          <section className="mt-[28px] w-full">
            <div>
              <h2 className="font-inter text-[18px] font-semibold leading-[1.25] text-[#F5F5F5]">
                About the Project
              </h2>
              <p className="mt-[12px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                Hype &amp; Wear is a mobile fashion e-commerce concept built
                around video-first product discovery. The experience allows
                users to discover clothing through short-form content, view
                product details, select available options, and continue into
                checkout without losing context.
              </p>
            </div>

            <div className="mt-[28px]">
              <h2 className="font-inter text-[18px] font-semibold leading-[1.25] text-[#F5F5F5]">
                Role &amp; Project Scope
              </h2>
              <p className="mt-[12px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                I designed the high-fidelity mobile interface and interaction
                structure for the concept. My focus was on balancing immersive
                video content with the product information and actions users
                need to make a purchase.
              </p>
              <p className="mt-[14px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                The scope covered three connected stages: discovering a product
                through video, reviewing its details and available variants,
                and completing the purchase through a focused checkout sheet.
              </p>
            </div>
          </section>

          <section className="mt-[36px] w-full overflow-hidden">
            <Image
              src={typographyImage}
              alt="Hype and Wear typography and color system"
              width={1440}
              height={765}
              unoptimized
              sizes="(max-width: 1024px) calc(100vw - 40px), 1280px"
              className="h-auto w-full object-contain"
            />
          </section>

          {caseStudyImages.map((image, index) => (
            <ProjectImageBlock
              key={image.title}
              title={image.title}
              src={image.src}
              alt={image.alt}
              onOpen={() => openViewer(index)}
            />
          ))}
        </div>
      </section>

      {viewerOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md max-md:p-4"
              style={{ zIndex: 2147483647 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleViewerTouchEnd}
            >
              <button
                type="button"
                onClick={closeViewer}
                className="group fixed right-6 top-6 z-[2147483647] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 shadow-[0_0_24px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:bg-white max-md:right-4 max-md:top-4"
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

              <button
                type="button"
                onClick={showPreviousViewerImage}
                className="group fixed left-6 top-1/2 z-[2147483647] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 hover:bg-white md:flex"
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
                className="group fixed right-6 top-1/2 z-[2147483647] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 hover:bg-white md:flex"
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

              {!viewerExpanded ? (
                <span className="fixed bottom-8 left-1/2 z-[2147483647] -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 font-inter text-[13px] font-semibold text-white">
                  {viewerImageIndex + 1}/{caseStudyImages.length}
                </span>
              ) : null}

              <button
                type="button"
                onClick={toggleLandscapeViewer}
                aria-label={
                  viewerExpanded
                    ? "Exit expanded inspection view"
                    : "Open expanded inspection view"
                }
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
                  key={activeViewerImage.src}
                  src={activeViewerImage.src}
                  alt={activeViewerImage.alt}
                  width={1440}
                  height={835}
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
    </main>
  );
}
