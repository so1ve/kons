import { sep } from "pathe";
import c from "picocolors";

import type { Color } from "./types";

export function parseStack (stack: NonNullable<Error["stack"]>) {
  const cwd = process.cwd() + sep;

  const lines = stack
    .split("\n")
    .splice(1)
    .map(l => l
      .trim()
      .replace("file://", "")
      .replace(cwd, ""),
    );

  return lines;
}

export const bracket = (x: string) => x ? `[${x}]` : "";

export function createBadge (badgeType: string, bgColor: Color) {
  const upperType = badgeType.toUpperCase();
  const bgColorFormatter = c[bgColor];
  return c.bold(c.inverse(bgColorFormatter(` ${upperType} `)));
}

export function createIcon (icon: string, iconColor: Color) {
  const iconColorFormatter = c[iconColor];
  return iconColorFormatter(icon);
}
