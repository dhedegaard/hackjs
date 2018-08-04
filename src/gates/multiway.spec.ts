import { expect } from "chai";

import { Bit8 } from "../hackjs";
import { ONED_16BIT, ZEROED_16BIT } from "./16bit";
import { Mux4Way16, Mux8Way16, Or8Way, DMux4Way } from "./multiway";

const ZEROED_8BIT = [0, 0, 0, 0, 0, 0, 0, 0] as Bit8;
const ONED_8BIT = [1, 1, 1, 1, 1, 1, 1, 1] as Bit8;

describe("Or8Way gate", () => {
  it("should validate", () => {
    expect(Or8Way(ZEROED_8BIT)).to.be.eq(0);
    expect(Or8Way(ONED_8BIT)).to.be.eq(1);
    expect(Or8Way([0, 0, 0, 0, 0, 0, 0, 1])).to.be.eq(1);
  });
});

describe("Mux4Way16 gate", () => {
  // Short hands to make it more readable.
  const _0 = ZEROED_16BIT;
  const _1 = ONED_16BIT;

  it("should validate truth 16 bit based on selector", () => {
    expect(Mux4Way16(_1, _0, _0, _0, [0, 0])).to.eql(_1);
    expect(Mux4Way16(_0, _1, _0, _0, [1, 0])).to.eql(_1);
    expect(Mux4Way16(_0, _0, _1, _0, [0, 1])).to.eql(_1);
    expect(Mux4Way16(_0, _0, _0, _1, [1, 1])).to.eql(_1);
  });
  it("should validate false 16 bit based on selector", () => {
    expect(Mux4Way16(_0, _1, _1, _1, [0, 0])).to.eql(_0);
    expect(Mux4Way16(_1, _0, _1, _1, [1, 0])).to.eql(_0);
    expect(Mux4Way16(_1, _1, _0, _1, [0, 1])).to.eql(_0);
    expect(Mux4Way16(_1, _1, _1, _0, [1, 1])).to.eql(_0);
  });
});

describe("Mux8Way16 gate", () => {
  // Short hands to make it more readable.
  const _0 = ZEROED_16BIT;
  const _1 = ONED_16BIT;

  it("should validate truth 16 bit based on selector", () => {
    expect(Mux8Way16(_1, _0, _0, _0, _0, _0, _0, _0, [0, 0, 0])).to.eql(_1);
    expect(Mux8Way16(_0, _1, _0, _0, _0, _0, _0, _0, [1, 0, 0])).to.eql(_1);
    expect(Mux8Way16(_0, _0, _1, _0, _0, _0, _0, _0, [0, 1, 0])).to.eql(_1);
    expect(Mux8Way16(_0, _0, _0, _1, _0, _0, _0, _0, [1, 1, 0])).to.eql(_1);
    expect(Mux8Way16(_0, _0, _0, _0, _1, _0, _0, _0, [0, 0, 1])).to.eql(_1);
    expect(Mux8Way16(_0, _0, _0, _0, _0, _1, _0, _0, [1, 0, 1])).to.eql(_1);
    expect(Mux8Way16(_0, _0, _0, _0, _0, _0, _1, _0, [0, 1, 1])).to.eql(_1);
    expect(Mux8Way16(_0, _0, _0, _0, _0, _0, _0, _1, [1, 1, 1])).to.eql(_1);
  });
  it("should validate false 16 bit based on selector", () => {
    expect(Mux8Way16(_0, _1, _1, _1, _1, _1, _1, _1, [0, 0, 0])).to.eql(_0);
    expect(Mux8Way16(_1, _0, _1, _1, _1, _1, _1, _1, [1, 0, 0])).to.eql(_0);
    expect(Mux8Way16(_1, _1, _0, _1, _1, _1, _1, _1, [0, 1, 0])).to.eql(_0);
    expect(Mux8Way16(_1, _1, _1, _0, _1, _1, _1, _1, [1, 1, 0])).to.eql(_0);
    expect(Mux8Way16(_1, _1, _1, _1, _0, _1, _1, _1, [0, 0, 1])).to.eql(_0);
    expect(Mux8Way16(_1, _1, _1, _1, _1, _0, _1, _1, [1, 0, 1])).to.eql(_0);
    expect(Mux8Way16(_1, _1, _1, _1, _1, _1, _0, _1, [0, 1, 1])).to.eql(_0);
    expect(Mux8Way16(_1, _1, _1, _1, _1, _1, _1, _0, [1, 1, 1])).to.eql(_0);
  });
});

describe("DMux4Way", () => {
  it("should validate truth table", () => {
    expect(DMux4Way(1, [0, 0])).to.eql([1, 0, 0, 0]);
    expect(DMux4Way(1, [1, 0])).to.eql([0, 1, 0, 0]);
    expect(DMux4Way(1, [0, 1])).to.eql([0, 0, 1, 0]);
    expect(DMux4Way(1, [1, 1])).to.eql([0, 0, 0, 1]);
  });
});
