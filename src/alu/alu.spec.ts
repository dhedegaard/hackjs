import { describe, expect, it } from "bun:test";
import { Not16, ONED_16BIT, ZEROED_16BIT } from "../gates";
import { BIT16_FALSE, BIT16_TRUE, binaryToBit16 } from "../helpers";
import { ALU, Operator, Preset } from "./alu";

describe("ALU gate", () => {

  describe("Preset", () => {
    const c = binaryToBit16;

    it("outputs the input", () => {
      expect(Preset(BIT16_TRUE, 0, 0)).toEqual(BIT16_TRUE);
    });
    it("zeroes the input", () => {
      expect(Preset(BIT16_TRUE, 1, 0)).toEqual(c("0000000000000000"));
    });
    it("it negates the input", () => {
      expect(Preset(c("1010101010101010"), 0, 1)).toEqual(c("0101010101010101"));
    });
    it("zeroes and then negates the input", () => {
      expect(Preset(BIT16_TRUE, 1, 1)).toEqual(c("1111111111111111"));
    });
  });

  describe("Operator", () => {
    const c = binaryToBit16;

    it("adds the 16-bit inputs together", () => {
      expect(Operator(c("0000000000000001"), c("0000000000000001"), 1)).toEqual(c("0000000000000010"));
    });
    it("ands the 16-bit inputs together", () => {
      expect(Operator(c("1010111110100000"), c("0101111101011111"), 0)).toEqual(c("0000111100000000"));
    });
  });

  describe("ALU (output only)", () => {
    const c = binaryToBit16;

    it("zero output from flags", () => {
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 0, 1, 0, 1, 0).out).toEqual(BIT16_FALSE);
      expect(ALU(BIT16_FALSE, BIT16_FALSE, 1, 0, 1, 0, 1, 0).out).toEqual(BIT16_FALSE);
    });
    it("16-bit one output", () => {
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 1, 1, 1).out).toEqual(BIT16_TRUE);
      expect(ALU(BIT16_FALSE, BIT16_FALSE, 1, 1, 1, 1, 1, 1).out).toEqual(BIT16_TRUE);
    });
    it("16-bit negative one output", () => {
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 0, 1, 0).out).toEqual(c("1111111111111111"));
      expect(ALU(BIT16_FALSE, BIT16_FALSE, 1, 1, 1, 0, 1, 0).out).toEqual(c("1111111111111111"));
    });
    it("return x", () => {
      const x = c("1010101010101010");
      expect(ALU(x, BIT16_TRUE, 0, 0, 1, 1, 0, 0).out).toEqual(x);
      expect(ALU(x, BIT16_FALSE, 0, 0, 1, 1, 0, 0).out).toEqual(x);
    });
    it("return y", () => {
      const y = c("1010101010101010");
      expect(ALU(BIT16_TRUE, y, 1, 1, 0, 0, 0, 0).out).toEqual(y);
      expect(ALU(BIT16_FALSE, y, 1, 1, 0, 0, 0, 0).out).toEqual(y);
    });
    it("return negated x", () => {
      const x = c("1010101010101010");
      expect(ALU(x, BIT16_TRUE, 0, 0, 1, 1, 0, 1).out).toEqual(Not16(x));
      expect(ALU(x, BIT16_FALSE, 0, 0, 1, 1, 0, 1).out).toEqual(Not16(x));
    });
    it("return negated y", () => {
      const y = c("1010101010101010");
      expect(ALU(BIT16_TRUE, y, 1, 1, 0, 0, 0, 1).out).toEqual(Not16(y));
      expect(ALU(BIT16_FALSE, y, 1, 1, 0, 0, 0, 1).out).toEqual(Not16(y));
    });
    it("returns negative x (-x)", () => {
      const eight = c("0000000000001000");
      const negativeEight = c("1111111111111000");
      expect(ALU(eight, ZEROED_16BIT, 0, 0, 1, 1, 1, 1).out).toEqual(negativeEight);
      expect(ALU(eight, ONED_16BIT, 0, 0, 1, 1, 1, 1).out).toEqual(negativeEight);
    });
    it("returns negative y (-y)", () => {
      const eight = c("0000000000001000");
      const negativeEight = c("1111111111111000");
      expect(ALU(ZEROED_16BIT, eight, 1, 1, 0, 0, 1, 1).out).toEqual(negativeEight);
      expect(ALU(ONED_16BIT, eight, 1, 1, 0, 0, 1, 1).out).toEqual(negativeEight);
    });
    it("returns x + 1", () => {
      expect(ALU(c("0000000000000001"), ZEROED_16BIT, 0, 1, 1, 1, 1, 1).out).toEqual(c("0000000000000010"));
      expect(ALU(c("0000000000000001"), ONED_16BIT, 0, 1, 1, 1, 1, 1).out).toEqual(c("0000000000000010"));
    });
    it("returns y + 1", () => {
      expect(ALU(ZEROED_16BIT, c("0000000000000001"), 1, 1, 0, 1, 1, 1).out).toEqual(c("0000000000000010"));
      expect(ALU(ONED_16BIT, c("0000000000000001"), 1, 1, 0, 1, 1, 1).out).toEqual(c("0000000000000010"));
    });
    it("returns x - 1", () => {
      expect(ALU(c("0000000000000010"), ZEROED_16BIT, 0, 0, 1, 1, 1, 0).out).toEqual(c("0000000000000001"));
      expect(ALU(c("0000000000000010"), ONED_16BIT, 0, 0, 1, 1, 1, 0).out).toEqual(c("0000000000000001"));
    });
    it("returns y - 1", () => {
      // 2 - 1 = 1
      expect(ALU(ZEROED_16BIT, c("0000000000000010"), 1, 1, 0, 0, 1, 0).out).toEqual(c("0000000000000001"));
      expect(ALU(ONED_16BIT, c("0000000000000010"), 1, 1, 0, 0, 1, 0).out).toEqual(c("0000000000000001"));
    });
    it("returns x + y", () => {
      // 1 + 1 = 2
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 0, 0, 0, 0, 1, 0).out).toEqual(c("0000000000000010"));
    });
    it("returns x - y", () => {
      // 2 - 1 = 1
      expect(ALU(c("0000000000000010"), c("0000000000000001"), 0, 1, 0, 0, 1, 1).out).toEqual(c("0000000000000001"));
    });
    it("returns y - x", () => {
      // 2 - 1 = 1
      expect(ALU(c("0000000000000001"), c("0000000000000010"), 0, 0, 0, 1, 1, 1).out).toEqual(c("0000000000000001"));
    });
    it("returns x & b", () => {
      expect(ALU(c("1010101010101010"), c("1100110011001100"), 0, 0, 0, 0, 0, 0).out).toEqual(c("1000100010001000"));
    });
    it("returns x | b", () => {
      expect(ALU(c("1010101010101010"), c("1100110011001100"), 0, 1, 0, 1, 0, 1).out).toEqual(c("1110111011101110"));
    });
  });

  describe("ALU output bits validate", () => {
    const c = binaryToBit16;

    it("0 output, zr bit is 1, ng bit is 0", () => {
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 0, 1, 0, 1, 0).out).toEqual(BIT16_FALSE);
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 0, 1, 0, 1, 0).zr).toEqual(1);
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 0, 1, 0, 1, 0).ng).toEqual(0);
    });
    it("1 output, zr bit is 0, ng bit is 0", () => {
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 1, 1, 1).out).toEqual(BIT16_TRUE);
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 1, 1, 1).zr).toEqual(0);
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 1, 1, 1).ng).toEqual(0);
    });
    it("-1 output, zr bit is 0, ng bit is 1", () => {
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 0, 1, 0).out).toEqual(c("1111111111111111"));
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 0, 1, 0).zr).toEqual(0);
      expect(ALU(BIT16_TRUE, BIT16_TRUE, 1, 1, 1, 0, 1, 0).ng).toEqual(1);
    });
  });

});