"use client";

import { useEffect, useState, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileComparisonCarousel } from "./components/MobileComparisonCarousel";

const overviewColumns = [
  [
    { label: "Role", value: "Product Designer (Contract)" },
    { label: "Timeline", value: "April 2026 - July 2026" },
    { label: "Duration", value: "4 Months" },
  ],
  [
    { label: "Platform", value: "Responsive Web & Mobile" },
    { label: "Industry", value: "Fashion E-commerce" },
    { label: "Project Type", value: "Video-first Fashion Marketplace" },
  ],
];

const focusAreas = [
  "Product Discovery",
  "E-commerce UX/UI",
  "Checkout Experience",
  "Account Management",
  "Responsive Design",
  "Product QA",
];

const tools = ["Figma", "Google Docs", "ChatGpt", "Google Meet", "Google Sheets"];

const productDiscoveryImages = [
  "/projects/web-projects/hedgewears-fashion-ecommerce/product-discovery-01-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/product-discovery-02-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/product-discovery-03-delivery.webp",
];

const productDiscoveryDocumentation = [
  {
    gap: "Product cards had no direct Add to Cart option",
    improvement: "Added quick Add to Cart with quick product customization",
    impact: "Users can select size, colour and quantity without leaving the Homepage",
  },
  {
    gap: "Pricing lacked clear hierarchy",
    improvement: "Improved the pricing hierarchy and treatment of discounted prices",
    impact: "Makes the actual selling price easier to identify",
  },
  {
    gap: "Video shopping wasn't integrated into the main shopping experience",
    improvement: "Added Explore to the header and Watch & Shop within product discovery",
    impact: "Gives video-first shopping clear entry points alongside traditional browsing",
  },
  {
    gap: "The header lacked clear states and key shopping information",
    improvement:
      "Added active link states, guest and signed-in header states, cart/wishlist access, notifications and HedgeCoin balance",
    impact:
      "Makes the header more informative while keeping key shopping actions accessible across user states",
  },
];


const mobileProductDiscoveryImages = [
  "/projects/web-projects/hedgewears-fashion-ecommerce/mobile-product-discovery-01-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/mobile-product-discovery-02-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/mobile-product-discovery-03-delivery.webp",
];

const mobileProductDiscoveryDocumentation = [
  {
    gap: "Heavy use of black across controls and navigation made the interface harder to scan.",
    improvement:
      "Reduced unnecessary visual emphasis and introduced clearer active and inactive states.",
    impact: "Creates a lighter hierarchy and makes important actions easier to identify.",
  },
  {
    gap: "Categories occupied significant vertical space while showing only a small part of the catalogue.",
    improvement:
      "Redesigned categories as a compact, horizontally scrollable section that works alongside search.",
    impact: "Gives users faster access to more product categories while keeping more products visible on screen.",
  },
  {
    gap: "The bottom navigation lacked clear states and had no direct route to video shopping.",
    improvement:
      "Improved active/inactive states and introduced Explore as a primary navigation destination.",
    impact:
      "Makes navigation easier to understand and gives video shopping a consistent entry point on mobile.",
  },
  {
    gap: "Product discovery was mainly based around standard product cards.",
    improvement: "Integrated video discovery and Watch & Shop into the mobile product feed.",
    impact:
      "Lets users move between traditional browsing and video-led product discovery within the same shopping experience.",
  },
  {
    gap: "The category flow required users to move through multiple screens to reach more specific products.",
    improvement:
      "Restructured the category hierarchy with categories and subcategories available within the same browsing view.",
    impact:
      "Reduces navigation steps and makes a broader range of the catalogue easier to discover.",
  },
];


const purchaseJourneyImages = [
  "/projects/web-projects/hedgewears-fashion-ecommerce/purchase-journey-01-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/purchase-journey-02-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/purchase-journey-03-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/purchase-journey-04-delivery.webp",
];

const purchaseJourneyDocumentation = [
  {
    gap: "Product details lacked clear hierarchy, making product information and purchase actions compete for attention.",
    improvement:
      "Reorganized the layout, improved the placement of product information, reviews, specifications, colour and size selectors, and introduced clearer CTA actions.",
    impact:
      "Makes purchasing decisions easier by keeping product information and actions organized.",
  },
  {
    gap: "The cart provided only limited editing options, making users leave the cart to fully customize their selected items.",
    improvement:
      "Added a Change option directly within the cart so colour, size and other variants can be updated without restarting the shopping journey.",
    impact: "Reduces unnecessary navigation and makes cart management faster.",
  },
  {
    gap: "The cart summary provided limited purchase context before checkout.",
    improvement:
      "Improved the order summary, clarified pricing hierarchy, and displayed the total number of selected items within the checkout button.",
    impact:
      "Gives users a clearer understanding of their purchase before continuing to payment.",
  },
  {
    gap: "Checkout separated payment information from HedgeCoin wallet visibility, making balance checks less convenient.",
    improvement:
      "Integrated HedgeCoin directly into checkout, displaying wallet balance, insufficient balance feedback, and a direct top-up option within the payment section.",
    impact:
      "Allows users to complete purchases without leaving checkout to manage their wallet.",
  },
  {
    gap: "Order completion provided limited feedback and tracking visibility after purchase.",
    improvement:
      "Redesigned the order confirmation experience with a success feedback and a simplified order tracking timeline.",
    impact:
      "Gives users confidence that their order has been placed while making delivery progress easier to follow.",
  },
];

const accountManagementImages = [
  "/projects/web-projects/hedgewears-fashion-ecommerce/account-management-01-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/account-management-02-delivery.webp",
  "/projects/web-projects/hedgewears-fashion-ecommerce/account-management-03-delivery.webp",
];

const accountManagementDocumentation = [
  {
    gap: "Order information was presented without clear hierarchy, making order status and important details harder to find quickly.",
    improvement:
      "Redesigned the order list with cleaner card layouts, clearer status filters, improved spacing, and stronger information hierarchy.",
    impact:
      "Makes it easier for users to quickly find, filter, and review their orders.",
  },
  {
    gap: "The Address Book relied on multiple action buttons and heavy color usage, creating visual noise and making address management feel overwhelming.",
    improvement:
      "Redesigned address management using cleaner address cards, clearer default states, and more balanced actions.",
    impact:
      "Makes adding, editing, and selecting delivery addresses feel more organized and easier to manage.",
  },
  {
    gap: "The HedgeCoin wallet looked visually disconnected from the rest of the shopping experience and felt closer to a standalone finance dashboard.",
    improvement:
      "Reimagined HedgeCoin as a natural part of the customer's account by integrating wallet information into the overall profile experience while maintaining the product's e-commerce visual language.",
    impact:
      "Creates a more consistent account experience and makes wallet features feel like part of shopping rather than a separate product.",
  },
];


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

function preloadBrowserImage(src: string) {
  if (typeof window === "undefined") return;
  const image = new window.Image();
  image.decoding = "async";
  image.src = src;
}

function preloadAdjacentImages(images: string[], index: number) {
  if (images.length <= 1) return;

  const previousIndex = index === 0 ? images.length - 1 : index - 1;
  const nextIndex = index === images.length - 1 ? 0 : index + 1;

  preloadBrowserImage(images[previousIndex]);
  if (nextIndex !== previousIndex) {
    preloadBrowserImage(images[nextIndex]);
  }
}
export default function HedgewearsProjectPage() {
  const [activeProductDiscoveryImage, setActiveProductDiscoveryImage] = useState(0);
  const [activeMobileProductDiscoveryImage, setActiveMobileProductDiscoveryImage] = useState(0);
  const [activePurchaseJourneyImage, setActivePurchaseJourneyImage] = useState(0);
  const [activeAccountManagementImage, setActiveAccountManagementImage] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImageIndex, setViewerImageIndex] = useState(0);
  const [viewerImages, setViewerImages] = useState(productDiscoveryImages);
  const [viewerAlt, setViewerAlt] = useState(
    "Expanded Hedgewears product discovery and shopping screen",
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  useEffect(() => {
    preloadAdjacentImages(productDiscoveryImages, activeProductDiscoveryImage);
  }, [activeProductDiscoveryImage]);

  useEffect(() => {
    preloadAdjacentImages(mobileProductDiscoveryImages, activeMobileProductDiscoveryImage);
  }, [activeMobileProductDiscoveryImage]);

  useEffect(() => {
    preloadAdjacentImages(purchaseJourneyImages, activePurchaseJourneyImage);
  }, [activePurchaseJourneyImage]);

  useEffect(() => {
    preloadAdjacentImages(accountManagementImages, activeAccountManagementImage);
  }, [activeAccountManagementImage]);

  useEffect(() => {
    if (!viewerOpen) return;
    preloadAdjacentImages(viewerImages, viewerImageIndex);
  }, [viewerOpen, viewerImages, viewerImageIndex]);

  const showPreviousProductDiscoveryImage = () => {
    setActiveProductDiscoveryImage((current) =>
      current === 0 ? productDiscoveryImages.length - 1 : current - 1,
    );
  };

  const showNextProductDiscoveryImage = () => {
    setActiveProductDiscoveryImage((current) =>
      current === productDiscoveryImages.length - 1 ? 0 : current + 1,
    );
  };

  const showPreviousMobileProductDiscoveryImage = () => {
    setActiveMobileProductDiscoveryImage((current) =>
      current === 0 ? mobileProductDiscoveryImages.length - 1 : current - 1,
    );
  };

  const showNextMobileProductDiscoveryImage = () => {
    setActiveMobileProductDiscoveryImage((current) =>
      current === mobileProductDiscoveryImages.length - 1 ? 0 : current + 1,
    );
  };

  const showPreviousPurchaseJourneyImage = () => {
    setActivePurchaseJourneyImage((current) =>
      current === 0 ? purchaseJourneyImages.length - 1 : current - 1,
    );
  };

  const showNextPurchaseJourneyImage = () => {
    setActivePurchaseJourneyImage((current) =>
      current === purchaseJourneyImages.length - 1 ? 0 : current + 1,
    );
  };

  const showPreviousAccountManagementImage = () => {
    setActiveAccountManagementImage((current) =>
      current === 0 ? accountManagementImages.length - 1 : current - 1,
    );
  };

  const showNextAccountManagementImage = () => {
    setActiveAccountManagementImage((current) =>
      current === accountManagementImages.length - 1 ? 0 : current + 1,
    );
  };

  const openViewer = (
    index = 0,
    images = productDiscoveryImages,
    alt = "Expanded Hedgewears product discovery and shopping screen",
  ) => {
    setViewerImageIndex(index);
    setViewerImages(images);
    setViewerAlt(alt);
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

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleProductDiscoveryTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - endX;

    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        showNextProductDiscoveryImage();
      } else {
        showPreviousProductDiscoveryImage();
      }
    }

    setTouchStartX(null);
  };

  const handleMobileProductDiscoveryTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - endX;

    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        showNextMobileProductDiscoveryImage();
      } else {
        showPreviousMobileProductDiscoveryImage();
      }
    }

    setTouchStartX(null);
  };

  const handlePurchaseJourneyTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - endX;

    if (Math.abs(distance) > 40) {
      if (distance > 0) showNextPurchaseJourneyImage();
      else showPreviousPurchaseJourneyImage();
    }

    setTouchStartX(null);
  };

  const handleAccountManagementTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchStartX - endX;

    if (Math.abs(distance) > 40) {
      if (distance > 0) showNextAccountManagementImage();
      else showPreviousAccountManagementImage();
    }

    setTouchStartX(null);
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

  return (
    <main className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      <Header />

      <section className="mx-auto w-full max-w-[1440px] px-5 pb-[96px] pt-[32px] lg:px-[80px] lg:pt-[48px]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div>
            <h1 className="font-inter text-[18px] font-medium leading-none text-[#F5F5F5] lg:text-[24px]">
              Hedgewears - Product Optimization & UI Overhaul
            </h1>
            <p className="mt-[16px] font-inter text-[13px] font-normal leading-none text-[#909090] lg:text-[15px]">
              Designing a clearer shopping experience for a video-first fashion e-commerce product
            </p>
          </div>

          <div className="mt-[32px] w-full overflow-hidden">
            <Image
              src="/projects/web-projects/hedgewears-fashion-ecommerce/hedgewears-hero-delivery.webp"
              alt="Hedgewears product optimization and UI overhaul preview"
              width={1280}
              height={866}
              priority
              quality={100}
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
                    <DetailItem key={item.label} label={item.label} value={item.value} />
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
              ["Role", "Product Designer (Contract)"],
              ["Duration", "4 Months"],
              ["Platform", "Responsive Web & Mobile"],
              ["Project Type", "Video-first Fashion Marketplace"],
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
                Introduction
              </h2>
              <p className="mt-[12px] max-w-none font-inter text-[13px] font-normal leading-[1.35] text-[#B8B8B8] lg:text-[13px]">
                In 2026, I joined HedgeWears as a Product Designer, working on a fashion e-commerce
                product that combines traditional online shopping with video-first product discovery.
                I came into an existing product with designs already in place, so my focus was on
                understanding what was there, identifying and addressing gaps in key shopping
                journeys, and improving how different parts of the product worked together across web
                and mobile.
              </p>
            </div>

            <div className="mt-[28px]">
              <h2 className="font-inter text-[18px] font-semibold leading-[1.25] text-[#F5F5F5]">
                Improving an Existing Product
              </h2>
              <p className="mt-[12px] max-w-none font-inter text-[13px] font-normal leading-[1.35] text-[#B8B8B8] lg:text-[13px]">
                Working with an existing product meant first understanding what was already there,
                where the experience was breaking down, and what was still missing.
              </p>
            </div>
          </section>

          <section className="mt-[36px] w-full">
            <div className="rounded-[24px] bg-[#262626] p-[24px] max-md:p-4">
              <button
                type="button"
                onClick={() =>
                  openViewer(
                    activeProductDiscoveryImage,
                    productDiscoveryImages,
                    "Expanded Hedgewears product discovery and shopping screen",
                  )
                }
                onTouchStart={handleTouchStart}
                onTouchEnd={handleProductDiscoveryTouchEnd}
                className="group relative block w-full overflow-hidden rounded-[20px] bg-[#FFF4EE] text-left outline-none"
                aria-label="Open Product Discovery and Shopping image viewer"
              >
                <Image
                  key={productDiscoveryImages[activeProductDiscoveryImage]}
                  src={productDiscoveryImages[activeProductDiscoveryImage]}
                  alt="Hedgewears product discovery and shopping experience"
                  width={1230}
                  height={712}
                  quality={100}
                  unoptimized
                  sizes="(max-width: 767px) calc(100vw - 72px), 1230px"
                  className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />

                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 font-inter text-[12px] font-semibold leading-none text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                  {activeProductDiscoveryImage + 1}/{productDiscoveryImages.length}
                </span>
              </button>

              <div className="mt-[20px] flex items-center justify-between gap-4 max-md:items-start">
                <h2 className="font-inter text-[19px] font-normal leading-[1.2] text-[#F5F5F5] max-md:text-[17px]">
                  01 - Product Discovery &amp; Shopping
                </h2>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousProductDiscoveryImage}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white"
                    aria-label="Previous product discovery image"
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
                    onClick={showNextProductDiscoveryImage}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white"
                    aria-label="Next product discovery image"
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

              <p className="mt-[16px] font-inter text-[13px] font-normal leading-[1.35] text-[#B8B8B8]">
                The existing shopping experience made it harder to move quickly from discovering a
                product to taking action.
              </p>
            </div>
          </section>

          <section className="mt-[38px] w-full">
            {/* Desktop and tablet comparison table */}
            <div className="hidden md:block">
              <div className="grid grid-cols-3 border-b border-white/45">
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] first:pl-5 lg:px-6">
                  Design Gaps
                </h3>
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  My Improvements
                </h3>
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  Impact on Experience
                </h3>
              </div>

              <div>
                {productDiscoveryDocumentation.map((item) => (
                  <div
                    key={item.gap}
                    className="grid grid-cols-3 border-b border-white/35"
                  >
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.gap}
                    </p>
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.improvement}
                    </p>
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile comparison carousel */}
            <div className="md:hidden">
              <MobileComparisonCarousel items={productDiscoveryDocumentation} />
            </div>

            <div className="mt-[30px]">
              <h2 className="font-inter text-[18px] font-medium leading-[1.25] text-[#F5F5F5]">
                Key Decisions
              </h2>
              <p className="mt-[13px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                <span className="font-semibold text-[#F5F5F5]">
                  â€¢ Let users shop before asking them to sign in.
                </span>{" "}
                Guest users can browse, save products and build their cart first, with
                authentication introduced when an account is required.
              </p>
            </div>

            <div className="mt-[27px]">
              <h2 className="font-inter text-[18px] font-medium leading-[1.25] text-[#F5F5F5]">
                Intended Outcomes
              </h2>
              <p className="mt-[13px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                Reduce friction between product discovery and cart, improve pricing clarity, and make
                HedgeWears&apos; video-shopping experience easier to discover.
              </p>
            </div>
          </section>


          <section className="mt-[48px] w-full">
            <div className="rounded-[24px] bg-[#262626] p-[24px] max-md:p-4">
              <button
                type="button"
                onClick={() =>
                  openViewer(
                    activeMobileProductDiscoveryImage,
                    mobileProductDiscoveryImages,
                    "Expanded Hedgewears mobile product discovery screen",
                  )
                }
                onTouchStart={handleTouchStart}
                onTouchEnd={handleMobileProductDiscoveryTouchEnd}
                className="group relative block w-full overflow-hidden rounded-[20px] bg-[#B7B7B7] text-left outline-none"
                aria-label="Open Simplifying Mobile Product Discovery image viewer"
              >
                <Image
                  key={mobileProductDiscoveryImages[activeMobileProductDiscoveryImage]}
                  src={mobileProductDiscoveryImages[activeMobileProductDiscoveryImage]}
                  alt="Hedgewears simplifying mobile product discovery experience"
                  width={1230}
                  height={712}
                  quality={100}
                  unoptimized
                  sizes="(max-width: 767px) calc(100vw - 72px), 1230px"
                  className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />

                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 font-inter text-[12px] font-semibold leading-none text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                  {activeMobileProductDiscoveryImage + 1}/{mobileProductDiscoveryImages.length}
                </span>
              </button>

              <div className="mt-[20px] flex items-center justify-between gap-4 max-md:items-start">
                <h2 className="font-inter text-[19px] font-normal leading-[1.2] text-[#F5F5F5] max-md:text-[17px]">
                  02 - Simplifying Mobile Product Discovery
                </h2>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousMobileProductDiscoveryImage}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white"
                    aria-label="Previous mobile product discovery image"
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
                    onClick={showNextMobileProductDiscoveryImage}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white"
                    aria-label="Next mobile product discovery image"
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

              <p className="mt-[16px] font-inter text-[13px] font-normal leading-[1.35] text-[#B8B8B8]">
                The existing mobile experience gave several interface elements equal visual weight,
                while categories and navigation took up space that could be used for product
                discovery. I focused on simplifying the interface, improving how users browse the
                catalogue, and giving products and video shopping more room within the experience.
              </p>
            </div>
          </section>

          <section className="mt-[38px] w-full">
            {/* Desktop and tablet comparison table */}
            <div className="hidden md:block">
              <div className="grid grid-cols-3 border-b border-white/45">
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  Design Gaps
                </h3>
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  My Improvements
                </h3>
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  Impact on Experience
                </h3>
              </div>

              <div>
                {mobileProductDiscoveryDocumentation.map((item) => (
                  <div
                    key={item.gap}
                    className="grid grid-cols-3 border-b border-white/35"
                  >
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.gap}
                    </p>
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.improvement}
                    </p>
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile uses the same compact comparison interaction as section 01 */}
            <div className="md:hidden">
              <MobileComparisonCarousel items={mobileProductDiscoveryDocumentation} />
            </div>

            <div className="mt-[30px]">
              <h2 className="font-inter text-[18px] font-medium leading-[1.25] text-[#F5F5F5]">
                Key Decisions
              </h2>

              <div className="mt-[13px] space-y-[10px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                <p>
                  <span className="font-semibold text-[#F5F5F5]">
                    â€¢ Prioritize products over navigation.
                  </span>{" "}
                  I reduced the space occupied by category controls so more of the actual catalogue
                  could appear within the initial viewport.
                </p>

                <p>
                  <span className="font-semibold text-[#F5F5F5]">
                    â€¢ Keep category browsing in context.
                  </span>{" "}
                  Instead of creating several layers of category screens, I used a clearer category
                  and subcategory structure that lets users refine what they want while continuing to
                  browse products.
                </p>

                <p>
                  <span className="font-semibold text-[#F5F5F5]">
                    â€¢ Carry video discovery across platforms.
                  </span>{" "}
                  Explore and Watch &amp; Shop were brought into mobile navigation so HedgeWears&apos;
                  video-shopping model wasn&apos;t limited to one part of the product.
                </p>
              </div>
            </div>

            <div className="mt-[27px]">
              <h2 className="font-inter text-[18px] font-medium leading-[1.25] text-[#F5F5F5]">
                Intended Outcomes
              </h2>
              <p className="mt-[13px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                Increase catalogue visibility within the mobile viewport, reduce the steps required
                to browse categories, and make both traditional and video-led product discovery
                easier to access.
              </p>
            </div>
          </section>


          <section className="mt-[48px] w-full">
            <div className="rounded-[24px] bg-[#262626] p-[24px] max-md:p-4">
              <button
                type="button"
                onClick={() =>
                  openViewer(
                    activePurchaseJourneyImage,
                    purchaseJourneyImages,
                    "Expanded Hedgewears purchase journey screen",
                  )
                }
                onTouchStart={handleTouchStart}
                onTouchEnd={handlePurchaseJourneyTouchEnd}
                className="group relative block w-full overflow-hidden rounded-[20px] bg-[#B7B7B7] text-left outline-none"
                aria-label="Open Simplifying the Purchase Journey image viewer"
              >
                <Image
                  key={purchaseJourneyImages[activePurchaseJourneyImage]}
                  src={purchaseJourneyImages[activePurchaseJourneyImage]}
                  alt="Hedgewears purchase journey experience"
                  width={1600}
                  height={900}
                  unoptimized
                  sizes="(max-width: 767px) calc(100vw - 72px), 1230px"
                  className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />

                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 font-inter text-[12px] font-semibold leading-none text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                  {activePurchaseJourneyImage + 1}/{purchaseJourneyImages.length}
                </span>
              </button>

              <div className="mt-[20px] flex items-center justify-between gap-4 max-md:items-start">
                <h2 className="font-inter text-[19px] font-normal leading-[1.2] text-[#F5F5F5] max-md:text-[17px]">
                  03 - Simplifying the Purchase Journey
                </h2>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousPurchaseJourneyImage}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white"
                    aria-label="Previous purchase journey image"
                  >
                    <Image src="/icons/viewer-arrow-left.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] transition-all duration-300 group-hover:invert" />
                  </button>

                  <button
                    type="button"
                    onClick={showNextPurchaseJourneyImage}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white"
                    aria-label="Next purchase journey image"
                  >
                    <Image src="/icons/viewer-arrow-right.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] transition-all duration-300 group-hover:invert" />
                  </button>
                </div>
              </div>

              <p className="mt-[16px] font-inter text-[13px] font-normal leading-[1.35] text-[#B8B8B8]">
                The purchase journey covered multiple connected experiences, from product details to cart,
                checkout, and order tracking. While the existing flow was functional, several interactions
                added unnecessary steps and made important information harder to scan. My focus was to
                improve hierarchy, simplify product customization, and create a clearer path from product
                selection to order completion.
              </p>
            </div>
          </section>

          <section className="mt-[38px] w-full">
            <div className="hidden md:block">
              <div className="grid grid-cols-3 border-b border-white/45">
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  Design Gaps
                </h3>
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  My Improvements
                </h3>
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  Impact on Experience
                </h3>
              </div>

              <div>
                {purchaseJourneyDocumentation.map((item) => (
                  <div key={item.gap} className="grid grid-cols-3 border-b border-white/35">
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.gap}
                    </p>
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.improvement}
                    </p>
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <MobileComparisonCarousel items={purchaseJourneyDocumentation} />
            </div>

            <div className="mt-[30px]">
              <h2 className="font-inter text-[18px] font-medium leading-[1.25] text-[#F5F5F5]">
                Key Decisions
              </h2>
              <p className="mt-[13px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                <span className="font-semibold text-[#F5F5F5]">
                  â€¢ Prioritized clarity and confidence at every stage, helping users make purchase decisions with less friction.
                </span>
              </p>
            </div>

            <div className="mt-[27px]">
              <h2 className="font-inter text-[18px] font-medium leading-[1.25] text-[#F5F5F5]">
                Intended Outcomes
              </h2>
              <p className="mt-[13px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                Create a purchasing experience that feels clear, predictable, and efficient from product
                selection to order completion, reducing friction during checkout while making key business
                features like HedgeCoin more accessible and encouraging users to complete their purchases
                with confidence.
              </p>
            </div>
          </section>

          <section className="mt-[48px] w-full">
            <div className="rounded-[24px] bg-[#262626] p-[24px] max-md:p-4">
              <button
                type="button"
                onClick={() =>
                  openViewer(
                    activeAccountManagementImage,
                    accountManagementImages,
                    "Expanded Hedgewears account management screen",
                  )
                }
                onTouchStart={handleTouchStart}
                onTouchEnd={handleAccountManagementTouchEnd}
                className="group relative block w-full overflow-hidden rounded-[20px] bg-[#B7B7B7] text-left outline-none"
                aria-label="Open Better Account Management image viewer"
              >
                <Image
                  key={accountManagementImages[activeAccountManagementImage]}
                  src={accountManagementImages[activeAccountManagementImage]}
                  alt="Hedgewears account management experience"
                  width={1600}
                  height={900}
                  unoptimized
                  sizes="(max-width: 767px) calc(100vw - 72px), 1230px"
                  className="h-auto w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />

                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 font-inter text-[12px] font-semibold leading-none text-black shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                  {activeAccountManagementImage + 1}/{accountManagementImages.length}
                </span>
              </button>

              <div className="mt-[20px] flex items-center justify-between gap-4 max-md:items-start">
                <h2 className="font-inter text-[19px] font-normal leading-[1.2] text-[#F5F5F5] max-md:text-[17px]">
                  04 - Designing a Better Account Management Experience
                </h2>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={showPreviousAccountManagementImage}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white"
                    aria-label="Previous account management image"
                  >
                    <Image src="/icons/viewer-arrow-left.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] transition-all duration-300 group-hover:invert" />
                  </button>

                  <button
                    type="button"
                    onClick={showNextAccountManagementImage}
                    className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors duration-300 hover:bg-white"
                    aria-label="Next account management image"
                  >
                    <Image src="/icons/viewer-arrow-right.svg" alt="" width={18} height={18} className="h-[18px] w-[18px] transition-all duration-300 group-hover:invert" />
                  </button>
                </div>
              </div>

              <p className="mt-[16px] font-inter text-[13px] font-normal leading-[1.35] text-[#B8B8B8]">
                The purchase journey covered multiple connected experiences, from product details to cart,
                checkout, and order tracking. While the existing flow was functional, several interactions
                added unnecessary steps and made important information harder to scan. My focus was to
                improve hierarchy, simplify product customization, and create a clearer path from product
                selection to order completion.
              </p>
            </div>
          </section>

          <section className="mt-[38px] w-full">
            <div className="hidden md:block">
              <div className="grid grid-cols-3 border-b border-white/45">
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  Design Gaps
                </h3>
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  My Improvements
                </h3>
                <h3 className="px-5 pb-[14px] font-inter text-[16px] font-semibold leading-[1.25] text-[#F5F5F5] lg:px-6">
                  Impact on Experience
                </h3>
              </div>

              <div>
                {accountManagementDocumentation.map((item) => (
                  <div key={item.gap} className="grid grid-cols-3 border-b border-white/35">
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.gap}
                    </p>
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.improvement}
                    </p>
                    <p className="px-5 py-[17px] font-inter text-[13px] font-normal leading-[1.25] text-[#B8B8B8] lg:px-6">
                      {item.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <MobileComparisonCarousel items={accountManagementDocumentation} />
            </div>

            <div className="mt-[30px]">
              <h2 className="font-inter text-[18px] font-medium leading-[1.25] text-[#F5F5F5]">
                Key Decisions
              </h2>
              <p className="mt-[13px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                <span className="font-semibold text-[#F5F5F5]">
                  â€¢ Prioritized clarity and confidence at every stage, helping users make purchase decisions with less friction.
                </span>
              </p>
            </div>

            <div className="mt-[27px]">
              <h2 className="font-inter text-[18px] font-medium leading-[1.25] text-[#F5F5F5]">
                Intended Outcomes
              </h2>
              <p className="mt-[13px] font-inter text-[13px] font-normal leading-[1.45] text-[#B8B8B8]">
                The intended outcome was to strengthen customer retention by making post-purchase interactions
                as intuitive as shopping itself, giving users a clear and consistent place to manage purchases,
                return to the platform after checkout, and engage with features like HedgeCoin over time.
              </p>
            </div>
          </section>

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
                onClick={() => setViewerOpen(false)}
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

              <span className="fixed bottom-8 left-1/2 z-[2147483647] -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 font-inter text-[13px] font-semibold text-white">
                {viewerImageIndex + 1}/{viewerImages.length}
              </span>

              <Image
                key={viewerImages[viewerImageIndex]}
                src={viewerImages[viewerImageIndex]}
                alt={viewerAlt}
                width={1230}
                height={712}
                quality={100}
                unoptimized
                sizes="100vw"
                className="max-h-[92vh] w-auto max-w-[94vw] rounded-[12px] object-contain"
              />
            </div>,
            document.body,
          )
        : null}

      <Footer />
    </main>
  );
}
