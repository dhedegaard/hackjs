# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A TypeScript implementation of the Hack computer from [nand2tetris](https://www.nand2tetris.org/). There is no runnable application yet — the library is exercised entirely through unit tests. It is not published to npm, which is why there is no build/`dist/` output.

## Commands

The project runs on [Bun](https://bun.sh) — there is no Node/Jest tooling and no build step.

- `bun test` — run the test suite (`bun test --watch` for watch mode).
- `bun test src/gates/elementary.spec.ts` — run a single test file.
- `bun run typecheck` — `tsc --noEmit`. Bun does not type-check when running tests, so run this alongside them.
- `bun run lint` — [oxlint](https://oxc.rs) with type-aware rules (`oxlint-tsgolint`) over `src/`, configured in `.oxlintrc.json` (`correctness`/`suspicious`/`pedantic`/`perf`/`restriction` categories as errors — `style` is deliberately not enabled). The config is categories-only by design: no per-rule entries, no overrides. Keep it that way — when a rule fires, restructure the code rather than disabling or configuring the rule.
  - `oxlint-tsgolint`'s version tracks TypeScript's (`7.0.2001` = TS 7.0.2 + patch) — when bumping `typescript`, bump it to the matching version so compiler and linter share semantics.
  - A clean run prints nothing when output is piped — check the exit code rather than assuming it didn't scan.
  - `oxlint --rules` prints nothing here — probe what a rule/category does empirically instead: lint a scratch file with `-D <category>`, or preview config changes with `oxlint -c <candidate-config> --type-aware src/` before touching `.oxlintrc.json`.
  - Enabled-rule pairs make some code shapes unwritable — restructure instead: any `undefined` comparison (`no-undefined` bans `=== undefined`, `unicorn/no-typeof-undefined` bans the `typeof` form) — design values to never be `undefined`, e.g. index tuples at literal positions; spreading a string (`typescript/no-misused-spread`) — use `Array.from(str)`.

CI (`.github/workflows/ci.yml`) runs `bun run typecheck`, `bun run lint`, then `bun test`.

## Architecture

Everything is built bottom-up from a single primitive: the `Nand` gate in `src/gates/elementary.ts` is the only chip implemented directly in JavaScript logic — every other chip is composed from previously built chips, mirroring the nand2tetris curriculum. Preserve this constraint when adding chips: implement them by composing existing gates, not with native operators.

Layers (each re-exported via its directory's `index.ts`, and all namespaced from `src/index.ts` as `gates`, `alu`, `memory`, `helpers`):

- `src/gates/` — `elementary.ts` (Nand, Not, And, Or, Xor, Mux, DMux, …), `16bit.ts` (16-bit-wide variants), `multiway.ts` (Mux8Way16, DMux8Way, …).
- `src/alu/` — `adder.ts` (half/full adders, Adder16), `alu.ts` (the Hack ALU: Preset/operator stages producing `IALUOutput` with `out`, `zr`, `ng`).
- `src/memory/` — `flipflop.ts` (SR latch, gated D flip-flop), `ram.ts` (registers and RAM), `pc.ts` (program counter).

Key conventions:

- **Types** live in `src/hackjs.d.ts`: `Bit = 0 | 1` and fixed-length readonly tuple types (`Bit2`…`Bit16`). Tuples are built by explicit construction (indexed element literals, rest-destructuring for address splits, `as const satisfies Bit16` for constant tables) — never by `as BitN` assertions on `slice`/`map` results, which the lint setup rejects as unsafe. Type-only imports must use `import type` — `@tsconfig/bun` enables `verbatimModuleSyntax`.
- **No `as` type assertions**: prefer `satisfies T` to check a literal against a type, and `as const` (or `as const satisfies T`) when literal/tuple inference should be kept. `as T` casts are banned — restructure the code so the type holds by construction instead.
- **Bit ordering**: bit arrays are LSB-first — `helpers.binaryToBit16("…")` reverses the string, so index 0 of the tuple is the least significant bit. The printed array order is the reverse of the binary-string notation.
- **State**: combinational chips are pure functions. Sequential chips (`BitRegister`, `Register`, RAM, PC) are factory functions returning a closure that holds its own state — call the factory to get a chip instance, then invoke the instance per clock cycle.
- **Tests** are co-located `.spec.ts` files next to the module they cover; new chips get exhaustive truth-table style tests in the same pattern. Use one top-level `describe` per chip (no file-wide wrapper `describe`) — `max-lines-per-function` applies to spec callbacks too, so keep each `describe`/`it` under 50 lines by splitting groups rather than overriding the rule. Each spec imports what it uses from `"bun:test"` (`import { describe, expect, it } from "bun:test";`).
