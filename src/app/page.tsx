"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { InfiniteLogoRow } from "@/components/InfiniteLogoRow";
import AnimatedContact from "@/components/AnimatedMailLink";

gsap.registerPlugin(ScrambleTextPlugin);

// --- TẤT CẢ LOGO CHO MOBILE ---
// Định nghĩa mảng này ở ngoài component để tránh khởi tạo lại
const allMobileLogos = [
  { src: "/logos/HSBC.svg", alt: "HSBC", width: 144, height: 38 },
  { src: "/logos/Netflix.svg", alt: "Netflix", width: 106, height: 29 },
  { src: "/logos/Budweiser.svg", alt: "Budweiser", width: 126, height: 39 },
  { src: "/logos/EA.svg", alt: "EA", width: 60, height: 60 },
  {
    src: "/logos/Tencent games.svg",
    alt: "Tencent Games",
    width: 97,
    height: 39,
  },
  { src: "/logos/Garena.svg", alt: "Garena", width: 137, height: 33 },
  { src: "/logos/VNG games.svg", alt: "VNG Games", width: 71, height: 50 },
  // Logo EA.svg bị duplicate ở đây đã được XÓA
  { src: "/logos/Pixelmon.svg", alt: "Pixelmon", width: 125, height: 32 },
  {
    src: "/logos/Storygrounds.svg",
    alt: "Story Grounds",
    width: 142,
    height: 42,
  },
  { src: "/logos/Azuki.svg", alt: "Azuki", width: 121, height: 24 },
  { src: "/logos/Neuro sama.svg", alt: "Neuro Sama", width: 88, height: 53 },
  {
    src: "/logos/Pudgy_Penguins_Logo.svg",
    alt: "Pudgy Penguins",
    width: 93,
    height: 49,
  },
  {
    src: "/logos/Aether studios.svg",
    alt: "Aether Studios",
    width: 58,
    height: 71,
  },
  { src: "/logos/Bucketman.svg", alt: "Bucket Man", width: 76, height: 76 },
  { src: "/logos/Viu.svg", alt: "Viu", width: 75, height: 39 },
  {
    src: "/logos/Sappy seals.svg",
    alt: "Sappy Seals",
    width: 75,
    height: 56,
  },
  {
    src: "/logos/Kamen america.svg",
    alt: "Kamen America",
    width: 71,
    height: 36,
  },
  { src: "/logos/voyca.me.svg", alt: "Voyce", width: 100, height: 40 },
  { src: "/logos/Cluely.svg", alt: "Cluely", width: 164, height: 40 },
  {
    src: "/logos/Mythic talent.svg",
    alt: "Mythic Talent",
    width: 146,
    height: 38,
  },
];
// TỔNG CỘNG: 19 LOGO

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  // mobile Detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // scramble effect
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    const cursorTl = gsap.timeline({ repeat: -1 });
    cursorTl
      .to("#scramble-cursor", { opacity: 0, duration: 0.5, delay: 0.2 })
      .to("#scramble-cursor", { opacity: 1, duration: 0.5, delay: 0.2 });

    gsap.set("#scramble-text-original", { opacity: 0 });

    tl.to("#scramble-text-1", {
      scrambleText: {
        text: "We Animate Like",
        chars: "upperAndLowerCase",
        speed: 0.4,
      },
      duration: 2,
    })
      .to("#scramble-text-2", {
        scrambleText: { text: "Scientists.", chars: "XO", speed: 0.4 },
        duration: 1.5,
      })
      .to("#scramble-text-3", {
        scrambleText: {
          text: "Or Madmen",
          chars: "upperAndLowerCase",
          speed: 0.3,
        },
        duration: 1.5,
      })
      .add(cursorTl);

    window.onclick = () => tl.restart();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black" suppressHydrationWarning>
      {/* ========== HERO VIDEO + TEXT SCRAMBLE ========== */}

      <section
        className={`
    relative flex flex-col justify-end items-center gap-[10px] shrink-0
    overflow-hidden bg-cover bg-center bg-no-repeat
    ${
      isMobile
        ? "w-screen min-h-[100svh]" // ✅ full màn hình mobile
        : "w-screen min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] px-4 sm:px-6 md:px-8"
    }
  `}
        style={
          isMobile
            ? {
                display: "flex",
                width: "100vw",
                height: "100svh",
                padding: "622px 18px 78px 18px",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                flexShrink: 0,
              }
            : undefined
        }
      >
        {/* VIDEO */}
        <video
          src="/OTSULAB.mov"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* TEXT */}
        <div
          className={`
      z-10 text-white font-[600] font-geist
      absolute left-4 sm:left-8 md:left-[48px]
      bottom-[18%] sm:bottom-[12%] md:bottom-[10%]
      text-left
    `}
        >
          {/* ✅ MOBILE TEXT with SCRAMBLE */}
          {isMobile && (
            <div className="text-scramble__content text-[35px] w-[90vw] max-w-[90vw] tracking-[-0.03em] leading-[1.05] font-normal">
              <p id="scramble-text-original">
                We Animate Like
                <br />
                Scientists. Or Madmen
              </p>
              <p className="text-scramble__text" aria-hidden="true">
                <span id="scramble-text-1"></span>
                <span> </span>
                <span id="scramble-text-2"></span>
                <span> </span>
                <span id="scramble-text-3"></span>
              </p>
            </div>
          )}

          {/* DESKTOP/TABLET TEXT (giữ nguyên) */}
          {!isMobile && (
            <div className="hidden sm:block text-scramble__content text-3xl md:text-[56px] lg:text-[64px] xl:text-[72px] max-w-[80vw] md:max-w-[58vw] lg:max-w-[60vw] tracking-[-0.04em] leading-[0.95] font-normal">
              <p id="scramble-text-original">
                We Animate Like
                <br />
                Scientists. Or Madmen
              </p>
              <p className="text-scramble__text" aria-hidden="true">
                <span id="scramble-text-1"></span>
                <span> </span>
                <span id="scramble-text-2"></span>
                <span> </span>
                <span id="scramble-text-3"></span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== OUR CLIENTS + DESCRIPTION ========== */}
      <section
        className={`
          w-full mx-auto
          flex flex-col md:flex-row flex-nowrap
          items-start justify-between
          px-4 sm:px-6 md:pl-[32px]
          ${isMobile ? "mt-[80px] mb-[150px]" : "mt-12 md:mt-[141px]"}
          ${!isMobile ? "gap-6 md:gap-[220px]" : ""}
        `}
      >
        {/* OUR CLIENTS BUTTON */}
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <button
            className="
              uppercase text-[10px] sm:text-[11px] md:text-[12px]
              tracking-[0.15em] font-geist-mono font-medium
              border border-black rounded-full
              px-5 py-[6px]
              hover:bg-black hover:text-white
              transition-colors duration-300
              w-auto h-[34px] whitespace-nowrap
            "
          >
            OUR CLIENTS
          </button>
        </div>

        {/* TEXT CONTENT */}
        <div
          className="
            flex-1 font-geist
            w-full md:max-w-[880px]
          "
        >
          <h2
            className="
              text-[26px] sm:text-[28px] md:text-[30px] lg:text-[36px] xl:text-[50px]
              leading-[1.1] md:leading-[1.3] lg:leading-[1.4]
              font-normal
              tracking-[-0.03em] sm:tracking-[-0.04em] md:tracking-[-0.05em]
              text-left
            "
          >
            {/* MOBILE */}
            <span className="block md:hidden w-screen -ml-4 px-4 text-[35px] leading-[1.15] sm:text-[32px] tracking-[-0.03em]">
              Otsu Labs is a creative <br />
              studio crafting frame
              <br />
              -by-frame animation for advertising social
              <br /> media, tv, and beyond.
            </span>

            {/* DESKTOP / TABLET */}
            <span className="hidden md:block">
              Otsu Labs is a creative studio <br />
              crafting frame-by-frame animation <br />
              for advertising, social media, tv, <br />
              and beyond.
            </span>
          </h2>
        </div>
      </section>

      {/* ========== CLIENT LOGO SECTION (ĐÃ SỬA) ========== */}
      <section className="flex flex-col items-center mt-12 md:mt-[141px] mb-12 md:mb-20 space-y-6 sm:space-y-8 md:space-y-[52px] px-2 sm:px-4 md:px-8">
        {/* ====== MOBILE ====== */}
        {isMobile && (
          // Chỉ gọi 1 LẦN DUY NHẤT, truyền tất cả logo vào
          <InfiniteLogoRow logos={allMobileLogos} />
        )}

        {/* ====== DESKTOP ====== */}
        {!isMobile && (
          <>
            <InfiniteLogoRow
              logos={[
                { src: "/logos/HSBC.svg", alt: "HSBC", width: 144, height: 38 },
                {
                  src: "/logos/Netflix.svg",
                  alt: "Netflix",
                  width: 106,
                  height: 29,
                },
                {
                  src: "/logos/Budweiser.svg",
                  alt: "Budweiser",
                  width: 126,
                  height: 39,
                },
                { src: "/logos/EA.svg", alt: "EA", width: 60, height: 60 },
                {
                  src: "/logos/VNG games.svg",
                  alt: "VNG Games",
                  width: 71,
                  height: 50,
                },
                {
                  src: "/logos/Tencent games.svg",
                  alt: "Tencent Games",
                  width: 97,
                  height: 39,
                },
              ]}
              direction="left"
              speed={35}
            />

            <InfiniteLogoRow
              logos={[
                {
                  src: "/logos/Garena.svg",
                  alt: "Garena",
                  width: 137,
                  height: 33,
                },
                {
                  src: "/logos/Pixelmon.svg",
                  alt: "Pixelmon",
                  width: 125,
                  height: 32,
                },
                {
                  src: "/logos/Mythic talent.svg",
                  alt: "Mythic Talent",
                  width: 146,
                  height: 38,
                },
                {
                  src: "/logos/Cluely.svg",
                  alt: "Cluely",
                  width: 164,
                  height: 40,
                },
                {
                  src: "/logos/Storygrounds.svg",
                  alt: "Story Grounds",
                  width: 142,
                  height: 42,
                },
                {
                  src: "/logos/Azuki.svg",
                  alt: "Azuki",
                  width: 200,
                  height: 40,
                },
              ]}
              direction="right"
              speed={32}
            />

            <InfiniteLogoRow
              logos={[
                {
                  src: "/logos/Neuro sama.svg",
                  alt: "Neuro Sama",
                  width: 88,
                  height: 53,
                },
                { src: "/logos/Viu.svg", alt: "Viu", width: 75, height: 39 },
                {
                  src: "/logos/Sappy seals.svg",
                  alt: "Sappy Seals",
                  width: 75,
                  height: 56,
                },
                {
                  src: "/logos/Kamen america.svg",
                  alt: "Kamen America",
                  width: 71,
                  height: 36,
                },
                {
                  src: "/logos/Pudgy_Penguins_Logo.svg",
                  alt: "Pudgy Penguins",
                  width: 93,
                  height: 49,
                },
                {
                  src: "/logos/Aether studios.svg",
                  alt: "Aether Studios",
                  width: 58,
                  height: 71,
                },
                {
                  src: "/logos/Bucketman.svg",
                  alt: "Bucket Man",
                  width: 76,
                  height: 76,
                },
              ]}
              direction="left"
              speed={38}
            />
          </>
        )}
      </section>

      {/* ========== CONTACT + FOOTER ========== */}
      <AnimatedContact suppressHydrationWarning={true} />

      <div className="w-full mx-auto px-4 sm:px-6 md:px-0 md:pl-[32px]">
        <div
          className={`
      footer-text text-left tracking-wider leading-[16px] text-[#818181]
      ${isMobile ? "text-[10px]" : "!text-[14px]"}
      font-geist pb-8 md:pb-[40px]
    `}
        >
          WE'RE UPDATING OUR WEBSITE RIGHT NOW.
          <br />
          THE PREVIOUS VERSION IS STILL AVAILABLE AT{" "}
          <a
            href="https://otsulabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors duration-300 hover:text-[#000000]"
          >
            OTSULABS.COM
          </a>
        </div>
      </div>
    </main>
  );
}
