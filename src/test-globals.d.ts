/**
 * Bun injects the jest-style globals into *.spec.ts files at runtime, but
 * `@types/bun` only types the "bun:test" module. Declare the globals used by
 * the specs so `tsc --noEmit` type checks without per-file imports.
 */
declare global {
  const describe: typeof import("bun:test").describe;
  const it: typeof import("bun:test").it;
  const test: typeof import("bun:test").test;
  const expect: typeof import("bun:test").expect;
  const beforeEach: typeof import("bun:test").beforeEach;
  const afterEach: typeof import("bun:test").afterEach;
}

export {};
