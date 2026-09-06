import { BIT16_FALSE, BIT16_TRUE, binaryToBit16 } from "../helpers.ts";
import assert from "node:assert/strict";
import { test } from "node:test";
import { ProgramCounter } from "./pc.ts";

await test("ProgramCounter > should be able to load from the input", () => {
  const pc = ProgramCounter();

  // Load 1's, validate that they are kept.
  assert.deepStrictEqual(pc(BIT16_TRUE, 0, 1, 0), BIT16_TRUE);
  assert.deepStrictEqual(pc(BIT16_FALSE, 0, 0, 0), BIT16_TRUE);

  // Load 0's, validate that they are kept.
  assert.deepStrictEqual(pc(BIT16_FALSE, 0, 1, 0), BIT16_FALSE);
  assert.deepStrictEqual(pc(BIT16_TRUE, 0, 0, 0), BIT16_FALSE);
});

await test("ProgramCounter > should be able to increment", () => {
  const pc = ProgramCounter();

  assert.deepStrictEqual(pc(BIT16_FALSE, 1, 0, 0), binaryToBit16("0000000000000001"));
  assert.deepStrictEqual(pc(BIT16_FALSE, 1, 0, 0), binaryToBit16("0000000000000010"));
  assert.deepStrictEqual(pc(BIT16_FALSE, 1, 0, 0), binaryToBit16("0000000000000011"));
});

await test("ProgramCounter > should be able to reset", () => {
  const pc = ProgramCounter();

  const someValue = binaryToBit16("1010101010101010");

  // Load some value into the counter.
  assert.deepStrictEqual(pc(someValue, 0, 1, 0), someValue);

  // Now, reset it, expecting 0's.
  assert.deepStrictEqual(pc(someValue, 0, 0, 1), BIT16_FALSE);
});

await test("ProgramCounter > should be able to noop if none of the bits have been set", () => {
  const pc = ProgramCounter();

  assert.deepStrictEqual(pc(BIT16_FALSE, 0, 0, 0), BIT16_FALSE);
  assert.deepStrictEqual(pc(BIT16_FALSE, 0, 0, 0), BIT16_FALSE);
  assert.deepStrictEqual(pc(BIT16_FALSE, 0, 0, 0), BIT16_FALSE);
  assert.deepStrictEqual(pc(BIT16_FALSE, 0, 0, 0), BIT16_FALSE);
});
