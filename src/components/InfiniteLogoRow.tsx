// src/components/InfiniteLogoRow.tsx

"use client";
import Image from "next/image";
// [GIẢI PHÁP] Import thư viện
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

const DESKTOP_MARGIN = 50; // 25px mỗi bên

// Component này giờ CHỈ render marquee desktop
export function InfiniteLogoRow({
  logos,
  direction = "left",
  speed = 35,
}: InfiniteLogoRowProps) {
  return (
    <div
      className="relative w-full max-w-full overflow-hidden"
      // [GIẢI PHÁP] Bỏ height cố định, dùng padding (py-6 = 24px)
      // Điều này đảm bảo khoảng cách trực quan bằng nhau
      style={{ padding: "30px 0" }}
    >
      <Marquee
        direction={direction}
        speed={speed}
        pauseOnHover={true}
        gradient={false}
        autoFill={true}
      >
        {logos.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center flex-shrink-0"
            style={{ margin: `0 ${DESKTOP_MARGIN}px` }}
          >
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="client-logo select-none h-auto w-auto"
              style={{
                maxWidth: "100px",
                display: "block",
                objectFit: "contain",
              }}
              draggable={false}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
