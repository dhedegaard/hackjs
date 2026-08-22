import { describe, expect, it } from "bun:test";
import { BIT16_FALSE, BIT16_TRUE, binaryToBit16 } from "../helpers";
import { BitRegister, Ram16K, Ram4K, Ram512, Ram64, Ram8, Register } from "./ram";

describe("BitRegister", () => {
  it("can load some data, keep it, and return it later", () => {
    const reg = BitRegister();

    // Store a bit, with a bit load bit..
    expect(reg(1, 1)).toEqual(1);

    // Fetch the stored bit, expect it to still be 1, while the load bit is low.
    expect(reg(0, 0)).toEqual(1);
    expect(reg(1, 0)).toEqual(1);

    // Load a new state, with a high load bit.
    expect(reg(0, 1)).toEqual(0);

    // Test that the new state is still kept, while the load bit is low.
    expect(reg(0, 0)).toEqual(0);
    expect(reg(1, 0)).toEqual(0);
  });
});

describe("Register", () => {
  it("can load some data, keep it, and return it later", () => {
    const reg = Register();

    // Store a bit, with a bit load bit..
    expect(reg(BIT16_TRUE, 1)).toEqual(BIT16_TRUE);

    // Fetch the stored bit, expect it to still be 1, while the load bit is low.
    expect(reg(BIT16_FALSE, 0)).toEqual(BIT16_TRUE);
    expect(reg(BIT16_TRUE, 0)).toEqual(BIT16_TRUE);

    // Load a new state, with a high load bit.
    expect(reg(BIT16_FALSE, 1)).toEqual(BIT16_FALSE);

    // Test that the new state is still kept, while the load bit is low.
    expect(reg(BIT16_TRUE, 0)).toEqual(BIT16_FALSE);
    expect(reg(BIT16_FALSE, 0)).toEqual(BIT16_FALSE);
  });
});

describe("RAM8", () => {
  it("should load and store the various addresses independently", () => {
    const _ = binaryToBit16;
    const uneven = _("1010101010101010");
    const mem = Ram8();

    // Check the initial state of the registers.
    expect(mem(BIT16_TRUE, [1, 0, 0], 0)).toEqual(BIT16_FALSE);

    // Load something on a few different addresses, validate that the same
    // values can be fetched again.
    expect(mem(BIT16_TRUE, [0, 1, 0], 1)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [1, 0, 0], 1)).toEqual(uneven);

    // Check the values.
    expect(mem(BIT16_FALSE, [0, 1, 0], 0)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [1, 0, 0], 0)).toEqual(uneven);
  });
});

describe("RAM64", () => {
  it("should load and store the various addresses independently", () => {
    const _ = binaryToBit16;
    const uneven = _("1010101010101010");
    const mem = Ram64();

    // Check the initial state of the registers.
    expect(mem(BIT16_TRUE, [0, 1, 0, 0, 0, 0], 0)).toEqual(BIT16_FALSE);

    // Load something on a few different addresses, validate that the same
    // values can be fetched again.
    expect(mem(BIT16_TRUE, [0, 0, 0, 1, 0, 0], 1)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [0, 1, 0, 0, 0, 0], 1)).toEqual(uneven);

    // Check the values.
    expect(mem(BIT16_FALSE, [0, 0, 0, 1, 0, 0], 0)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [0, 1, 0, 0, 0, 0], 0)).toEqual(uneven);
  });
});

describe("RAM512", () => {
  it("should load and store the various addresses independently", () => {
    const _ = binaryToBit16;
    const uneven = _("1010101010101010");
    const mem = Ram512();

    // Check the initial state of the registers.
    expect(mem(BIT16_TRUE, [0, 0, 0, 1, 0, 0, 0, 0, 0], 0)).toEqual(BIT16_FALSE);

    // Load something on a few different addresses, validate that the same
    // values can be fetched again.
    expect(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 1, 0, 0], 1)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0], 1)).toEqual(uneven);

    // Check the values.
    expect(mem(BIT16_FALSE, [0, 0, 0, 0, 0, 0, 1, 0, 0], 0)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0], 0)).toEqual(uneven);
  });
});

describe("RAM4K", () => {
  it("should load and store the various addresses independently", () => {
    const _ = binaryToBit16;
    const uneven = _("1010101010101010");
    const mem = Ram4K();

    // Check the initial state of the registers.
    expect(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 0)).toEqual(BIT16_FALSE);

    // Load something on a few different addresses, validate that the same
    // values can be fetched again.
    expect(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 1)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], 1)).toEqual(uneven);

    // Check the values.
    expect(mem(BIT16_FALSE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 0)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], 0)).toEqual(uneven);
  });
});

describe("RAM16K", () => {
  it("should load and store the various addresses independently", () => {
    const _ = binaryToBit16;
    const uneven = _("1010101010101010");
    const mem = Ram16K();

    // Check the initial state of the registers.
    expect(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 0)).toEqual(BIT16_FALSE);

    // Load something on a few different addresses, validate that the same
    // values can be fetched again.
    expect(mem(BIT16_TRUE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 1)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1)).toEqual(uneven);

    // Check the values.
    expect(mem(BIT16_FALSE, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 0)).toEqual(BIT16_TRUE);
    expect(mem(uneven, [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0)).toEqual(uneven);
  });
});