import * as gates from "./index.ts";
import assert from "node:assert/strict";
import { test } from "node:test";

await test("Nand gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.Nand(0, 0), 1);
  assert.deepStrictEqual(gates.Nand(1, 0), 1);
  assert.deepStrictEqual(gates.Nand(0, 1), 1);
  assert.deepStrictEqual(gates.Nand(1, 1), 0);
});

await test("Not gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.Not(0), 1);
  assert.deepStrictEqual(gates.Not(1), 0);
});

await test("And gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.And(0, 0), 0);
  assert.deepStrictEqual(gates.And(1, 0), 0);
  assert.deepStrictEqual(gates.And(0, 1), 0);
  assert.deepStrictEqual(gates.And(1, 1), 1);
});

await test("Or gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.Or(0, 0), 0);
  assert.deepStrictEqual(gates.Or(1, 0), 1);
  assert.deepStrictEqual(gates.Or(0, 1), 1);
  assert.deepStrictEqual(gates.Or(1, 1), 1);
});

await test("Nor gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.Nor(0, 0), 1);
  assert.deepStrictEqual(gates.Nor(1, 0), 0);
  assert.deepStrictEqual(gates.Nor(0, 1), 0);
  assert.deepStrictEqual(gates.Nor(1, 1), 0);
});

await test("Xor gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.Xor(0, 0), 0);
  assert.deepStrictEqual(gates.Xor(1, 0), 1);
  assert.deepStrictEqual(gates.Xor(0, 1), 1);
  assert.deepStrictEqual(gates.Xor(1, 1), 0);
});

await test("Xnor gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.Xnor(0, 0), 1);
  assert.deepStrictEqual(gates.Xnor(1, 0), 0);
  assert.deepStrictEqual(gates.Xnor(0, 1), 0);
  assert.deepStrictEqual(gates.Xnor(1, 1), 1);
});

await test("Mux gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.Mux(0, 0, 0), 0);
  assert.deepStrictEqual(gates.Mux(0, 1, 0), 0);
  assert.deepStrictEqual(gates.Mux(1, 0, 0), 1);
  assert.deepStrictEqual(gates.Mux(1, 1, 0), 1);
  assert.deepStrictEqual(gates.Mux(0, 0, 1), 0);
  assert.deepStrictEqual(gates.Mux(0, 1, 1), 1);
  assert.deepStrictEqual(gates.Mux(1, 0, 1), 0);
  assert.deepStrictEqual(gates.Mux(1, 1, 1), 1);
});

await test("Mux4 gate > should validate truth bit based on selector", () => {
  assert.deepStrictEqual(gates.Mux4(1, 0, 0, 0, [0, 0]), 1);
  assert.deepStrictEqual(gates.Mux4(0, 1, 0, 0, [1, 0]), 1);
  assert.deepStrictEqual(gates.Mux4(0, 0, 1, 0, [0, 1]), 1);
  assert.deepStrictEqual(gates.Mux4(0, 0, 0, 1, [1, 1]), 1);
});

await test("Mux4 gate > should validate false bit based on selector", () => {
  assert.deepStrictEqual(gates.Mux4(0, 1, 1, 1, [0, 0]), 0);
  assert.deepStrictEqual(gates.Mux4(1, 0, 1, 1, [1, 0]), 0);
  assert.deepStrictEqual(gates.Mux4(1, 1, 0, 1, [0, 1]), 0);
  assert.deepStrictEqual(gates.Mux4(1, 1, 1, 0, [1, 1]), 0);
});

await test("Mux8 gate > should validate truth bit based on selector", () => {
  assert.deepStrictEqual(gates.Mux8(1, 0, 0, 0, 0, 0, 0, 0, [0, 0, 0]), 1);
  assert.deepStrictEqual(gates.Mux8(0, 1, 0, 0, 0, 0, 0, 0, [1, 0, 0]), 1);
  assert.deepStrictEqual(gates.Mux8(0, 0, 1, 0, 0, 0, 0, 0, [0, 1, 0]), 1);
  assert.deepStrictEqual(gates.Mux8(0, 0, 0, 1, 0, 0, 0, 0, [1, 1, 0]), 1);
  assert.deepStrictEqual(gates.Mux8(0, 0, 0, 0, 1, 0, 0, 0, [0, 0, 1]), 1);
  assert.deepStrictEqual(gates.Mux8(0, 0, 0, 0, 0, 1, 0, 0, [1, 0, 1]), 1);
  assert.deepStrictEqual(gates.Mux8(0, 0, 0, 0, 0, 0, 1, 0, [0, 1, 1]), 1);
  assert.deepStrictEqual(gates.Mux8(0, 0, 0, 0, 0, 0, 0, 1, [1, 1, 1]), 1);
});

await test("Mux8 gate > should validate false bit based on selector", () => {
  assert.deepStrictEqual(gates.Mux8(0, 1, 1, 1, 1, 1, 1, 1, [0, 0, 0]), 0);
  assert.deepStrictEqual(gates.Mux8(1, 0, 1, 1, 1, 1, 1, 1, [1, 0, 0]), 0);
  assert.deepStrictEqual(gates.Mux8(1, 1, 0, 1, 1, 1, 1, 1, [0, 1, 0]), 0);
  assert.deepStrictEqual(gates.Mux8(1, 1, 1, 0, 1, 1, 1, 1, [1, 1, 0]), 0);
  assert.deepStrictEqual(gates.Mux8(1, 1, 1, 1, 0, 1, 1, 1, [0, 0, 1]), 0);
  assert.deepStrictEqual(gates.Mux8(1, 1, 1, 1, 1, 0, 1, 1, [1, 0, 1]), 0);
  assert.deepStrictEqual(gates.Mux8(1, 1, 1, 1, 1, 1, 0, 1, [0, 1, 1]), 0);
  assert.deepStrictEqual(gates.Mux8(1, 1, 1, 1, 1, 1, 1, 0, [1, 1, 1]), 0);
});

await test("DMux gate > should validate truth table", () => {
  assert.deepStrictEqual(gates.DMux(0, 0), [0, 0]);
  assert.deepStrictEqual(gates.DMux(0, 1), [0, 0]);
  assert.deepStrictEqual(gates.DMux(1, 0), [1, 0]);
  assert.deepStrictEqual(gates.DMux(1, 1), [0, 1]);
});
