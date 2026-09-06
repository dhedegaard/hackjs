import { binaryToArray, binaryToBit16, binaryToBit8, bitToBit16, bitToSRFlipFlopOutput } from "./helpers.ts";
import assert from "node:assert/strict";
import { test } from "node:test";

const c = binaryToBit16;

await test("Helper functions > binaryToArray > fails with a TypeError", () => {
  assert.throws(() => binaryToArray("", 10), TypeError);
});

await test("Helper functions > binaryToArray > validates some examples", () => {
  assert.deepStrictEqual(binaryToArray("0011", 4), [1, 1, 0, 0]);
});

await test("Helper functions > binaryToBit8 > should convert a binary string to an Bit8 object", () => {
  assert.deepStrictEqual(binaryToBit8("10101010"), [0, 1, 0, 1, 0, 1, 0, 1]);
});

await test("Helper functions > binaryToBit16 > should convert a binary string to an Bit16 object", () => {
  assert.deepStrictEqual(binaryToBit16("1010101010101010"), [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
});

await test("Helper functions > bitToBit16 > should convert 0 to all zeroes", () => {
  assert.deepStrictEqual(bitToBit16(0), c("0000000000000000"));
});

await test("Helper functions > bitToBit16 > should convert 1 to 16 bit 1", () => {
  assert.deepStrictEqual(bitToBit16(1), c("1111111111111111"));
});

await test("Helper functions > bitToSRFlipFlopOutput > should convert the 2 cases correctly", () => {
  assert.deepStrictEqual(bitToSRFlipFlopOutput(0), { q: 0, nq: 1 });
  assert.deepStrictEqual(bitToSRFlipFlopOutput(1), { q: 1, nq: 0 });
});
