import { ALU, Operator, Preset } from "./alu.ts";
import { BIT16_FALSE, BIT16_TRUE, binaryToBit16 } from "../helpers.ts";
import { Not16, ONED_16BIT, ZEROED_16BIT } from "../gates/index.ts";
import assert from "node:assert/strict";
import { test } from "node:test";

const c = binaryToBit16;
const eight = c("0000000000001000");
const negativeEight = c("1111111111111000");

await test("Preset > outputs the input", () => {
  assert.deepStrictEqual(Preset(BIT16_TRUE, 0, 0), BIT16_TRUE);
});

await test("Preset > zeroes the input", () => {
  assert.deepStrictEqual(Preset(BIT16_TRUE, 1, 0), c("0000000000000000"));
});

await test("Preset > it negates the input", () => {
  assert.deepStrictEqual(Preset(c("1010101010101010"), 0, 1), c("0101010101010101"));
});

await test("Preset > zeroes and then negates the input", () => {
  assert.deepStrictEqual(Preset(BIT16_TRUE, 1, 1), c("1111111111111111"));
});

await test("Operator > adds the 16-bit inputs together", () => {
  assert.deepStrictEqual(Operator(c("0000000000000001"), c("0000000000000001"), 1), c("0000000000000010"));
});

await test("Operator > ands the 16-bit inputs together", () => {
  assert.deepStrictEqual(Operator(c("1010111110100000"), c("0101111101011111"), 0), c("0000111100000000"));
});

await test("ALU constant and pass-through outputs > zero output from flags", () => {
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 0, 1, 0, 1, 0).out, BIT16_FALSE);
  assert.deepStrictEqual(ALU(BIT16_FALSE, BIT16_FALSE, 1, 0, 1, 0, 1, 0).out, BIT16_FALSE);
});

await test("ALU constant and pass-through outputs > 16-bit one output", () => {
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 1, 1, 1).out, BIT16_TRUE);
  assert.deepStrictEqual(ALU(BIT16_FALSE, BIT16_FALSE, 1, 1, 1, 1, 1, 1).out, BIT16_TRUE);
});

await test("ALU constant and pass-through outputs > 16-bit negative one output", () => {
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 0, 1, 0).out, c("1111111111111111"));
  assert.deepStrictEqual(ALU(BIT16_FALSE, BIT16_FALSE, 1, 1, 1, 0, 1, 0).out, c("1111111111111111"));
});

await test("ALU constant and pass-through outputs > return x", () => {
  const x = c("1010101010101010");
  assert.deepStrictEqual(ALU(x, BIT16_TRUE, 0, 0, 1, 1, 0, 0).out, x);
  assert.deepStrictEqual(ALU(x, BIT16_FALSE, 0, 0, 1, 1, 0, 0).out, x);
});

await test("ALU constant and pass-through outputs > return y", () => {
  const y = c("1010101010101010");
  assert.deepStrictEqual(ALU(BIT16_TRUE, y, 1, 1, 0, 0, 0, 0).out, y);
  assert.deepStrictEqual(ALU(BIT16_FALSE, y, 1, 1, 0, 0, 0, 0).out, y);
});

await test("ALU constant and pass-through outputs > return negated x", () => {
  const x = c("1010101010101010");
  assert.deepStrictEqual(ALU(x, BIT16_TRUE, 0, 0, 1, 1, 0, 1).out, Not16(x));
  assert.deepStrictEqual(ALU(x, BIT16_FALSE, 0, 0, 1, 1, 0, 1).out, Not16(x));
});

await test("ALU constant and pass-through outputs > return negated y", () => {
  const y = c("1010101010101010");
  assert.deepStrictEqual(ALU(BIT16_TRUE, y, 1, 1, 0, 0, 0, 1).out, Not16(y));
  assert.deepStrictEqual(ALU(BIT16_FALSE, y, 1, 1, 0, 0, 0, 1).out, Not16(y));
});

await test("ALU arithmetic and logic outputs > returns negative x (-x)", () => {
  assert.deepStrictEqual(ALU(eight, ZEROED_16BIT, 0, 0, 1, 1, 1, 1).out, negativeEight);
  assert.deepStrictEqual(ALU(eight, ONED_16BIT, 0, 0, 1, 1, 1, 1).out, negativeEight);
});

await test("ALU arithmetic and logic outputs > returns negative y (-y)", () => {
  assert.deepStrictEqual(ALU(ZEROED_16BIT, eight, 1, 1, 0, 0, 1, 1).out, negativeEight);
  assert.deepStrictEqual(ALU(ONED_16BIT, eight, 1, 1, 0, 0, 1, 1).out, negativeEight);
});

await test("ALU arithmetic and logic outputs > returns x + 1", () => {
  assert.deepStrictEqual(ALU(c("0000000000000001"), ZEROED_16BIT, 0, 1, 1, 1, 1, 1).out, c("0000000000000010"));
  assert.deepStrictEqual(ALU(c("0000000000000001"), ONED_16BIT, 0, 1, 1, 1, 1, 1).out, c("0000000000000010"));
});

await test("ALU arithmetic and logic outputs > returns y + 1", () => {
  assert.deepStrictEqual(ALU(ZEROED_16BIT, c("0000000000000001"), 1, 1, 0, 1, 1, 1).out, c("0000000000000010"));
  assert.deepStrictEqual(ALU(ONED_16BIT, c("0000000000000001"), 1, 1, 0, 1, 1, 1).out, c("0000000000000010"));
});

await test("ALU arithmetic and logic outputs > returns x - 1", () => {
  assert.deepStrictEqual(ALU(c("0000000000000010"), ZEROED_16BIT, 0, 0, 1, 1, 1, 0).out, c("0000000000000001"));
  assert.deepStrictEqual(ALU(c("0000000000000010"), ONED_16BIT, 0, 0, 1, 1, 1, 0).out, c("0000000000000001"));
});

await test("ALU arithmetic and logic outputs > returns y - 1", () => {
  // 2 - 1 = 1
  assert.deepStrictEqual(ALU(ZEROED_16BIT, c("0000000000000010"), 1, 1, 0, 0, 1, 0).out, c("0000000000000001"));
  assert.deepStrictEqual(ALU(ONED_16BIT, c("0000000000000010"), 1, 1, 0, 0, 1, 0).out, c("0000000000000001"));
});

await test("ALU arithmetic and logic outputs > returns x + y", () => {
  // 1 + 1 = 2
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 0, 0, 0, 0, 1, 0).out, c("0000000000000010"));
});

await test("ALU arithmetic and logic outputs > returns x - y", () => {
  // 2 - 1 = 1
  assert.deepStrictEqual(ALU(c("0000000000000010"), c("0000000000000001"), 0, 1, 0, 0, 1, 1).out, c("0000000000000001"));
});

await test("ALU arithmetic and logic outputs > returns y - x", () => {
  // 2 - 1 = 1
  assert.deepStrictEqual(ALU(c("0000000000000001"), c("0000000000000010"), 0, 0, 0, 1, 1, 1).out, c("0000000000000001"));
});

await test("ALU arithmetic and logic outputs > returns x & b", () => {
  assert.deepStrictEqual(ALU(c("1010101010101010"), c("1100110011001100"), 0, 0, 0, 0, 0, 0).out, c("1000100010001000"));
});

await test("ALU arithmetic and logic outputs > returns x | b", () => {
  assert.deepStrictEqual(ALU(c("1010101010101010"), c("1100110011001100"), 0, 1, 0, 1, 0, 1).out, c("1110111011101110"));
});

await test("ALU output bits validate > 0 output, zr bit is 1, ng bit is 0", () => {
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 0, 1, 0, 1, 0).out, BIT16_FALSE);
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 0, 1, 0, 1, 0).zr, 1);
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 0, 1, 0, 1, 0).ng, 0);
});

await test("ALU output bits validate > 1 output, zr bit is 0, ng bit is 0", () => {
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 1, 1, 1).out, BIT16_TRUE);
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 1, 1, 1).zr, 0);
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 1, 1, 1).ng, 0);
});

await test("ALU output bits validate > -1 output, zr bit is 0, ng bit is 1", () => {
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 0, 1, 0).out, c("1111111111111111"));
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 0, 1, 0).zr, 0);
  assert.deepStrictEqual(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 0, 1, 0).ng, 1);
});
