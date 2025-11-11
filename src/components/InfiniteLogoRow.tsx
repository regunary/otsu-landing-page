"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

/**
 * [ĐÃ SỬA] Hàm chia mảng theo logic:
 * - Tối đa 4 phần tử / hàng
 * - Tối thiểu 3 phần tử / hàng (ngoại trừ hàng cuối cùng nếu n=5)
 * - Phân phối số dư (1 hoặc 2) từ hàng thứ 2 trở đi.
 */
function splitIntoRows(items: Logo[]): Logo[][] {
  const n = items.length;
  if (n === 0) return [];

  // 1. Xử lý các trường hợp đơn giản (1-4 phần tử)
  // n=1, 2, 3, 4 -> Tất cả vào 1 hàng
  if (n <= 4) return [items];

  // 2. Xử lý trường hợp đặc biệt n=5
  // Luật (min 3, max 4) không thể thỏa mãn.
  // Ưu tiên "max 4" (vì liên quan đến layout), ta chia thành [3, 2]
  if (n === 5) {
    return [items.slice(0, 3), items.slice(3, 5)];
  }

  // 3. Xử lý các trường hợp n >= 6
  // Logic chuẩn: chia 3 và phân phối số dư
  const baseRows = Math.floor(n / 3);
  const remainder = n % 3;

  const sizes = Array(baseRows).fill(3);

  if (remainder === 1) {
    // n=7 (rows=2, rem=1) -> sizes=[3, 3] -> [3, 4]
    // n=10 (rows=3, rem=1) -> sizes=[3, 3, 3] -> [3, 4, 3]
    sizes[1] += 1; // Thêm vào hàng thứ 2
  } else if (remainder === 2) {
    // n=8 (rows=2, rem=2) -> sizes=[3, 3]
    // Cần thêm 2. Thêm vào hàng 1 và 2 (vì không có hàng 3)
    // -> [4, 4]
    if (baseRows === 2) {
      sizes[0] += 1;
      sizes[1] += 1;
    } else {
      // n=11 (rows=3, rem=2) -> sizes=[3, 3, 3]
      // Thêm vào hàng 2 và 3 -> [3, 4, 4]
      sizes[1] += 1;
      sizes[2] += 1;
    }
  }

  // Cắt mảng items theo sizes đã tính
  const result = [];
  let index = 0;
  for (const size of sizes) {
    result.push(items.slice(index, index + size));
    index += size;
  }

  // **Quan trọng**: Xử lý nếu còn sót (mặc dù logic trên đã đủ)
  if (index < n) {
    result.push(items.slice(index));
  }

  return result;
}

export function InfiniteLogoRow({
  logos,
  direction = "left",
  speed = 35,
}: InfiniteLogoRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const [rendered, setRendered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (!rendered || isMobile) return;
    const layers = layersRef.current;
    const width = layers[0]?.scrollWidth || 0;
    if (width === 0) return;

    let positions = layers.map((_, i) => i * width);
    const dir = direction === "left" ? -1 : 1;
    let last = performance.now();
    let rafId: number;

    const step = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;

      const move = speed * dir * delta;
      positions = positions.map((p) => p + move);

      for (let i = 0; i < layers.length; i++) {
        const el = layers[i];
        if (!el) continue;
        el.style.transform = `translateX(${positions[i]}px)`;
      }

      for (let i = 0; i < layers.length; i++) {
        if (direction === "left" && positions[i] <= -width) {
          const max = Math.max(...positions);
          positions[i] = max + width;
        } else if (direction === "right" && positions[i] >= width) {
          const min = Math.min(...positions);
          positions[i] = min - width;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [rendered, direction, speed, logos, isMobile]);

  //--- RENDER PHẦN MOBILE (ĐÃ SỬA LOGIC) ---
  if (isMobile) {
    const logoRows = splitIntoRows(logos);
    // console.log("[v1] Mobile mode - Total logos:", logos.length);
    // console.log(
    //   "[v1] Logo rows structure:",
    //   logoRows.map((row) => row.length)
    // );

    return (
      <div className={`${isMobile ? "w-full" : "w-full px-4"}`}>
        <div className="grid gap-4 sm:gap-6">
          {logoRows.map((row, rowIndex) => {
            // Logic class: Nếu hàng có 2 ptử (chỉ xảy ra ở n=5) -> grid-cols-2
            // Nếu 4 ptử -> grid-cols-4
            // Mặc định (3 ptử) -> grid-cols-3
            const colsClass =
              row.length === 4
                ? "grid-cols-4"
                : row.length === 2
                ? "grid-cols-2 justify-center" // Thêm justify-center cho đẹp nếu là 2
                : "grid-cols-3";

            // console.log(
            //   "[v1] Row",
            //   rowIndex,
            //   "- items:",
            //   row.length,
            //   "- class:",
            //   colsClass
            // );

            return (
              <div
                key={`row-${rowIndex}`}
                className={`grid ${colsClass} gap-4 sm:gap-6 ${
                  row.length === 2 ? "mx-auto w-2/3" : "" // Căn giữa hàng có 2
                }`}
              >
                {row.map((logo, logoIdx) => (
                  <div
                    key={`${rowIndex}-${logoIdx}`}
                    className="flex items-center justify-center"
                    style={{ minHeight: "50px" }}
                  >
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="client-logo select-none h-auto w-auto"
                      style={{
                        maxWidth: "60px",
                        display: "block",
                        objectFit: "contain",
                      }}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  //--- RENDER PHẦN DESKTOP (ĐÃ SỬA LỖI LẶP) ---
  // const repeatedLogos = [...logos, ...logos, ...logos]; // [XÓA] Dòng này gây lỗi

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full overflow-hidden flex items-center"
      style={{ height: "auto", minHeight: 60 }}
    >
      {[0, 1, 2].map((idx) => (
        <div
          key={idx}
          ref={(el) => {
            if (el) layersRef.current[idx] = el;
          }}
          className="flex items-center absolute left-0 top-0"
          style={{ gap: "30px" }}
        >
          {/* [SỬA LỖI] 
            Thay "repeatedLogos.map" bằng "logos.map".
            Mỗi layer chỉ cần render 1 lần danh sách logo.
          */}
          {logos.map((logo, i) => (
            <div
              key={`${idx}-${i}`}
              className="flex items-center justify-center flex-shrink-0"
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
        </div>
      ))}
    </div>
  );
}
