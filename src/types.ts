import type * as colors from "colorette";

export type Color = keyof Omit<typeof colors, "createColors" | "isColorSupported">;
export type Fn = (...args: any[]) => any;
