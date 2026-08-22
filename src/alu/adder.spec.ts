import { describe, expect, it } from "bun:test";
import { binaryToBit16, binaryToBit8 } from "../helpers";
import {
  Adder16,
  Adder8,
  FullAdder,
  HalfAdder,
  type IAdderResult,
  Inc16,
} from "./adder";

describe("HalfAdder", () => {
  it("validates the truth table", () => {
    expect(HalfAdder(0, 0)).toEqual({ carry: 0, sum: 0 } satisfies IAdderResult);
    expect(HalfAdder(0, 1)).toEqual({ carry: 0, sum: 1 } satisfies IAdderResult);
    expect(HalfAdder(1, 0)).toEqual({ carry: 0, sum: 1 } satisfies IAdderResult);
    expect(HalfAdder(1, 1)).toEqual({ carry: 1, sum: 0 } satisfies IAdderResult);
  });
});

describe("FullAdder", () => {
  it("validates the truth table", () => {
    expect(FullAdder(0, 0, 0)).toEqual({ carry: 0, sum: 0 } satisfies IAdderResult);
    expect(FullAdder(0, 0, 1)).toEqual({ carry: 0, sum: 1 } satisfies IAdderResult);
    expect(FullAdder(0, 1, 0)).toEqual({ carry: 0, sum: 1 } satisfies IAdderResult);
    expect(FullAdder(0, 1, 1)).toEqual({ carry: 1, sum: 0 } satisfies IAdderResult);
    expect(FullAdder(1, 0, 0)).toEqual({ carry: 0, sum: 1 } satisfies IAdderResult);
    expect(FullAdder(1, 0, 1)).toEqual({ carry: 1, sum: 0 } satisfies IAdderResult);
    expect(FullAdder(1, 1, 0)).toEqual({ carry: 1, sum: 0 } satisfies IAdderResult);
    expect(FullAdder(1, 1, 1)).toEqual({ carry: 1, sum: 1 } satisfies IAdderResult);
  });
});

describe("Adder8", () => {
  const c = binaryToBit8;
  it("calculates some examples", () => {
    // Add, no carry
    expect(
      Adder8([1, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0]),
    ).toEqual([1, 1, 0, 0, 0, 0, 0, 0]);
    expect(Adder8(c("00000001"), c("00000010"))).toEqual(c("00000011"));
    // Add, with a carry
    expect(
      Adder8([0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0]),
    ).toEqual([0, 0, 1, 0, 0, 0, 0, 0]);
    // Some examples
    expect(
      Adder8([1, 1, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 1, 0, 0, 0]),
    ).toEqual([1, 0, 1, 1, 1, 0, 0, 0]);
    expect(
      Adder8([0, 1, 1, 0, 1, 0, 1, 0], [0, 0, 1, 0, 1, 1, 0, 0]),
    ).toEqual([0, 1, 0, 1, 0, 0, 0, 1]);
    // Ignored overflow below, 9'th bit is 1.
    expect(
      Adder8([1, 1, 0, 1, 0, 0, 1, 1], [0, 1, 0, 1, 1, 0, 1, 0]),
    ).toEqual([1, 0, 1, 0, 0, 1, 0, 0]);
  });
});

describe("Adder16", () => {
  const c = binaryToBit16;
  it("calculates an example without a carry", () => {
    expect(Adder16(c("1010101010101010"), c("0101010101010101"))).toEqual(
      c("1111111111111111"),
    );
  });
  it("calculates an example with a carry", () => {
    expect(Adder16(c("0000000000000001"), c("0000000000000001"))).toEqual(
      c("0000000000000010"),
    );
  });
});

describe("Inc16", () => {
  const c = binaryToBit16;
  it("increments some values by 1", () => {
    // Test some addition.
    expect(Inc16(c("0000000000000000"))).toEqual(c("0000000000000001"));
    // Test overflow.
    expect(Inc16(c("1111111111111111"))).toEqual(c("0000000000000000"));
    // Test carry bit addition.
    expect(Inc16(c("0000000000000001"))).toEqual(c("0000000000000010"));
  });
});