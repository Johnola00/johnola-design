import Image from "next/image";

export function WorkInProgress() {
  return (
    <div
      className="flex min-h-[320px] w-full flex-col items-center justify-center md:min-h-[400px] lg:min-h-[430px]"
      aria-label="Work in progress"
    >
      <Image
        src="/icons/WIP.svg"
        alt=""
        width={184}
        height={184}
        aria-hidden="true"
        className="h-auto w-[132px] object-contain md:w-[158px] lg:w-[184px]"
      />
      <p className="mt-5 flex items-baseline justify-center text-center text-[14px] font-medium leading-[1.4] text-[#B8B8B8] md:mt-6 md:text-[15px]">
        <span>Work in progress</span>
        <span className="ml-[2px] inline-flex items-center" aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animation: "wipDot 1.35s ease-in-out infinite",
                animationDelay: `${index * 180}ms`,
              }}
            >
              .
            </span>
          ))}
        </span>
        <span className="sr-only">...</span>
      </p>

      <style>{`
        @keyframes wipDot {
          0%,
          20% {
            opacity: 0.28;
            transform: translateY(0);
          }

          45% {
            opacity: 1;
            transform: translateY(-2px);
          }

          70%,
          100% {
            opacity: 0.28;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [aria-label="Work in progress"] span[aria-hidden="true"] > span {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
