"use client";

const portfolioLinks = [
  { label: "Behance", href: "https://www.behance.net/johnoduntan1" },
  { label: "Dribbble", href: "https://dribbble.com/John21091" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01c60910225418f706" },
  { label: "Hire me on Contra", href: "https://contra.com/john_ola_y2ibjxva/work?r=john_ola_y2ibjxva" },
];

const contactLinks = [
  { label: "GitHub", href: "https://github.com/Johnola00" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/john-oduntan-55ab332b1/" },
  {
    label: "Johnola21091@gmail.com",
    href: "mailto:Johnola21091@gmail.com",
  },
];

function UpArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 13V3M8 3L4.5 6.5M8 3l3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-[100px] flex h-[385px] w-full items-center justify-center border-t border-white/20 max-[1100px]:h-auto">
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-row items-center justify-between px-[80px] py-[60px] max-[1100px]:grid max-[1100px]:h-auto max-[1100px]:grid-cols-2 max-[1100px]:items-start max-[1100px]:gap-x-12 max-[1100px]:gap-y-10 max-[1100px]:px-10 max-[1100px]:py-12 max-[700px]:grid-cols-1 max-[700px]:px-5 max-[700px]:py-10">
        <div className="flex flex-col">
          <p className="text-[26px] leading-none font-medium text-white">
            John Oduntan
          </p>

          <div className="mt-[28px] flex flex-row items-center gap-[12px] max-[1100px]:flex-wrap">
            {portfolioLinks.map((link, index) => (
              <span key={link.label} className="contents">
                {index > 0 && (
                  <span className="text-[#AAAAAA]" aria-hidden="true">
                    /
                  </span>
                )}
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-[12px] leading-none font-medium text-[#AAAAAA] transition-colors duration-300 hover:text-white hover:decoration-white"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-[12px] max-[1100px]:static max-[1100px]:translate-x-0 max-[1100px]:translate-y-0">
          <p className="text-[13.6px] leading-none font-medium text-white">
            Links
          </p>
          <div className="flex flex-col gap-[12px]">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="w-fit text-[13.6px] leading-none font-medium text-[#AAAAAA] underline underline-offset-4 decoration-[#AAAAAA]/50 transition-colors duration-300 hover:text-white hover:decoration-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col items-end justify-between max-[1100px]:col-span-2 max-[1100px]:h-auto max-[1100px]:flex-row max-[1100px]:items-center max-[1100px]:justify-between max-[700px]:col-span-1 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-10">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="animate-[bounce_1.5s_infinite] flex items-center gap-2 rounded-full bg-white px-4 py-2 text-black transition-transform duration-300 hover:scale-105"
          >
            <UpArrowIcon />
            <span className="text-[12px] leading-none font-medium">
              Back to Top
            </span>
          </button>

          <p className="text-[12px] leading-none font-normal text-[#AAAAAA]">
            &copy; 2026 &mdash; Copyright
          </p>
        </div>
      </div>
    </footer>
  );
}
