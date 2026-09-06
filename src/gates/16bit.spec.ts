import { And16, Mux16, Not16, ONED_16BIT, Or16, ZEROED_16BIT } from "./16bit.ts";
import assert from "node:assert/strict";
import { test } from "node:test";

await test("16-bit gates > Not16 gate > should reverse all bits", () => {
  assert.deepStrictEqual(Not16(ZEROED_16BIT), ONED_16BIT);
  assert.deepStrictEqual(Not16(ONED_16BIT), ZEROED_16BIT);
});

await test("16-bit gates > And16 gate > should and each bit together for each position in the bus", () => {
  assert.deepStrictEqual(And16(ZEROED_16BIT, ZEROED_16BIT), ZEROED_16BIT);
  assert.deepStrictEqual(And16(ZEROED_16BIT, ONED_16BIT), ZEROED_16BIT);
  assert.deepStrictEqual(And16(ONED_16BIT, ZEROED_16BIT), ZEROED_16BIT);
  assert.deepStrictEqual(And16(ONED_16BIT, ONED_16BIT), ONED_16BIT);
});

await test("16-bit gates > Or16 gate > should and each bit together for each position in the bus", () => {
  assert.deepStrictEqual(Or16(ZEROED_16BIT, ZEROED_16BIT), ZEROED_16BIT);
  assert.deepStrictEqual(Or16(ZEROED_16BIT, ONED_16BIT), ONED_16BIT);
  assert.deepStrictEqual(Or16(ONED_16BIT, ZEROED_16BIT), ONED_16BIT);
  assert.deepStrictEqual(Or16(ONED_16BIT, ONED_16BIT), ONED_16BIT);
});

await test("16-bit gates > Mux16 gate > should select the input bus based on the selector", () => {
  assert.deepStrictEqual(Mux16(ZEROED_16BIT, ZEROED_16BIT, 0), ZEROED_16BIT);
  assert.deepStrictEqual(Mux16(ZEROED_16BIT, ONED_16BIT, 0), ZEROED_16BIT);
  assert.deepStrictEqual(Mux16(ONED_16BIT, ZEROED_16BIT, 0), ONED_16BIT);
  assert.deepStrictEqual(Mux16(ONED_16BIT, ONED_16BIT, 0), ONED_16BIT);
  assert.deepStrictEqual(Mux16(ZEROED_16BIT, ZEROED_16BIT, 1), ZEROED_16BIT);
  assert.deepStrictEqual(Mux16(ZEROED_16BIT, ONED_16BIT, 1), ONED_16BIT);
  assert.deepStrictEqual(Mux16(ONED_16BIT, ZEROED_16BIT, 1), ZEROED_16BIT);
  assert.deepStrictEqual(Mux16(ONED_16BIT, ONED_16BIT, 1), ONED_16BIT);
});
