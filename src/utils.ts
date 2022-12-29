import * as colors from "colorette";

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
      .replace(/^at ([\s\S]+) \((.+)\)/, (_, m1, m2) => colors.gray(`at ${m1} (${colors.cyan(m2)})`))}`,
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
  // eslint-disable-next-line import/namespace
  const bgColorFormatter = colors[bgColor];
  return colors.bold(colors.inverse(bgColorFormatter(` ${upperType} `)));
}

export function createIcon (icon: string, iconColor: Color) {
  // eslint-disable-next-line import/namespace
  const iconColorFormatter = colors[iconColor];
  return iconColorFormatter(icon);
}
