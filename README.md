# kons

[![NPM version](https://img.shields.io/npm/v/kons?color=a1b858&label=)](https://www.npmjs.com/package/kons)

An elegant console logger.

## Features

- Tiny (Minified + Gzipped ≈ 0.1kB). Beautiful. Easy to use.
- Customizable.
- TypeScript type declarations included.
- `NO_COLOR` friendly.

## Installation

```console
# NPM
$ npm install kons

# Yarn
$ yarn add kons

# PNPM
$ pnpm add kons
```

## Usage

```ts
import { error, info, log, success, warn } from "kons";

log("Hello World!");
info("This is kons!");
warn("Warning!");
error("Error!");
success("Success!");
```

Output:

![](./assets/output.png)

### Advanced Usage

```ts
import { createLogType } from "kons";

// Parameter 1: Log type
// Parameter 2: Log color, see [picocolors](https://npmjs.com/package/picocolors) for available colors
// Parameter 3?: Log target, a function that accepts a string
const myLog = createLogType("myLog", "cyan", console.info);
```

## License

[MIT](./LICENSE) License © 2022 [Ray](https://github.com/so1ve)
