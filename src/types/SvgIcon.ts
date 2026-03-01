import type { ComponentType, SVGProps } from "react";

export type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

// // For adding extra props later
// export type SvgIcon = ComponentType<
//   SVGProps<SVGSVGElement> & {
//     size?: number;
//   }
// >;