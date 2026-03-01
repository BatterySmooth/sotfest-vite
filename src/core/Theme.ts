export const Theme = {
  Parimary: "primary",
  Secondary: "secondary",
} as const;

export type Theme = typeof Theme[keyof typeof Theme];