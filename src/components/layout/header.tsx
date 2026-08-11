"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useViewportMode } from "@/hooks/use-viewport-mode";

type HeaderProps = {
  activePath?: string;
};

const navigation = [
  { label: "Home", href: "/" },
  { label: "My work", href: "/work" },
  { label: "About me", href: "/about" },
  { label: "Lab", href: "/lab" },
];

const socialLinks = [
  { label: "Substack", href: "#", icon: "/icons/substack.svg" },
  { label: "X", href: "#", icon: "/icons/x.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/john-oduntan-55ab332b1/", icon: "/icons/linkedin.svg" },
  { label: "Behance", href: "https://www.behance.net/johnoduntan1", icon: "/icons/behance.svg" },
];

const compactSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/john-oduntan-55ab332b1/",
    icon: "/icons/linkedin.svg",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/johnoduntan1",
    icon: "/icons/behance.svg",
  },
  {
    label: "GitHub",
    href: "https://github.com/Johnola00",
    icon: "github",
  },
];

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
    >
      <path
        d="M6.75 6.75L17.25 17.25M17.25 6.75L6.75 17.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
    >
      <path d="M12 2.25a9.75 9.75 0 0 0-3.083 19.001c.488.09.667-.212.667-.47 0-.233-.009-1.002-.014-1.817-2.713.59-3.286-1.15-3.286-1.15-.444-1.13-1.084-1.43-1.084-1.43-.886-.606.067-.594.067-.594.98.069 1.496 1.006 1.496 1.006.871 1.493 2.285 1.062 2.842.812.088-.631.341-1.062.62-1.306-2.166-.247-4.444-1.083-4.444-4.82 0-1.065.381-1.936 1.005-2.619-.101-.247-.435-1.239.095-2.582 0 0 .82-.262 2.685 1.001A9.36 9.36 0 0 1 12 6.953a9.36 9.36 0 0 1 2.445.329c1.864-1.263 2.683-1.001 2.683-1.001.531 1.343.197 2.335.097 2.582.625.683 1.004 1.554 1.004 2.619 0 3.746-2.282 4.57-4.454 4.812.35.302.661.896.661 1.806 0 1.305-.012 2.356-.012 2.678 0 .26.176.564.671.469A9.75 9.75 0 0 0 12 2.25Z" />
    </svg>
  );
}

function normalizePath(path: string) {
  if (path === "/") return "/";
  return `/${path.split("/").filter(Boolean)[0] ?? ""}`;
}

export function Header({ activePath }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const routePath = normalizePath(activePath ?? pathname ?? "/");
  const [optimisticPath, setOptimisticPath] = useState<string | null>(null);
  const visualActivePath = optimisticPath ?? routePath;
  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [isPillReady, setIsPillReady] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuCloseTimerRef = useRef<number | null>(null);
  const hasEnabledPillTransition = useRef(false);
  const viewportMode = useViewportMode();
  const isCompact = viewportMode !== "desktop";

  const openMenu = useCallback(() => {
    if (menuCloseTimerRef.current !== null) {
      window.clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }

    setIsMenuMounted(true);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsMenuVisible(true);
      });
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuVisible(false);

    if (menuCloseTimerRef.current !== null) {
      window.clearTimeout(menuCloseTimerRef.current);
    }

    menuCloseTimerRef.current = window.setTimeout(() => {
      setIsMenuMounted(false);
      menuCloseTimerRef.current = null;
    }, 380);
  }, []);

  useEffect(() => {
    return () => {
      if (menuCloseTimerRef.current !== null) {
        window.clearTimeout(menuCloseTimerRef.current);
      }
    };
  }, []);

  const updatePill = useCallback((targetPath: string) => {
    const nav = navRef.current;
    const index = navigation.findIndex((item) => item.href === targetPath);
    const link = index >= 0 ? linkRefs.current[index] : null;

    if (!nav || !link) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    setPill({
      left: linkRect.left - navRect.left,
      top: linkRect.top - navRect.top,
      width: linkRect.width,
      height: linkRect.height,
    });
  }, []);

  useLayoutEffect(() => {
    if (isCompact) return;

    updatePill(visualActivePath);

    if (hasEnabledPillTransition.current) return;

    const frame = window.requestAnimationFrame(() => {
      hasEnabledPillTransition.current = true;
      setIsPillReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isCompact, updatePill, visualActivePath]);

  useEffect(() => {
    if (isCompact) return;

    const handleResize = () => updatePill(visualActivePath);
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => updatePill(visualActivePath));
    if (navRef.current) observer.observe(navRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [isCompact, updatePill, visualActivePath]);

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (href === routePath) return;

    event.preventDefault();
    setOptimisticPath(href);
    window.setTimeout(() => router.push(href), 180);
  }

  if (isCompact) {
    return (
      <>
        <header
          className="fixed inset-x-0 top-0 w-full border-b border-white/10 shadow-[0_10px_34px_rgba(0,0,0,0.35)]"
          style={{ height: 88, zIndex: 2147483645, backgroundColor: "rgba(25,25,25,0.72)", backdropFilter: "blur(30px) saturate(165%)", WebkitBackdropFilter: "blur(30px) saturate(165%)", isolation: "isolate" }}
        >
          <div
            className="mx-auto flex h-full w-full flex-row items-center justify-between"
            style={{
              maxWidth: viewportMode === "mobile" ? 640 : 960,
              paddingLeft: viewportMode === "mobile" ? 20 : 40,
              paddingRight: viewportMode === "mobile" ? 20 : 40,
            }}
          >
            <Link
              href="/"
              aria-label="John Oduntan, home"
              className="flex min-w-0 flex-1 flex-row items-center"
              style={{ gap: 12, paddingTop: 24, paddingBottom: 24 }}
            >
              <Image
                src="/brand/john-oduntan-logo.svg"
                alt=""
                width={40}
                height={37}
                priority
                style={{ width: 40, height: 37, objectFit: "contain", flexShrink: 0 }}
              />

              <span className="flex min-w-0 flex-col justify-center">
                <span
                  className="truncate text-white"
                  style={{ fontSize: 13, fontWeight: 600, lineHeight: 1 }}
                >
                  John Oduntan
                </span>
                <span
                  className="truncate text-[#AAAAAA]"
                  style={{ marginTop: 8, fontSize: 11.5, fontWeight: 500, lineHeight: 1.25 }}
                >
                  {"Product Designer \u00B7 Design Engineer"}
                </span>
              </span>
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isMenuVisible}
              onClick={openMenu}
              className="flex shrink-0 items-center justify-center border-0 bg-transparent p-0"
              style={{ width: 24, height: 24, marginTop: 24, marginBottom: 24 }}
            >
              <Image
                src="/icons/menu%20icon.svg"
                alt=""
                width={24}
                height={24}
                style={{ width: 24, height: 24 }}
              />
            </button>
          </div>
        </header>

        <div aria-hidden="true" style={{ height: 88 }} />

        {isMenuMounted ? (
          <>
            <div
              aria-hidden="true"
              onClick={closeMenu}
              className="fixed inset-0 bg-black/45 transition-opacity duration-[360ms]"
              style={{
                zIndex: 2147483646,
                opacity: isMenuVisible ? 1 : 0,
                transitionTimingFunction: isMenuVisible
                  ? "cubic-bezier(0.22, 1, 0.36, 1)"
                  : "cubic-bezier(0.4, 0, 1, 1)",
              }}
            />

            <aside
              className="fixed right-0 top-0 flex h-screen flex-col border-l border-white/10 bg-[#191919] shadow-2xl"
              style={{
                width:
                  viewportMode === "mobile"
                    ? "min(292px, 82vw)"
                    : "min(340px, 52vw)",
                padding: "28px 24px",
                zIndex: 2147483647,
                transform: isMenuVisible
                  ? "translate3d(0, 0, 0)"
                  : "translate3d(100%, 0, 0)",
                transitionProperty: "transform",
                transitionDuration: "380ms",
                transitionTimingFunction: isMenuVisible
                  ? "cubic-bezier(0.22, 1, 0.36, 1)"
                  : "cubic-bezier(0.4, 0, 1, 1)",
                willChange: "transform",
              }}
            >
              <div className="flex w-full items-start justify-between gap-4">
                <Link
                  href="/"
                  aria-label="John Oduntan, home"
                  onClick={closeMenu}
                  className="flex min-w-0 items-center gap-3"
                >
                  <Image
                    src="/brand/john-oduntan-logo.svg"
                    alt=""
                    width={40}
                    height={37}
                    priority
                    className="shrink-0 object-contain"
                    style={{ width: 40, height: 37 }}
                  />

                  <span className="flex min-w-0 flex-col justify-center">
                    <span
                      className="truncate text-white"
                      style={{ fontSize: 13, fontWeight: 600, lineHeight: 1 }}
                    >
                      John Oduntan
                    </span>
                    <span
                      className="truncate text-[#AAAAAA]"
                      style={{
                        marginTop: 7,
                        fontSize: 11.5,
                        fontWeight: 500,
                        lineHeight: 1.25,
                      }}
                    >
                      {"Product Designer \u00B7 Design Engineer"}
                    </span>
                  </span>
                </Link>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                  className="flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-transparent text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.04]"
                  style={{ width: 38, height: 38 }}
                >
                  <CloseIcon />
                </button>
              </div>

              <nav className="mt-[46px] flex flex-col gap-[22px]" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="w-fit transition-colors duration-300"
                    style={{
                      color: item.href === routePath ? "#FFFFFF" : "#B9B9B9",
                      fontSize: 17,
                      fontWeight: 400,
                      lineHeight: 1.35,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/40">
                  Find me on
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {compactSocialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center text-[#B9B9B9] transition-colors duration-300 hover:text-white"
                    >
                      {social.icon === "github" ? (
                        <GitHubIcon />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="block h-[40px] w-[40px] bg-current"
                          style={{
                            mask: `url(${social.icon}) center / contain no-repeat`,
                            WebkitMask: `url(${social.icon}) center / contain no-repeat`,
                          }}
                        />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </>
        ) : null}
      </>
    );
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 flex h-[104px] w-full shrink-0 flex-row items-center justify-between border-b border-white/10 bg-[#191919]/70 px-[80px] py-[24px] shadow-[0_10px_34px_rgba(0,0,0,0.35)] backdrop-blur-2xl" style={{ zIndex: 2147483645, backdropFilter: "blur(30px) saturate(165%)", WebkitBackdropFilter: "blur(30px) saturate(165%)", isolation: "isolate" }}>
      <Link
        href="/"
        aria-label="John Oduntan, home"
        className="flex shrink-0 flex-row items-center gap-4"
      >
        <Image
          src="/brand/john-oduntan-logo.svg"
          alt=""
          width={48}
          height={48}
          priority
          className="h-[48px] w-[48px] rounded"
        />

        <span className="flex min-w-0 flex-col justify-center">
          <span className="whitespace-nowrap text-[15px] font-medium text-white">
            John Oduntan
          </span>
          <span className="whitespace-nowrap text-[13px] font-normal leading-[1.3] text-[#B9B9B9]">
            {"Product Designer \u00B7 Design Engineer"}
          </span>
        </span>
      </Link>

      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className="relative flex shrink-0 flex-row items-center gap-8"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-[#F7F0DF]"
          style={{
            left: pill.left,
            top: pill.top,
            width: pill.width,
            height: pill.height,
            opacity: pill.width ? 1 : 0,
            transition: isPillReady
              ? "left 360ms cubic-bezier(0.22, 1, 0.36, 1), top 360ms cubic-bezier(0.22, 1, 0.36, 1), width 360ms cubic-bezier(0.22, 1, 0.36, 1), height 360ms cubic-bezier(0.22, 1, 0.36, 1), opacity 160ms ease"
              : "none",
          }}
        />

        {navigation.map((item, index) => {
          const isActive = item.href === visualActivePath;

          return (
            <Link
              key={item.href}
              ref={(node) => {
                linkRefs.current[index] = node;
              }}
              href={item.href}
              aria-current={item.href === routePath ? "page" : undefined}
              onClick={(event) => handleNavClick(event, item.href)}
              onMouseEnter={(event) => {
                if (!isActive) event.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(event) => {
                if (!isActive) event.currentTarget.style.color = "#B9B9B9";
              }}
              className="relative z-10 flex items-center justify-center rounded-full px-5 py-2 text-[14px] font-medium transition-colors duration-300"
              style={{ color: isActive ? "#000000" : "#B9B9B9" }}
            >
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex shrink-0 flex-row items-center gap-6">
        <span className="whitespace-nowrap text-[14px] font-normal text-[#B9B9B9]">
          Find me on:
        </span>

        <div className="flex flex-row items-center gap-5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="h-[38px] w-[38px] text-[#B9B9B9] hover:text-[#FFFFFF] transition-colors duration-300"
            >
              <span
                aria-hidden="true"
                className="block h-full w-full bg-current"
                style={{
                  mask: `url(${social.icon}) center / contain no-repeat`,
                  WebkitMask: `url(${social.icon}) center / contain no-repeat`,
                }}
              />
            </a>
          ))}
        </div>
      </div>
      </header>
      <div aria-hidden="true" style={{ height: 104 }} />
    </>
  );
}









