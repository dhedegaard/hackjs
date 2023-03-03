import { binaryToBit16, BIT16_FALSE, BIT16_TRUE } from "../helpers";
import { ProgramCounter } from "./pc";

describe("ProgramCounter", () => {
  it("should be able to load from the input", () => {
    const pc = ProgramCounter();

    // Load 1's, validate that they are kept.
    expect(pc(BIT16_TRUE, 0, 1, 0)).toEqual(BIT16_TRUE);
    expect(pc(BIT16_FALSE, 0, 0, 0)).toEqual(BIT16_TRUE);

    // Load 0's, validate that they are kept.
    expect(pc(BIT16_FALSE, 0, 1, 0)).toEqual(BIT16_FALSE);
    expect(pc(BIT16_TRUE, 0, 0, 0)).toEqual(BIT16_FALSE);
  });

  it("should be able to increment", () => {
    const pc = ProgramCounter();

    expect(pc(BIT16_FALSE, 1, 0, 0)).toEqual(binaryToBit16("0000000000000001"));
    expect(pc(BIT16_FALSE, 1, 0, 0)).toEqual(binaryToBit16("0000000000000010"));
    expect(pc(BIT16_FALSE, 1, 0, 0)).toEqual(binaryToBit16("0000000000000011"));
  });

  it("should be able to reset", () => {
    const pc = ProgramCounter();

    const someValue = binaryToBit16("1010101010101010");

    // Load some value into the counter.
    expect(pc(someValue, 0, 1, 0)).toEqual(someValue);

    // Now, reset it, expecting 0's.
    expect(pc(someValue, 0, 0, 1)).toEqual(BIT16_FALSE);
  });

  it("should be able to noop if none of the bits have been set", () => {
    const pc = ProgramCounter();

    expect(pc(BIT16_FALSE, 0, 0, 0)).toEqual(BIT16_FALSE);
    expect(pc(BIT16_FALSE, 0, 0, 0)).toEqual(BIT16_FALSE);
    expect(pc(BIT16_FALSE, 0, 0, 0)).toEqual(BIT16_FALSE);
    expect(pc(BIT16_FALSE, 0, 0, 0)).toEqual(BIT16_FALSE);
  });
});
