import c from "picocolors";
import figures from "figures";

import type { Color } from "./types";
import { createBadge, createIcon, parseStack } from "./utils";

type Fn = (...args: any[]) => any;

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

function formatStack (stack: NonNullable<Error["stack"]>) {
  return `\n${parseStack(stack)
    .map(line => `  ${line
      .replace(/^at +/, m => c.gray(m))
      .replace(/\((.+)\)/, (_, m) => `(${c.cyan(m)})`)}`,
    )
    .join("\n")}`;
}

function formatMessage (messages: any[]) {
  return messages.map((m) => {
    if (m && typeof m.stack === "string") {
      return `${m.message}\n${formatStack(m.stack)}`;
    }
    return m;
  });
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
