import type c from "colorette";

export type Color = keyof Omit<typeof c, "createColors" | "isColorSupported">;
export type Fn = (...args: any[]) => any;
