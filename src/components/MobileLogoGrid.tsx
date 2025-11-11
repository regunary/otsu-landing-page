// src/components/MobileLogoGrid.tsx

"use client";
import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface MobileLogoGridProps {
  logos: Logo[];
}

/**
 * Hàm chia mảng cho Mobile
 */
function splitIntoRows(items: Logo[]): Logo[][] {
  const n = items.length;
  if (n === 0) return [];
  if (n <= 4) return [items];
  if (n === 5) {
    return [items.slice(0, 3), items.slice(3, 5)];
  }
  const baseRows = Math.floor(n / 3);
  const remainder = n % 3;
  const sizes = Array(baseRows).fill(3);
  if (remainder === 1) {
    sizes[1] += 1;
  } else if (remainder === 2) {
    if (baseRows === 2) {
      sizes[0] += 1;
      sizes[1] += 1;
    } else {
      sizes[1] += 1;
      sizes[2] += 1;
    }
  }
  const result = [];
  let index = 0;
  for (const size of sizes) {
    result.push(items.slice(index, index + size));
    index += size;
  }
  if (index < n) {
    result.push(items.slice(index));
  }
  return result;
}

export function MobileLogoGrid({ logos }: MobileLogoGridProps) {
  const logoRows = splitIntoRows(logos);

  return (
    <div className="w-full">
      <div className="grid gap-4 sm:gap-6">
        {logoRows.map((row, rowIndex) => {
          const colsClass =
            row.length === 4
              ? "grid-cols-4"
              : row.length === 2
              ? "grid-cols-2 justify-center"
              : "grid-cols-3";
          return (
            <div
              key={`row-${rowIndex}`}
              className={`grid ${colsClass} gap-4 sm:gap-6 ${
                row.length === 2 ? "mx-auto w-2/3" : ""
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
