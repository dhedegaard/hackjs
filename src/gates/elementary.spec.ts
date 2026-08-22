import { describe, expect, it } from "bun:test";
import * as gates from ".";

describe("Elementary gates", () => {

  describe("Nand gate", () => {
    it("should validate truth table", () => {
      expect(gates.Nand(0, 0)).toEqual(1);
      expect(gates.Nand(1, 0)).toEqual(1);
      expect(gates.Nand(0, 1)).toEqual(1);
      expect(gates.Nand(1, 1)).toEqual(0);
    });
  });

  describe("Not gate", () => {
    it("should validate truth table", () => {
      expect(gates.Not(0)).toEqual(1);
      expect(gates.Not(1)).toEqual(0);
    });
  });

  describe("And gate", () => {
    it("should validate truth table", () => {
      expect(gates.And(0, 0)).toEqual(0);
      expect(gates.And(1, 0)).toEqual(0);
      expect(gates.And(0, 1)).toEqual(0);
      expect(gates.And(1, 1)).toEqual(1);
    });
  });

  describe("Or gate", () => {
    it("should validate truth table", () => {
      expect(gates.Or(0, 0)).toEqual(0);
      expect(gates.Or(1, 0)).toEqual(1);
      expect(gates.Or(0, 1)).toEqual(1);
      expect(gates.Or(1, 1)).toEqual(1);
    });
  });

  describe("Nor gate", () => {
    it("should validate truth table", () => {
      expect(gates.Nor(0, 0)).toEqual(1);
      expect(gates.Nor(1, 0)).toEqual(0);
      expect(gates.Nor(0, 1)).toEqual(0);
      expect(gates.Nor(1, 1)).toEqual(0);
    });
  });

  describe("Xor gate", () => {
    it("should validate truth table", () => {
      expect(gates.Xor(0, 0)).toEqual(0);
      expect(gates.Xor(1, 0)).toEqual(1);
      expect(gates.Xor(0, 1)).toEqual(1);
      expect(gates.Xor(1, 1)).toEqual(0);
    });
  });

  describe("Xnor gate", () => {
    it("should validate truth table", () => {
      expect(gates.Xnor(0, 0)).toEqual(1);
      expect(gates.Xnor(1, 0)).toEqual(0);
      expect(gates.Xnor(0, 1)).toEqual(0);
      expect(gates.Xnor(1, 1)).toEqual(1);
    });
  });

  describe("Mux gate", () => {
    it("should validate truth table", () => {
      expect(gates.Mux(0, 0, 0)).toEqual(0);
      expect(gates.Mux(0, 1, 0)).toEqual(0);
      expect(gates.Mux(1, 0, 0)).toEqual(1);
      expect(gates.Mux(1, 1, 0)).toEqual(1);
      expect(gates.Mux(0, 0, 1)).toEqual(0);
      expect(gates.Mux(0, 1, 1)).toEqual(1);
      expect(gates.Mux(1, 0, 1)).toEqual(0);
      expect(gates.Mux(1, 1, 1)).toEqual(1);
    });
  });

  describe("Mux4 gate", () => {
    it("should validate truth bit based on selector", () => {
      expect(gates.Mux4(1, 0, 0, 0, [0, 0])).toEqual(1);
      expect(gates.Mux4(0, 1, 0, 0, [1, 0])).toEqual(1);
      expect(gates.Mux4(0, 0, 1, 0, [0, 1])).toEqual(1);
      expect(gates.Mux4(0, 0, 0, 1, [1, 1])).toEqual(1);
    });
    it("should validate false bit based on selector", () => {
      expect(gates.Mux4(0, 1, 1, 1, [0, 0])).toEqual(0);
      expect(gates.Mux4(1, 0, 1, 1, [1, 0])).toEqual(0);
      expect(gates.Mux4(1, 1, 0, 1, [0, 1])).toEqual(0);
      expect(gates.Mux4(1, 1, 1, 0, [1, 1])).toEqual(0);
    });
  });

  describe("Mux8 gate", () => {
    it("should validate truth bit based on selector", () => {
      expect(gates.Mux8(1, 0, 0, 0, 0, 0, 0, 0, [0, 0, 0])).toEqual(1);
      expect(gates.Mux8(0, 1, 0, 0, 0, 0, 0, 0, [1, 0, 0])).toEqual(1);
      expect(gates.Mux8(0, 0, 1, 0, 0, 0, 0, 0, [0, 1, 0])).toEqual(1);
      expect(gates.Mux8(0, 0, 0, 1, 0, 0, 0, 0, [1, 1, 0])).toEqual(1);
      expect(gates.Mux8(0, 0, 0, 0, 1, 0, 0, 0, [0, 0, 1])).toEqual(1);
      expect(gates.Mux8(0, 0, 0, 0, 0, 1, 0, 0, [1, 0, 1])).toEqual(1);
      expect(gates.Mux8(0, 0, 0, 0, 0, 0, 1, 0, [0, 1, 1])).toEqual(1);
      expect(gates.Mux8(0, 0, 0, 0, 0, 0, 0, 1, [1, 1, 1])).toEqual(1);
    });
    it("should validate false bit based on selector", () => {
      expect(gates.Mux8(0, 1, 1, 1, 1, 1, 1, 1, [0, 0, 0])).toEqual(0);
      expect(gates.Mux8(1, 0, 1, 1, 1, 1, 1, 1, [1, 0, 0])).toEqual(0);
      expect(gates.Mux8(1, 1, 0, 1, 1, 1, 1, 1, [0, 1, 0])).toEqual(0);
      expect(gates.Mux8(1, 1, 1, 0, 1, 1, 1, 1, [1, 1, 0])).toEqual(0);
      expect(gates.Mux8(1, 1, 1, 1, 0, 1, 1, 1, [0, 0, 1])).toEqual(0);
      expect(gates.Mux8(1, 1, 1, 1, 1, 0, 1, 1, [1, 0, 1])).toEqual(0);
      expect(gates.Mux8(1, 1, 1, 1, 1, 1, 0, 1, [0, 1, 1])).toEqual(0);
      expect(gates.Mux8(1, 1, 1, 1, 1, 1, 1, 0, [1, 1, 1])).toEqual(0);
    });
  });

  describe("DMux gate", () => {
    it("should validate truth table", () => {
      expect(gates.DMux(0, 0)).toEqual([0, 0]);
      expect(gates.DMux(0, 1)).toEqual([0, 0]);
      expect(gates.DMux(1, 0)).toEqual([1, 0]);
      expect(gates.DMux(1, 1)).toEqual([0, 1]);
    });
  });

});