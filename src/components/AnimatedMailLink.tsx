"use client";

import { useEffect, useState } from "react";

interface AnimatedContactProps {
  suppressHydrationWarning?: boolean;
}

const AnimatedContact = ({
  suppressHydrationWarning,
}: AnimatedContactProps) => {
  const text = "contact@otsulabs.com";
  const letters = text.split("");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      className={`mt-4 sm:mt-8 md:mt-[232px] mb-16 sm:mb-20 ${
        isMobile ? "md:mb-[181px]" : "md:mb-[230px] mb-[181px]"
      } flex justify-center px-4`}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      <div>
        <a
          href="mailto:contact@otsulabs.com"
          target="_blank"
          rel="noreferrer"
          className={`
            inline-flex font-geist leading-tight
            
            ${
              isMobile
                ? "text-[24px] mt-[80px] mb-[218px]"
                : "text-[60px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-[55px] group"
            }
          `}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              className={`relative inline-block overflow-hidden letter-wrapper ${
                isMobile ? "" : "animated"
              }`}
              style={{
                ["--delay" as any]: isMobile ? "0ms" : `${i * 40}ms`,
              }}
            >
              {/* Top layer */}
              <span
                className={`letter letter-top block text-[#818181] ${
                  isMobile ? "transform-none" : ""
                }`}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>

              {/* Bottom layer */}
              <span
                className={`letter letter-bottom absolute left-0 top-0 block text-[#818181] ${
                  isMobile ? "transform-none" : ""
                }`}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            </span>
          ))}
        </a>
      </div>
    </div>
  );
};

export default AnimatedContact;
