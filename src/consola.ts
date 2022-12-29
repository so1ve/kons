import c from "colorette";
import figures from "figures";

import type { Color, Fn } from "./types";
import { createBadge, createIcon, formatMessage } from "./utils";

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
   * An option if the log type should be shown as a badge
   */
  isBadge?: boolean
}

export function createFormatter (iconOrType: string, iconColor: Color, options?: Options) {
  const iconFormatter = options?.isBadge ? createBadge : createIcon;
  const textColorFormatter = options?.textColor ? c[options.textColor] : c[iconColor];
  const target = options?.target || console.log;

  return (...messages: any[]) => {
    const formattedMessages = formatMessage(messages);
    target(`${iconFormatter(iconOrType, iconColor)} ${textColorFormatter(formattedMessages.join(" "))}\n`);
  };
}

export const log = createFormatter(figures.pointer, "gray");
export const info = createFormatter(figures.info, "blue", { target: console.info });
export const warn = createFormatter(figures.warning, "yellow", { target: console.warn });
export const success = createFormatter(figures.tick, "green");
export const error = createFormatter("error", "red", { target: console.error, isBadge: true });
