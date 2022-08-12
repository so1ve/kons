import c from "picocolors";

export type Colors = keyof Omit<typeof c, "createColors" | "isColorSupported">;

type Fn = (...args: any[]) => any;

export function createLogType (type: string, color: Colors, target: Fn = console.log) {
  const upperType = type.toUpperCase();
  const colorFormatter = c[color];
  return (...messages: any[]) => {
    target(`\n${c.bold(c.inverse(colorFormatter(` ${upperType} `)))} ${colorFormatter(messages.join(" "))}`);
  };
}

export const log = createLogType("log", "gray");
export const info = createLogType("info", "blue", console.info);
export const warn = createLogType("warn", "yellow", console.warn);
export const success = createLogType("success", "green");
export const error = createLogType("error", "red", console.error);
