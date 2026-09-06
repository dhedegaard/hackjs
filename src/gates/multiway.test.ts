import { DMux4Way, DMux8Way, Mux4Way16, Mux8Way16, Or8Way } from "./multiway.ts";
import { ONED_16BIT, ZEROED_16BIT } from "./16bit.ts";
import assert from "node:assert/strict";
import { test } from "node:test";
import type { Bit8 } from "../hackjs.ts";

const ZEROED_8BIT = [0, 0, 0, 0, 0, 0, 0, 0] as const satisfies Bit8;
const ONED_8BIT = [1, 1, 1, 1, 1, 1, 1, 1] as const satisfies Bit8;

// Short hands to make it more readable.
const b0 = ZEROED_16BIT;
const b1 = ONED_16BIT;

await test("Or8Way gate > should validate", () => {
  assert.deepStrictEqual(Or8Way(ZEROED_8BIT), 0);
  assert.deepStrictEqual(Or8Way(ONED_8BIT), 1);
  assert.deepStrictEqual(Or8Way([0, 0, 0, 0, 0, 0, 0, 1]), 1);
});

await test("Mux4Way16 gate > should validate truth 16 bit based on selector", () => {
  assert.deepStrictEqual(Mux4Way16(b1, b0, b0, b0, [0, 0]), b1);
  assert.deepStrictEqual(Mux4Way16(b0, b1, b0, b0, [1, 0]), b1);
  assert.deepStrictEqual(Mux4Way16(b0, b0, b1, b0, [0, 1]), b1);
  assert.deepStrictEqual(Mux4Way16(b0, b0, b0, b1, [1, 1]), b1);
});

await test("Mux4Way16 gate > should validate false 16 bit based on selector", () => {
  assert.deepStrictEqual(Mux4Way16(b0, b1, b1, b1, [0, 0]), b0);
  assert.deepStrictEqual(Mux4Way16(b1, b0, b1, b1, [1, 0]), b0);
  assert.deepStrictEqual(Mux4Way16(b1, b1, b0, b1, [0, 1]), b0);
  assert.deepStrictEqual(Mux4Way16(b1, b1, b1, b0, [1, 1]), b0);
});

await test("Mux8Way16 gate > should validate truth 16 bit based on selector", () => {
  assert.deepStrictEqual(Mux8Way16(b1, b0, b0, b0, b0, b0, b0, b0, [0, 0, 0]), b1);
  assert.deepStrictEqual(Mux8Way16(b0, b1, b0, b0, b0, b0, b0, b0, [1, 0, 0]), b1);
  assert.deepStrictEqual(Mux8Way16(b0, b0, b1, b0, b0, b0, b0, b0, [0, 1, 0]), b1);
  assert.deepStrictEqual(Mux8Way16(b0, b0, b0, b1, b0, b0, b0, b0, [1, 1, 0]), b1);
  assert.deepStrictEqual(Mux8Way16(b0, b0, b0, b0, b1, b0, b0, b0, [0, 0, 1]), b1);
  assert.deepStrictEqual(Mux8Way16(b0, b0, b0, b0, b0, b1, b0, b0, [1, 0, 1]), b1);
  assert.deepStrictEqual(Mux8Way16(b0, b0, b0, b0, b0, b0, b1, b0, [0, 1, 1]), b1);
  assert.deepStrictEqual(Mux8Way16(b0, b0, b0, b0, b0, b0, b0, b1, [1, 1, 1]), b1);
});

await test("Mux8Way16 gate > should validate false 16 bit based on selector", () => {
  assert.deepStrictEqual(Mux8Way16(b0, b1, b1, b1, b1, b1, b1, b1, [0, 0, 0]), b0);
  assert.deepStrictEqual(Mux8Way16(b1, b0, b1, b1, b1, b1, b1, b1, [1, 0, 0]), b0);
  assert.deepStrictEqual(Mux8Way16(b1, b1, b0, b1, b1, b1, b1, b1, [0, 1, 0]), b0);
  assert.deepStrictEqual(Mux8Way16(b1, b1, b1, b0, b1, b1, b1, b1, [1, 1, 0]), b0);
  assert.deepStrictEqual(Mux8Way16(b1, b1, b1, b1, b0, b1, b1, b1, [0, 0, 1]), b0);
  assert.deepStrictEqual(Mux8Way16(b1, b1, b1, b1, b1, b0, b1, b1, [1, 0, 1]), b0);
  assert.deepStrictEqual(Mux8Way16(b1, b1, b1, b1, b1, b1, b0, b1, [0, 1, 1]), b0);
  assert.deepStrictEqual(Mux8Way16(b1, b1, b1, b1, b1, b1, b1, b0, [1, 1, 1]), b0);
});

await test("DMux4Way > should validate truth table", () => {
  assert.deepStrictEqual(DMux4Way(1, [0, 0]), [1, 0, 0, 0]);
  assert.deepStrictEqual(DMux4Way(1, [1, 0]), [0, 1, 0, 0]);
  assert.deepStrictEqual(DMux4Way(1, [0, 1]), [0, 0, 1, 0]);
  assert.deepStrictEqual(DMux4Way(1, [1, 1]), [0, 0, 0, 1]);
});

await test("DMUX8Way > should validate truth table", () => {
  assert.deepStrictEqual(DMux8Way(1, [0, 0, 0]), [1, 0, 0, 0, 0, 0, 0, 0]);
  assert.deepStrictEqual(DMux8Way(1, [1, 0, 0]), [0, 1, 0, 0, 0, 0, 0, 0]);
  assert.deepStrictEqual(DMux8Way(1, [0, 1, 0]), [0, 0, 1, 0, 0, 0, 0, 0]);
  assert.deepStrictEqual(DMux8Way(1, [1, 1, 0]), [0, 0, 0, 1, 0, 0, 0, 0]);
  assert.deepStrictEqual(DMux8Way(1, [0, 0, 1]), [0, 0, 0, 0, 1, 0, 0, 0]);
  assert.deepStrictEqual(DMux8Way(1, [1, 0, 1]), [0, 0, 0, 0, 0, 1, 0, 0]);
  assert.deepStrictEqual(DMux8Way(1, [0, 1, 1]), [0, 0, 0, 0, 0, 0, 1, 0]);
  assert.deepStrictEqual(DMux8Way(1, [1, 1, 1]), [0, 0, 0, 0, 0, 0, 0, 1]);
});
