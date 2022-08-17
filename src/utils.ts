import c from "picocolors";

import type { Color } from "./types";

function parseStack (stack: NonNullable<Error["stack"]>) {
  const lines = stack
    .split("\n")
    .splice(1)
    .map(l => l
      .trim()
      .replace("file://", ""),
    );

  return lines;
}

function formatStack (stack: NonNullable<Error["stack"]>) {
  return `\n${parseStack(stack)
    .map(line => `  ${line
      .replace(/^at +/, m => c.gray(m))
      .replace(/\((.+)\)/, (_, m) => `(${c.cyan(m)})`)}`,
    )
    .join("\n")}`;
}

export function formatMessage (messages: any[]) {
  return messages.map((m) => {
    if (m && typeof m.stack === "string") {
      return `${m.message}\n${formatStack(m.stack)}`;
    }
    return m;
  });
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
