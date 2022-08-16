import c from "picocolors";

import type { Color, Fn } from "./types";
import { formatMessage } from "./utils";

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
}

export function createFormatter (type: string, bgColor: Color, options?: Options) {
  const upperType = type.toUpperCase();
  const bgColorFormatter = c[bgColor];
  const textColorFormatter = options?.textColor ? c[options.textColor] : bgColorFormatter;
  const target = options?.target || console.log;

  return (...messages: any[]) => {
    const formattedMessages = formatMessage(messages);
    target(`${c.bold(c.inverse(bgColorFormatter(` ${upperType} `)))} ${textColorFormatter(formattedMessages.join(" "))}\n`);
  };
}

export const log = createFormatter("log", "gray");
export const info = createFormatter("info", "blue", { target: console.info });
export const warn = createFormatter("warn", "yellow", { target: console.warn });
export const success = createFormatter("success", "green");
export const error = createFormatter("error", "red", { target: console.error });
