# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A TypeScript implementation of the Hack computer from [nand2tetris](https://www.nand2tetris.org/). There is no runnable application yet — the library is exercised entirely through unit tests.

## Commands

- `npm test` — runs Jest in **watch mode** (interactive). For a single run use `npx jest --ci`.
- `npx jest src/gates/elementary.spec.ts` — run a single test file.
- `npm run build` — compile with `tsc` to `dist/`.
- `npm run watch` — `tsc --watch`.
- `npm run lint` — ESLint over `src/`.

CI (`.github/workflows/nodejs.yml`) runs `npm run build` then `npx jest --ci` on Node 18.

## Architecture

Everything is built bottom-up from a single primitive: the `Nand` gate in `src/gates/elementary.ts` is the only chip implemented directly in JavaScript logic — every other chip is composed from previously built chips, mirroring the nand2tetris curriculum. Preserve this constraint when adding chips: implement them by composing existing gates, not with native operators.

Layers (each re-exported via its directory's `index.ts`, and all namespaced from `src/index.ts` as `gates`, `alu`, `memory`, `helpers`):

- `src/gates/` — `elementary.ts` (Nand, Not, And, Or, Xor, Mux, DMux, …), `16bit.ts` (16-bit-wide variants), `multiway.ts` (Mux8Way16, DMux8Way, …).
- `src/alu/` — `adder.ts` (half/full adders, Adder16), `alu.ts` (the Hack ALU: Preset/operator stages producing `IALUOutput` with `out`, `zr`, `ng`).
- `src/memory/` — `flipflop.ts` (SR latch, gated D flip-flop), `ram.ts` (registers and RAM), `pc.ts` (program counter).

Key conventions:

- **Types** live in `src/hackjs.d.ts`: `Bit = 0 | 1` and fixed-length tuple types (`Bit2`…`Bit16`).
- **Bit ordering**: bit arrays are LSB-first — `helpers.binaryToBit16("…")` reverses the string, so index 0 of the tuple is the least significant bit. The printed array order is the reverse of the binary-string notation.
- **State**: combinational chips are pure functions. Sequential chips (`BitRegister`, `Register`, RAM, PC) are factory functions returning a closure that holds its own state — call the factory to get a chip instance, then invoke the instance per clock cycle.
- **Tests** are co-located `.spec.ts` files next to the module they cover; new chips get exhaustive truth-table style tests in the same pattern.
