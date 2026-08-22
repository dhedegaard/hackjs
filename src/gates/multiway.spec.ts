import { describe, expect, it } from "bun:test";
import type { Bit8 } from "../hackjs";
import { ONED_16BIT, ZEROED_16BIT } from "./16bit";
import { DMux4Way, DMux8Way, Mux4Way16, Mux8Way16, Or8Way } from "./multiway";

const ZEROED_8BIT = [0, 0, 0, 0, 0, 0, 0, 0] as const satisfies Bit8;
const ONED_8BIT = [1, 1, 1, 1, 1, 1, 1, 1] as const satisfies Bit8;

describe("Or8Way gate", () => {
  it("should validate", () => {
    expect(Or8Way(ZEROED_8BIT)).toEqual(0);
    expect(Or8Way(ONED_8BIT)).toEqual(1);
    expect(Or8Way([0, 0, 0, 0, 0, 0, 0, 1])).toEqual(1);
  });
});

describe("Mux4Way16 gate", () => {
  // Short hands to make it more readable.
  const b0 = ZEROED_16BIT;
  const b1 = ONED_16BIT;

  it("should validate truth 16 bit based on selector", () => {
    expect(Mux4Way16(b1, b0, b0, b0, [0, 0])).toEqual(b1);
    expect(Mux4Way16(b0, b1, b0, b0, [1, 0])).toEqual(b1);
    expect(Mux4Way16(b0, b0, b1, b0, [0, 1])).toEqual(b1);
    expect(Mux4Way16(b0, b0, b0, b1, [1, 1])).toEqual(b1);
  });
  it("should validate false 16 bit based on selector", () => {
    expect(Mux4Way16(b0, b1, b1, b1, [0, 0])).toEqual(b0);
    expect(Mux4Way16(b1, b0, b1, b1, [1, 0])).toEqual(b0);
    expect(Mux4Way16(b1, b1, b0, b1, [0, 1])).toEqual(b0);
    expect(Mux4Way16(b1, b1, b1, b0, [1, 1])).toEqual(b0);
  });
});

describe("Mux8Way16 gate", () => {
  // Short hands to make it more readable.
  const b0 = ZEROED_16BIT;
  const b1 = ONED_16BIT;

  it("should validate truth 16 bit based on selector", () => {
    expect(Mux8Way16(b1, b0, b0, b0, b0, b0, b0, b0, [0, 0, 0])).toEqual(b1);
    expect(Mux8Way16(b0, b1, b0, b0, b0, b0, b0, b0, [1, 0, 0])).toEqual(b1);
    expect(Mux8Way16(b0, b0, b1, b0, b0, b0, b0, b0, [0, 1, 0])).toEqual(b1);
    expect(Mux8Way16(b0, b0, b0, b1, b0, b0, b0, b0, [1, 1, 0])).toEqual(b1);
    expect(Mux8Way16(b0, b0, b0, b0, b1, b0, b0, b0, [0, 0, 1])).toEqual(b1);
    expect(Mux8Way16(b0, b0, b0, b0, b0, b1, b0, b0, [1, 0, 1])).toEqual(b1);
    expect(Mux8Way16(b0, b0, b0, b0, b0, b0, b1, b0, [0, 1, 1])).toEqual(b1);
    expect(Mux8Way16(b0, b0, b0, b0, b0, b0, b0, b1, [1, 1, 1])).toEqual(b1);
  });
  it("should validate false 16 bit based on selector", () => {
    expect(Mux8Way16(b0, b1, b1, b1, b1, b1, b1, b1, [0, 0, 0])).toEqual(b0);
    expect(Mux8Way16(b1, b0, b1, b1, b1, b1, b1, b1, [1, 0, 0])).toEqual(b0);
    expect(Mux8Way16(b1, b1, b0, b1, b1, b1, b1, b1, [0, 1, 0])).toEqual(b0);
    expect(Mux8Way16(b1, b1, b1, b0, b1, b1, b1, b1, [1, 1, 0])).toEqual(b0);
    expect(Mux8Way16(b1, b1, b1, b1, b0, b1, b1, b1, [0, 0, 1])).toEqual(b0);
    expect(Mux8Way16(b1, b1, b1, b1, b1, b0, b1, b1, [1, 0, 1])).toEqual(b0);
    expect(Mux8Way16(b1, b1, b1, b1, b1, b1, b0, b1, [0, 1, 1])).toEqual(b0);
    expect(Mux8Way16(b1, b1, b1, b1, b1, b1, b1, b0, [1, 1, 1])).toEqual(b0);
  });
});

describe("DMux4Way", () => {
  it("should validate truth table", () => {
    expect(DMux4Way(1, [0, 0])).toEqual([1, 0, 0, 0]);
    expect(DMux4Way(1, [1, 0])).toEqual([0, 1, 0, 0]);
    expect(DMux4Way(1, [0, 1])).toEqual([0, 0, 1, 0]);
    expect(DMux4Way(1, [1, 1])).toEqual([0, 0, 0, 1]);
  });
});

describe("DMUX8Way", () => {
  it("should validate truth table", () => {
    expect(DMux8Way(1, [0, 0, 0])).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
    expect(DMux8Way(1, [1, 0, 0])).toEqual([0, 1, 0, 0, 0, 0, 0, 0]);
    expect(DMux8Way(1, [0, 1, 0])).toEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    expect(DMux8Way(1, [1, 1, 0])).toEqual([0, 0, 0, 1, 0, 0, 0, 0]);
    expect(DMux8Way(1, [0, 0, 1])).toEqual([0, 0, 0, 0, 1, 0, 0, 0]);
    expect(DMux8Way(1, [1, 0, 1])).toEqual([0, 0, 0, 0, 0, 1, 0, 0]);
    expect(DMux8Way(1, [0, 1, 1])).toEqual([0, 0, 0, 0, 0, 0, 1, 0]);
    expect(DMux8Way(1, [1, 1, 1])).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
  });
});