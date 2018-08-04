import { expect } from "chai";

import { And16, Mux16, Not16, ONED_16BIT, Or16, ZEROED_16BIT } from "./16bit";

describe("Not16 gate", () => {
  it("should reverse all bits", () => {
    expect(Not16(ZEROED_16BIT)).to.be.eql(ONED_16BIT);
    expect(Not16(ONED_16BIT)).to.be.eql(ZEROED_16BIT);
  });
});

describe("And16 gate", () => {
  it("should and each bit together for each position in the bus", () => {
    expect(And16(ZEROED_16BIT, ZEROED_16BIT)).to.be.eql(ZEROED_16BIT);
    expect(And16(ZEROED_16BIT, ONED_16BIT)).to.be.eql(ZEROED_16BIT);
    expect(And16(ONED_16BIT, ZEROED_16BIT)).to.be.eql(ZEROED_16BIT);
    expect(And16(ONED_16BIT, ONED_16BIT)).to.be.eql(ONED_16BIT);
  });
});

describe("Or16 gate", () => {
  it("should and each bit together for each position in the bus", () => {
    expect(Or16(ZEROED_16BIT, ZEROED_16BIT)).to.be.eql(ZEROED_16BIT);
    expect(Or16(ZEROED_16BIT, ONED_16BIT)).to.be.eql(ONED_16BIT);
    expect(Or16(ONED_16BIT, ZEROED_16BIT)).to.be.eql(ONED_16BIT);
    expect(Or16(ONED_16BIT, ONED_16BIT)).to.be.eql(ONED_16BIT);
  });
});

describe("Mux16 gate", () => {
  it("should select the input bus based on the selector", () => {
    expect(Mux16(ZEROED_16BIT, ZEROED_16BIT, 0)).to.be.eql(ZEROED_16BIT);
    expect(Mux16(ZEROED_16BIT, ONED_16BIT, 0)).to.be.eql(ZEROED_16BIT);
    expect(Mux16(ONED_16BIT, ZEROED_16BIT, 0)).to.be.eql(ONED_16BIT);
    expect(Mux16(ONED_16BIT, ONED_16BIT, 0)).to.be.eql(ONED_16BIT);
    expect(Mux16(ZEROED_16BIT, ZEROED_16BIT, 1)).to.be.eql(ZEROED_16BIT);
    expect(Mux16(ZEROED_16BIT, ONED_16BIT, 1)).to.be.eql(ONED_16BIT);
    expect(Mux16(ONED_16BIT, ZEROED_16BIT, 1)).to.be.eql(ZEROED_16BIT);
    expect(Mux16(ONED_16BIT, ONED_16BIT, 1)).to.be.eql(ONED_16BIT);
  });
});
