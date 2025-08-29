# diceRoller

A tiny, modern **TypeScript** command‑line dice roller.

- **CLI name:** `diceRoller`
- **Language/stack:** TypeScript, ESM, Commander, tsx, tsup
- **Node target:** Node 20 (ES2022)
- **Version:** 1.0.0

---

## Features

- Roll a single die using a **quick shorthand** for common sizes: `2`, `4`, `6`, `10`, `12`, `20`, `100`  
  e.g. `-r 20` rolls `1d20`.
- Roll with full dice notation: **`NdM+K`** (e.g. `3d6+2`, `2d10`, `1d12+5`).
- Outputs the formula, each individual roll, optional modifier, and the total.

**Examples of output**

```
1d20 => 13 => 13
3d6+2 => 2+4+5 +2 => 13
```

> Notes
> - Only **positive** `+K` modifiers are supported in this version.
> - Whitespace is not supported in the dice string (use `3d6+2`, not `3d6 + 2`).

---

## Install

```bash
pnpm install
```

This project uses **pnpm** and ESM. If you don’t have pnpm:

```bash
corepack prepare pnpm@latest --activate
```

---

## Usage

### Run without building (dev)

Use `pnpm exec` (or the shorthand `pnpm tsx …`) to run the TypeScript entry directly:

```bash
pnpm tsx src/cli.ts -r 20
pnpm tsx src/cli.ts -r "3d6+2"
```

### Build

```bash
tsup src/cli.ts --format esm --target node20 --sourcemap --clean --dts --out-dir dist --splitting false --minify
```

This emits ESM to `dist/cli.mjs`.

### Link locally as a real command

```bash
pnpm link --global
diceRoller -r 20
diceRoller -r "3d6+2"
```

> If you prefer not to link globally, you can also run:  
> `pnpm exec diceRoller -r 20` (after `pnpm build`).

---

## Command‑line options

```
-r, --roll <value>   Roll dice
```

**Accepted values**
- **Quick shorthand:** `2 | 4 | 6 | 10 | 12 | 20 | 100` → treated as `1d<value>`  
  (e.g., `-r 6` rolls `1d6`).
- **Dice notation:** `NdM+K` (e.g., `3d6+2`, `2d10`, `1d12+5`).

If the input is invalid (e.g., missing a `d`), the program prints an error like:

```
Invalid dice string: <your input>
```

---

## Project structure

```
src/
  cli.ts        # CLI entry point
tsconfig.json   # Strict TS config (ES2022 / ESNext modules)
package.json    # ESM, bin points at dist/cli.mjs
```

Key dependencies:
- **commander** – CLI parsing
- **random** – integer RNG
- **chalk** – pretty output

Dev tooling:
- **tsx** – fast TS runner
- **tsup** – bundler (ESM, single file)
- **vitest** – tests (none included yet)

---

## Scripts

From `package.json`:

```jsonc
{
  "dev": "tsx src/cli.ts -r",
  "build": "tsup src/cli.ts --format esm --target node20 --sourcemap --clean --dts --out-dir dist --splitting false --minify",
  "test": "vitest run",
  "prepare": "pnpm run build"
}
```

Use `pnpm run <script>` to invoke any of the above.

---

## Requirements

- Node.js 18+ (Node 20 recommended)
- pnpm 8+

---

## Roadmap ideas

- Support negative modifiers (e.g., `3d6-1`)
- Multiple groups (e.g., `2d6+1 1d12+2`)
- Advantage/disadvantage, drop/keep, exploding dice
- Seeded RNG for reproducible rolls

---

## License

MIT
