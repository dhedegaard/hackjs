import { BIT16_FALSE, BIT16_TRUE, binaryToBit16 } from "../helpers.ts";
import { BitRegister, Ram16K, Ram4K, Ram512, Ram64, Ram8, Register } from "./ram.ts";
import assert from "node:assert/strict";
import { test } from "node:test";

await test("BitRegister > can load some data, keep it, and return it later", () => {
  const reg = BitRegister();

  // Store a bit, with a bit load bit..
  assert.deepStrictEqual(reg(1, 1), 1);

  // Fetch the stored bit, expect it to still be 1, while the load bit is low.
  assert.deepStrictEqual(reg(0, 0), 1);
  assert.deepStrictEqual(reg(1, 0), 1);

  // Load a new state, with a high load bit.
  assert.deepStrictEqual(reg(0, 1), 0);

  // Test that the new state is still kept, while the load bit is low.
  assert.deepStrictEqual(reg(0, 0), 0);
  assert.deepStrictEqual(reg(1, 0), 0);
});

await test("Register > can load some data, keep it, and return it later", () => {
  const reg = Register();

  // Store a bit, with a bit load bit..
  assert.deepStrictEqual(reg(BIT16_TRUE, 1), BIT16_TRUE);

  // Fetch the stored bit, expect it to still be 1, while the load bit is low.
  assert.deepStrictEqual(reg(BIT16_FALSE, 0), BIT16_TRUE);
  assert.deepStrictEqual(reg(BIT16_TRUE, 0), BIT16_TRUE);

  // Load a new state, with a high load bit.
  assert.deepStrictEqual(reg(BIT16_FALSE, 1), BIT16_FALSE);

  // Test that the new state is still kept, while the load bit is low.
  assert.deepStrictEqual(reg(BIT16_TRUE, 0), BIT16_FALSE);
  assert.deepStrictEqual(reg(BIT16_FALSE, 0), BIT16_FALSE);
});

await test("RAM8 > should load and store the various addresses independently", () => {
  const _ = binaryToBit16;
  const uneven = _("1010101010101010");
  const mem = Ram8();

  // Check the initial state of the registers.
  assert.deepStrictEqual(mem(BIT16_TRUE, [1, 0, 0], 0), BIT16_FALSE);

  // Load something on a few different addresses, validate that the same
  // values can be fetched again.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 1, 0], 1), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [1, 0, 0], 1), uneven);

  // Check the values.
  assert.deepStrictEqual(mem(BIT16_FALSE, [0, 1, 0], 0), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [1, 0, 0], 0), uneven);
});

await test("RAM64 > should load and store the various addresses independently", () => {
  const _ = binaryToBit16;
  const uneven = _("1010101010101010");
  const mem = Ram64();

  // Check the initial state of the registers.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 1, 0, 0, 0, 0], 0), BIT16_FALSE);

  // Load something on a few different addresses, validate that the same
  // values can be fetched again.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 0, 0, 1, 0, 0], 1), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [0, 1, 0, 0, 0, 0], 1), uneven);

  // Check the values.
  assert.deepStrictEqual(mem(BIT16_FALSE, [0, 0, 0, 1, 0, 0], 0), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [0, 1, 0, 0, 0, 0], 0), uneven);
});

await test("RAM512 > should load and store the various addresses independently", () => {
  const _ = binaryToBit16;
  const uneven = _("1010101010101010");
  const mem = Ram512();

  // Check the initial state of the registers.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 0, 0, 1, 0, 0, 0, 0, 0], 0), BIT16_FALSE);

  // Load something on a few different addresses, validate that the same
  // values can be fetched again.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 1, 0, 0], 1), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0], 1), uneven);

  // Check the values.
  assert.deepStrictEqual(mem(BIT16_FALSE, [0, 0, 0, 0, 0, 0, 1, 0, 0], 0), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0], 0), uneven);
});

await test("RAM4K > should load and store the various addresses independently", () => {
  const _ = binaryToBit16;
  const uneven = _("1010101010101010");
  const mem = Ram4K();

  // Check the initial state of the registers.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 0), BIT16_FALSE);

  // Load something on a few different addresses, validate that the same
  // values can be fetched again.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 1), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], 1), uneven);

  // Check the values.
  assert.deepStrictEqual(mem(BIT16_FALSE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 0), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], 0), uneven);
});

await test("RAM16K > should load and store the various addresses independently", () => {
  const _ = binaryToBit16;
  const uneven = _("1010101010101010");
  const mem = Ram16K();

  // Check the initial state of the registers.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 0), BIT16_FALSE);

  // Load something on a few different addresses, validate that the same
  // values can be fetched again.
  assert.deepStrictEqual(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 1), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1), uneven);

  // Check the values.
  assert.deepStrictEqual(mem(BIT16_FALSE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 0), BIT16_TRUE);
  assert.deepStrictEqual(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0), uneven);
});
