import figures from "figures";
import colors from "picocolors";

import type { Color, Fn } from "./types";
import { createBadge, createIcon, formatMessage } from "./utils";

export interface Options {
  /** Log target. A function that accepts a string */
  target?: Fn;
  /** Log text color, default to bgColor */
  textColor?: Color;
  /** An option if the log type should be shown as a badge */
  isBadge?: boolean;
  /** Trailing newline */
  newline?: boolean;
}

export function createFormatter(
  iconOrType: string,
  iconColor: Color,
  { target = console.log, textColor, isBadge, newline }: Options = {},
) {
  const iconFormatter = isBadge ? createBadge : createIcon;

  const textColorFormatter = textColor ? colors[textColor] : colors[iconColor];

  return (...messages: any[]) => {
    const formattedMessages = formatMessage(messages);
    const icon = iconFormatter(iconOrType, iconColor);
    for (const message of formattedMessages) {
      target(`${icon} ${textColorFormatter(message)}${newline ? "\n" : ""}`);
    }
  };
}

export const log = createFormatter(figures.pointer, "gray");
export const info = createFormatter(figures.info, "blue", {
  target: console.info,
});
export const warn = createFormatter(figures.warning, "yellow", {
  target: console.warn,
});
export const success = createFormatter(figures.tick, "green");
export const error = createFormatter("error", "red", {
  target: console.error,
  isBadge: true,
});
