import {
  Adder16,
  Adder8,
  FullAdder,
  HalfAdder,
  type IAdderResult,
  Inc16,
} from "./adder.ts";
import { binaryToBit16, binaryToBit8 } from "../helpers.ts";
import assert from "node:assert/strict";
import { test } from "node:test";

const c8 = binaryToBit8;
const c = binaryToBit16;

await test("HalfAdder > validates the truth table", () => {
  assert.deepStrictEqual(HalfAdder(0, 0), { carry: 0, sum: 0 } satisfies IAdderResult);
  assert.deepStrictEqual(HalfAdder(0, 1), { carry: 0, sum: 1 } satisfies IAdderResult);
  assert.deepStrictEqual(HalfAdder(1, 0), { carry: 0, sum: 1 } satisfies IAdderResult);
  assert.deepStrictEqual(HalfAdder(1, 1), { carry: 1, sum: 0 } satisfies IAdderResult);
});

await test("FullAdder > validates the truth table", () => {
  assert.deepStrictEqual(FullAdder(0, 0, 0), { carry: 0, sum: 0 } satisfies IAdderResult);
  assert.deepStrictEqual(FullAdder(0, 0, 1), { carry: 0, sum: 1 } satisfies IAdderResult);
  assert.deepStrictEqual(FullAdder(0, 1, 0), { carry: 0, sum: 1 } satisfies IAdderResult);
  assert.deepStrictEqual(FullAdder(0, 1, 1), { carry: 1, sum: 0 } satisfies IAdderResult);
  assert.deepStrictEqual(FullAdder(1, 0, 0), { carry: 0, sum: 1 } satisfies IAdderResult);
  assert.deepStrictEqual(FullAdder(1, 0, 1), { carry: 1, sum: 0 } satisfies IAdderResult);
  assert.deepStrictEqual(FullAdder(1, 1, 0), { carry: 1, sum: 0 } satisfies IAdderResult);
  assert.deepStrictEqual(FullAdder(1, 1, 1), { carry: 1, sum: 1 } satisfies IAdderResult);
});

await test("Adder8 > calculates some examples", () => {
  // Add, no carry
  assert.deepStrictEqual(Adder8([1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0]), [1, 1, 0, 0, 0, 0, 0, 0]);
  assert.deepStrictEqual(Adder8(c8("00000001"), c8("00000010")), c8("00000011"));
  // Add, with a carry
  assert.deepStrictEqual(Adder8([0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0]), [0, 0, 1, 0, 0, 0, 0, 0]);
  // Some examples
  assert.deepStrictEqual(Adder8([1, 1, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0, 0, 0]), [1, 0, 1, 1, 1, 0, 0, 0]);
  assert.deepStrictEqual(Adder8([0, 1, 1, 0, 1, 0, 1, 0], [0, 0, 1, 0, 1, 1, 0, 0]), [0, 1, 0, 1, 0, 0, 0, 1]);
  // Ignored overflow below, 9'th bit is 1.
  assert.deepStrictEqual(Adder8([1, 1, 0, 1, 0, 0, 1, 1], [0, 1, 0, 1, 1, 0, 1, 0]), [1, 0, 1, 0, 0, 1, 0, 0]);
});

await test("Adder16 > calculates an example without a carry", () => {
  assert.deepStrictEqual(Adder16(c("1010101010101010"), c("0101010101010101")), c("1111111111111111"));
});

await test("Adder16 > calculates an example with a carry", () => {
  assert.deepStrictEqual(Adder16(c("0000000000000001"), c("0000000000000001")), c("0000000000000010"));
});

await test("Inc16 > increments some values by 1", () => {
  // Test some addition.
  assert.deepStrictEqual(Inc16(c("0000000000000000")), c("0000000000000001"));
  // Test overflow.
  assert.deepStrictEqual(Inc16(c("1111111111111111")), c("0000000000000000"));
  // Test carry bit addition.
  assert.deepStrictEqual(Inc16(c("0000000000000001")), c("0000000000000010"));
});
