// src/components/InfiniteLogoRow.tsx

"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface InfiniteLogoRowProps {
  logos: Logo[];
  direction?: "left" | "right";
  speed?: number; // px per second
}

const DESKTOP_MARGIN = 60; // Khoảng cách giữa các logo

export function InfiniteLogoRow({
  logos,
  direction = "left",
  speed = 35,
}: InfiniteLogoRowProps) {
  return (
    <div
      className="relative w-full max-w-full overflow-hidden"
      style={{
        padding: "32px 0", // khoảng cách đều giữa các dòng
      }}
    >
      <Marquee
        direction={direction}
        speed={speed}
        pauseOnHover={true}
        gradient={false}
        autoFill={true}
        className="overflow-visible"
      >
        {logos.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center flex-shrink-0"
            style={{
              margin: `0 ${DESKTOP_MARGIN}px`,
              minWidth: `${logo.width}px`, // giữ chỗ trước khi ảnh load
              height: `${logo.height}px`,
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              priority
              unoptimized
              loading="eager"
              className="block object-contain select-none opacity-90 hover:opacity-100 transition-opacity duration-300"
              style={{
                maxHeight: logo.height,
                maxWidth: logo.width,
              }}
              draggable={false}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
