import type { ResponsiveImageSource } from "@/types/ResponsiveImageSource";
import full_480 from "@assets/layers/Full-480.png";
import full_768 from "@assets/layers/Full-768.png";
import full_1024 from "@assets/layers/Full-1024.png";
import full_1440 from "@assets/layers/Full-1440.png";
import full_1920 from "@assets/layers/Full-1920.png";
import full_2560 from "@assets/layers/Full-2560.png";
import l1_480 from "@assets/layers/1-480.png";
import l1_768 from "@assets/layers/1-768.png";
import l1_1024 from "@assets/layers/1-1024.png";
import l1_1440 from "@assets/layers/1-1440.png";
import l1_1920 from "@assets/layers/1-1920.png";
import l1_2560 from "@assets/layers/1-2560.png";
import l2_480 from "@assets/layers/2-480.png";
import l2_768 from "@assets/layers/2-768.png";
import l2_1024 from "@assets/layers/2-1024.png";
import l2_1440 from "@assets/layers/2-1440.png";
import l2_1920 from "@assets/layers/2-1920.png";
import l2_2560 from "@assets/layers/2-2560.png";
import l3_480 from "@assets/layers/3-480.png";
import l3_768 from "@assets/layers/3-768.png";
import l3_1024 from "@assets/layers/3-1024.png";
import l3_1440 from "@assets/layers/3-1440.png";
import l3_1920 from "@assets/layers/3-1920.png";
import l3_2560 from "@assets/layers/3-2560.png";
import l4_480 from "@assets/layers/4-480.png";
import l4_768 from "@assets/layers/4-768.png";
import l4_1024 from "@assets/layers/4-1024.png";
import l4_1440 from "@assets/layers/4-1440.png";
import l4_1920 from "@assets/layers/4-1920.png";
import l4_2560 from "@assets/layers/4-2560.png";
import l5_480 from "@assets/layers/5-480.png";
import l5_768 from "@assets/layers/5-768.png";
import l5_1024 from "@assets/layers/5-1024.png";
import l5_1440 from "@assets/layers/5-1440.png";
import l5_1920 from "@assets/layers/5-1920.png";
import l5_2560 from "@assets/layers/5-2560.png";
import l6_480 from "@assets/layers/6-480.jpg";
import l6_768 from "@assets/layers/6-768.jpg";
import l6_1024 from "@assets/layers/6-1024.jpg";
import l6_1440 from "@assets/layers/6-1440.jpg";
import l6_1920 from "@assets/layers/6-1920.jpg";
import l6_2560 from "@assets/layers/6-2560.jpg";

function makeSrcSet(
  sources: Record<number, string>,
  fallback: number
): ResponsiveImageSource {
  const srcSet = Object.entries(sources)
    .map(([size, url]) => `${url} ${size}w`)
    .join(", ");
  return {
    src: sources[fallback],
    srcSet,
  };
}

const fallbackSize: number = 1024

export const full = makeSrcSet(
  { 480: full_480, 768: full_768, 1024: full_1024, 1440: full_1440, 1920: full_1920, 2560: full_2560, }, fallbackSize
);
export const l1 = makeSrcSet(
  { 480: l1_480, 768: l1_768, 1024: l1_1024, 1440: l1_1440, 1920: l1_1920, 2560: l1_2560, }, fallbackSize
);
export const l2 = makeSrcSet(
  { 480: l2_480, 768: l2_768, 1024: l2_1024, 1440: l2_1440, 1920: l2_1920, 2560: l2_2560, }, fallbackSize
);
export const l3 = makeSrcSet(
  { 480: l3_480, 768: l3_768, 1024: l3_1024, 1440: l3_1440, 1920: l3_1920, 2560: l3_2560, }, fallbackSize
);
export const l4 = makeSrcSet(
  { 480: l4_480, 768: l4_768, 1024: l4_1024, 1440: l4_1440, 1920: l4_1920, 2560: l4_2560, }, fallbackSize
);
export const l5 = makeSrcSet(
  { 480: l5_480, 768: l5_768, 1024: l5_1024, 1440: l5_1440, 1920: l5_1920, 2560: l5_2560, }, fallbackSize
);
export const l6 = makeSrcSet(
  { 480: l6_480, 768: l6_768, 1024: l6_1024, 1440: l6_1440, 1920: l6_1920, 2560: l6_2560, }, fallbackSize
);