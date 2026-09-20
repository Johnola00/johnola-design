"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type LabProject = {
  title: string;
  description: string;
  thumbnail: string;
  icon: string;
  iconAlt: string;
  href?: string;
  ctaLabel: string;
};

const labProjects: LabProject[] = [
  {
    title: "Dezfind",
    description:
      "Dezfind is an automated, real-time job discovery tool for digital designers. I designed and engineered it to track fresh UI/UX and product design roles from live sources, making active opportunities easier to find.",
    thumbnail: "/projects/lab/dezfind/DezFindThumbnail.png",
    icon: "/projects/lab/dezfind/web-browser-icon.svg",
    iconAlt: "Web browser",
    href: "https://dezfind.design",
    ctaLabel: "Go to Dezfind.design",
  },
  {
    title: "Dez Copilot",
    description:
      "Dez Copilot is a Chrome extension I designed and built to turn job posts into tailored applications, identify skill gaps, match relevant portfolio projects, and generate resumes and cover letters in the designer’s own tone.",
    thumbnail: "/projects/lab/dez-copilot/DezCopilotThumbnail.png",
    icon: "",
    iconAlt: "Browser extension",
    ctaLabel: "Chrome Store — Coming Soon",
  },
];

function LabBackgroundPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 920"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g
          fill="none"
          stroke="#173746"
          strokeWidth="1.15"
          opacity="0.52"
          vectorEffect="non-scaling-stroke"
        >
          <path d="M-120 92C70 10 240 18 388 96C528 170 666 171 800 82C920 2 1088-18 1252 35C1378 76 1460 82 1555 48" />
          <path d="M-102 132C72 65 232 70 382 136C520 196 672 202 812 118C934 45 1090 22 1250 67C1374 102 1465 112 1555 86" />
          <path d="M-82 174C78 120 226 118 374 176C514 232 668 243 820 158C944 90 1098 64 1252 104C1384 138 1474 151 1562 127" />
          <path d="M-62 215C86 168 220 163 366 214C510 265 666 279 828 198C952 136 1106 108 1256 142C1390 172 1482 191 1568 169" />

          <path d="M-138 515C28 438 190 430 328 498C468 566 610 598 760 548C900 502 1040 442 1192 466C1320 486 1426 548 1548 532" />
          <path d="M-120 558C34 492 188 482 326 544C468 606 612 636 766 592C906 552 1040 496 1196 512C1332 526 1436 590 1552 574" />
          <path d="M-102 603C44 544 192 536 326 592C468 650 616 677 772 636C914 599 1048 548 1200 558C1344 568 1444 628 1560 614" />
          <path d="M-82 648C54 596 194 588 324 638C466 692 620 716 776 682C922 650 1052 606 1204 608C1350 612 1452 670 1566 658" />
          <path d="M-66 694C64 648 198 640 324 686C466 738 622 760 780 730C928 702 1060 662 1208 662C1356 664 1460 720 1572 710" />
          <path d="M-50 742C74 702 204 694 326 736C468 784 626 804 784 778C934 754 1066 718 1212 718C1362 720 1468 770 1578 762" />
          <path d="M-34 792C84 758 210 750 328 788C470 832 630 850 788 828C940 806 1072 776 1216 776C1368 778 1476 824 1584 818" />
          <path d="M-18 844C94 816 216 808 330 842C472 882 634 896 792 878C946 860 1078 834 1220 834C1374 836 1484 878 1590 874" />

          <path d="M422 -120C374 -8 394 98 462 188C526 272 552 366 510 462C468 556 476 654 542 742C594 812 612 884 590 972" />
          <path d="M466 -120C420 -12 438 92 498 180C560 268 590 360 552 454C516 544 524 646 580 734C636 820 658 888 636 976" />
          <path d="M510 -118C468 -18 484 84 538 172C596 264 628 352 594 448C562 536 570 636 618 724C670 814 698 884 678 978" />

          <path d="M1082 -124C1030 -14 1048 96 1112 188C1176 280 1198 372 1158 464C1120 550 1128 648 1184 736C1238 820 1262 892 1234 980" />
          <path d="M1128 -122C1080 -16 1096 90 1154 182C1214 274 1242 366 1204 458C1168 544 1176 642 1228 730C1280 816 1308 888 1280 982" />
          <path d="M1174 -120C1132 -20 1146 84 1200 176C1256 270 1286 358 1250 450C1218 536 1224 632 1270 720C1320 812 1350 884 1324 980" />
        </g>
      </svg>
    </div>
  );
}

function LabProjectCard({ project }: { project: LabProject }) {
  return (
    <article className="relative w-full overflow-hidden rounded-[24px] border border-[#343434] bg-[#171717] xl:h-[265px]">
      <div className="flex h-full flex-col md:flex-row md:items-center">
        <div className="relative w-full overflow-hidden bg-[#F5F5F5] md:h-[175px] md:w-[230px] md:shrink-0">
          <Image
            src={project.thumbnail}
            alt={`${project.title} preview`}
            width={460}
            height={350}
            priority
            unoptimized
            className="h-auto w-full object-cover md:h-full md:w-full"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-5 md:h-[175px] md:pl-[19px] md:pr-[24px] md:py-0 min-[900px]:pr-[21px]">
          <div className="flex items-center gap-2">
            {project.title === "Dez Copilot" ? (
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 shrink-0 text-[#38BDF8]"
              >
                <path
                  d="M8.25 3.75H11V6.1C11 7.15 11.85 8 12.9 8C13.95 8 14.8 7.15 14.8 6.1V3.75H17.55C19.04 3.75 20.25 4.96 20.25 6.45V9.2H17.9C16.85 9.2 16 10.05 16 11.1C16 12.15 16.85 13 17.9 13H20.25V17.55C20.25 19.04 19.04 20.25 17.55 20.25H13V17.9C13 16.85 12.15 16 11.1 16C10.05 16 9.2 16.85 9.2 17.9V20.25H6.45C4.96 20.25 3.75 19.04 3.75 17.55V13H6.1C7.15 13 8 12.15 8 11.1C8 10.05 7.15 9.2 6.1 9.2H3.75V6.45C3.75 4.96 4.96 3.75 6.45 3.75H8.25Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <Image
                src={project.icon}
                alt={project.iconAlt}
                width={24}
                height={24}
                className="h-6 w-6 shrink-0 object-contain"
              />
            )}

            <h2 className="font-inter text-[24px] font-semibold leading-[1.4] tracking-[-0.01em] text-white md:text-[20px] md:leading-[1.3] min-[900px]:text-[24px] min-[900px]:leading-[1.4]">
              {project.title}
            </h2>
          </div>

          <p className="mt-[6px] font-inter text-[12.9px] font-normal leading-[1.84] text-white/82 md:text-[11.5px] md:leading-[1.68] min-[900px]:text-[12.9px] min-[900px]:leading-[1.84]">
            {project.description}
          </p>

          <div className="mt-[10px]">
            {project.href ? (
              <Link
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-[28px] items-center gap-[7px] rounded-[8px] border border-white/80 px-[8px] font-inter text-[12px] font-normal leading-none text-white transition-colors duration-300 hover:bg-white hover:text-black md:h-[26px] md:text-[10.5px] min-[900px]:h-[28px] min-[900px]:text-[12px]"
              >
                {project.ctaLabel}
                <svg
                  aria-hidden="true"
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3.5 8H12.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 4.5L12.5 8L9 11.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                aria-label={`${project.title} Chrome Store link is coming soon`}
                className="inline-flex h-[28px] cursor-not-allowed items-center rounded-[8px] border border-white/25 px-[8px] font-inter text-[12px] font-normal leading-none text-white/45 md:h-[26px] md:text-[10.5px] min-[900px]:h-[28px] min-[900px]:text-[12px]"
              >
                {project.ctaLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#171717] text-white">
      <Header />

      <section className="relative isolate overflow-hidden">
        <LabBackgroundPattern />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-[96px] pt-[56px] md:px-12 md:pb-[112px] md:pt-[72px] lg:px-20 lg:pb-[140px] lg:pt-[88px]">
          <div className="mx-auto grid w-full max-w-[1272px] grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-4">
            {labProjects.map((project) => (
              <LabProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
