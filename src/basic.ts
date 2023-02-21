import colors from "picocolors";

import type { Color, Fn } from "./types";
import { createBadge, formatMessage } from "./utils";

export interface Options {
  /**
   * Log target.
   * A function that accepts a string
   */
  target?: Fn
  /**
   * Log text color, default to bgColor
   */
  textColor?: Color
  /**
   * Trailing newline
   */
  newline?: boolean
}

export function createFormatter (type: string, bgColor: Color, {
  target = console.log,
  textColor,
  newline = true,
}: Options = {}) {
  // eslint-disable-next-line import/namespace
  const bgColorFormatter = colors[bgColor];
  // eslint-disable-next-line import/namespace
  const textColorFormatter = textColor ? colors[textColor] : bgColorFormatter;

  return (...messages: any[]) => {
    const formattedMessages = formatMessage(messages);
    const badge = createBadge(type, bgColor);
    for (const message of formattedMessages) {
      target(`${badge} ${textColorFormatter(message)}${newline ? "\n" : ""}}`);
    }
  };
}

export const log = createFormatter("log", "gray");
export const info = createFormatter("info", "blue", { target: console.info });
export const warn = createFormatter("warn", "yellow", { target: console.warn });
export const success = createFormatter("success", "green");
export const error = createFormatter("error", "red", { target: console.error });
