import type { SRFlipFlopOutput } from "../hackjs";
import { GatedDFlipFlop, GatedDFlipFlopTick, SRFlipFlop } from "./flipflop";

describe("latches", () => {
  describe("SRLatch", () => {
    it("can hold state", () => {
      expect(SRFlipFlop(0, 0, { q: 0, nq: 1 })).toEqual({ q: 0, nq: 1 });
      expect(SRFlipFlop(0, 0, { q: 1, nq: 0 })).toEqual({ q: 1, nq: 0 });
    });
    it("can reset (ie set Q to 0)", () => {
      expect(SRFlipFlop(0, 1, { q: 0, nq: 1 })).toEqual({ q: 0, nq: 1 });
      expect(SRFlipFlop(0, 1, { q: 1, nq: 0 })).toEqual({ q: 0, nq: 1 });
    });
    it("can set (ie set Q to 1)", () => {
      expect(SRFlipFlop(1, 0, { q: 0, nq: 1 })).toEqual({ q: 1, nq: 0 });
      expect(SRFlipFlop(1, 0, { q: 1, nq: 0 })).toEqual({ q: 1, nq: 0 });
    });
    it("can validate a simple set/latch/reset/latch flow", () => {
      let output: SRFlipFlopOutput = { q: 0, nq: 1 };

      // Q is set.
      output = SRFlipFlop(1, 0, output);
      expect(output).toEqual({ q: 1, nq: 0 });

      // Keep 1.
      output = SRFlipFlop(0, 0, output);
      expect(output).toEqual({ q: 1, nq: 0 });

      // Q is reset.
      output = SRFlipFlop(0, 1, output);
      expect(output).toEqual({ q: 0, nq: 1 });

      // Latch on.
      output = SRFlipFlop(0, 0, output);
      expect(output).toEqual({ q: 0, nq: 1 });

      // Set to invalid output (both set and reset bits).
      output = SRFlipFlop(1, 1, output);
      expect(output).toEqual({ q: 0, nq: 0 });
    });
  });

  describe("GatedDFlipFlopTick", () => {
    it("ignores the data when the clock is low", () => {
      {
        const result = GatedDFlipFlopTick(0, 0, { q: 0, nq: 1 });
        expect(result).toEqual({ q: 0, nq: 1 });
      }
      {
        const result = GatedDFlipFlopTick(0, 0, { q: 1, nq: 0 });
        expect(result).toEqual({ q: 1, nq: 0 });
      }
    });
  });

  describe("GatedDFlipFlop", () => {
    it("should send the data input to the output.", () => {
      expect(GatedDFlipFlop(0, 1, { q: 1, nq: 0 })).toEqual({ q: 0, nq: 1 });
      expect(GatedDFlipFlop(0, 1, { q: 0, nq: 1 })).toEqual({ q: 0, nq: 1 });
      expect(GatedDFlipFlop(1, 1, { q: 1, nq: 0 })).toEqual({ q: 1, nq: 0 });
      expect(GatedDFlipFlop(1, 1, { q: 0, nq: 1 })).toEqual({ q: 1, nq: 0 });
    });

    it("should hold the value, when the clock is low.", () => {
      expect(GatedDFlipFlop(0, 0, { q: 1, nq: 0 })).toEqual({ q: 1, nq: 0 });
      expect(GatedDFlipFlop(0, 0, { q: 0, nq: 1 })).toEqual({ q: 0, nq: 1 });
      expect(GatedDFlipFlop(1, 0, { q: 1, nq: 0 })).toEqual({ q: 1, nq: 0 });
      expect(GatedDFlipFlop(1, 0, { q: 0, nq: 1 })).toEqual({ q: 0, nq: 1 });
    });
  });
});
