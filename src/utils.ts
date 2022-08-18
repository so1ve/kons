import c from "picocolors";

import type { Color } from "./types";

function parseStack (stack: string) {
  const lines = stack
    .split("\n")
    .splice(1)
    .map(l => l
      .trim()
      .replace("file://", ""),
    );

  return lines;
}

function formatStack (stack: string) {
  return `\n${parseStack(stack)
    .map(line => `  ${line
      .replace(/^at ([\s\S]+) \((.+)\)/, (_, m1, m2) => c.gray(`at ${m1} (${c.cyan(m2)})`))}`,
    )
    .join("\n")}`;
}

export function formatMessage (messages: any[]) {
  return messages.map((m) => {
    if (typeof m?.stack === "string") {
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
