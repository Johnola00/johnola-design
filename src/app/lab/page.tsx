import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function LabPage() {
  return (
    <>
      <style>{`
        .lab-page-main {
          width: 100%;
          max-width: 1440px;
          min-height: 100dvh;
          margin: 0 auto;
          padding-left: 80px;
          padding-right: 80px;
          display: flex;
          flex-direction: column;
          background: #191919;
          overflow-x: hidden;
        }

        .lab-header-shell {
          margin-left: -80px;
          margin-right: -80px;
          position: relative;
          z-index: 60;
        }

        .lab-stage {
          position: relative;
          flex: 1;
          min-height: 720px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-align: center;
          padding: 32px 24px 72px;
        }

        .lab-composition {
          position: relative;
          width: min(100%, 1080px);
          height: clamp(520px, 58vh, 680px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lab-beam {
          position: absolute;
          left: 50%;
          top: 44%;
          width: clamp(760px, 68vw, 980px);
          height: auto;
          transform: translate(-50%, -53%);
          pointer-events: none;
          z-index: 5;
          overflow: visible;
        }

        .lab-title {
          position: absolute;
          left: 50%;
          top: 48%;
          z-index: 20;
          margin: 0;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: clamp(74px, 6.7vw, 96px);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: 0;
          text-transform: lowercase;
          white-space: nowrap;
        }

        .lab-subtitle {
          position: absolute;
          left: 50%;
          top: 69%;
          z-index: 20;
          width: min(92%, 820px);
          margin: 0;
          transform: translateX(-50%);
          color: #fff;
          font-size: 18px;
          font-weight: 200;
          font-style: italic;
          line-height: 1.55;
          text-align: center;
        }

        /* Dedicated tablet / foldable composition */
        @media (min-width: 701px) and (max-width: 1024px) {
          .lab-page-main {
            max-width: 100%;
            padding-left: 0;
            padding-right: 0;
          }

          .lab-header-shell {
            margin-left: 0;
            margin-right: 0;
          }

          .lab-stage {
            min-height: calc(100dvh - 88px);
            padding: 18px 32px 48px;
          }

          .lab-composition {
            width: min(100%, 860px);
            height: clamp(520px, 60vh, 660px);
          }

          .lab-beam {
            top: 43%;
            width: clamp(660px, 90vw, 820px);
            transform: translate(-50%, -53%);
          }

          .lab-title {
            top: 48%;
            font-size: clamp(64px, 8.1vw, 78px);
          }

          .lab-subtitle {
            top: 69%;
            width: min(88%, 620px);
            font-size: 16px;
            line-height: 1.5;
          }
        }

        /* Phone / wide-mobile composition */
        @media (max-width: 700px) {
          .lab-page-main {
            max-width: 100%;
            min-height: 100svh;
            padding-left: 0;
            padding-right: 0;
          }

          .lab-header-shell {
            margin-left: 0;
            margin-right: 0;
          }

          .lab-stage {
            min-height: calc(100svh - 96px);
            padding: 12px 20px 44px;
          }

          .lab-composition {
            width: 100%;
            height: clamp(430px, 62vh, 540px);
          }

          .lab-beam {
            top: 42%;
            width: clamp(470px, 122vw, 620px);
            transform: translate(-50%, -54%);
          }

          .lab-title {
            top: 48%;
            max-width: calc(100vw - 40px);
            font-size: clamp(48px, 13.2vw, 58px);
            line-height: 0.98;
          }

          .lab-subtitle {
            top: 70%;
            width: min(94%, 360px);
            font-size: 15px;
            line-height: 1.55;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lab-beam,
          .lab-title,
          .lab-subtitle {
            scroll-behavior: auto;
          }
        }
      `}</style>

      <main className="lab-page-main">
        <div className="lab-header-shell">
          <Header activePath="/lab" />
        </div>

        <section aria-labelledby="lab-title" className="lab-stage">
          <div className="lab-composition">
          <svg
            aria-hidden="true"
            className="lab-beam"
            width="980"
            height="560"
            viewBox="0 0 980 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="beam-blur-xl" x="-30%" y="-30%" width="160%" height="170%">
                <feGaussianBlur stdDeviation="42" />
              </filter>
              <filter id="beam-blur-lg" x="-25%" y="-25%" width="150%" height="160%">
                <feGaussianBlur stdDeviation="28" />
              </filter>
              <filter id="beam-blur-md" x="-20%" y="-20%" width="140%" height="150%">
                <feGaussianBlur stdDeviation="17" />
              </filter>
              <filter id="slit-glow" x="-80%" y="-500%" width="260%" height="1100%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="cone-gradient" x1="490" y1="86" x2="490" y2="430" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" stopOpacity="0.82" />
                <stop offset="0.22" stopColor="white" stopOpacity="0.46" />
                <stop offset="0.58" stopColor="white" stopOpacity="0.16" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="core-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(490 165) rotate(90) scale(245 190)">
                <stop offset="0" stopColor="white" stopOpacity="0.82" />
                <stop offset="0.32" stopColor="white" stopOpacity="0.38" />
                <stop offset="0.68" stopColor="white" stopOpacity="0.09" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="room-haze" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(490 320) rotate(90) scale(210 455)">
                <stop offset="0" stopColor="white" stopOpacity="0.2" />
                <stop offset="0.42" stopColor="white" stopOpacity="0.095" />
                <stop offset="0.78" stopColor="white" stopOpacity="0.025" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="slit-gradient" x1="350" y1="0" x2="630" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" stopOpacity="0.28" />
                <stop offset="0.14" stopColor="white" stopOpacity="0.9" />
                <stop offset="0.5" stopColor="white" />
                <stop offset="0.86" stopColor="white" stopOpacity="0.9" />
                <stop offset="1" stopColor="white" stopOpacity="0.28" />
              </linearGradient>
            </defs>

            <ellipse cx="490" cy="342" rx="455" ry="205" fill="url(#room-haze)" filter="url(#beam-blur-xl)" opacity="0.95" />
            <ellipse cx="490" cy="280" rx="310" ry="185" fill="white" opacity="0.045" filter="url(#beam-blur-xl)" />
            <path d="M372 88H608L760 410H220L372 88Z" fill="url(#cone-gradient)" filter="url(#beam-blur-lg)" opacity="0.95" />
            <path d="M402 90H578L665 360H315L402 90Z" fill="url(#core-gradient)" filter="url(#beam-blur-md)" opacity="0.74" />
            <ellipse cx="490" cy="168" rx="135" ry="116" fill="white" opacity="0.22" filter="url(#beam-blur-lg)" />
            <rect x="350" y="86" width="280" height="6" rx="3" fill="url(#slit-gradient)" filter="url(#slit-glow)" />
            <rect x="366" y="89" width="248" height="2" rx="1" fill="white" opacity="0.8" />
          </svg>

            <h1
              id="lab-title"
              className="lab-title font-inter"
            >
              coming soon
            </h1>

            <p className="lab-subtitle font-inter">
              An experimental space for prototypes, side quests, and whatever I&apos;m
              building outside the grid
            </p>
          </div>
        </section>
      </main>

      <div className="[&>footer]:mt-0">
        <Footer />
      </div>
    </>
  );
}
