"use client";
// [ĐÃ XÓA] useEffect, useState

interface AnimatedContactProps {
  suppressHydrationWarning?: boolean;
}

const AnimatedContact = ({
  suppressHydrationWarning,
}: AnimatedContactProps) => {
  const text = "contact@otsulabs.com";
  const letters = text.split("");
  // [ĐÃ XÓA] Toàn bộ state và useEffect của isMobile

  return (
    <div
      className={`
        mt-4 sm:mt-8 md:mt-[232px] 
        mb-16 sm:mb-20 md:mb-[230px]
        flex justify-center px-4
      `}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      <div>
        <a
          href="mailto:contact@otsulabs.com"
          target="_blank"
          rel="noreferrer"
          className={`
            inline-flex font-geist leading-tight
            text-[24px] mt-[80px] mb-[218px]
            sm:text-2xl md:text-4xl lg:text-5xl xl:text-[55px] 
            sm:mt-0 sm:mb-0
            group
          `}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              className={`relative inline-block overflow-hidden letter-wrapper`}
              style={{
                ["--delay" as any]: `${i * 40}ms`,
              }}
            >
              {/* Top layer */}
              <span className={`letter letter-top block text-[#818181]`}>
                {letter === " " ? "\u00A0" : letter}
              </span>

              {/* Bottom layer */}
              <span
                className={`letter letter-bottom absolute left-0 top-0 block text-[#818181]`}
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
