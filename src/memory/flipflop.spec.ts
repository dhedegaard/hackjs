import { GatedDFlipFlop, GatedDFlipFlopTick, SRFlipFlop } from "./flipflop.ts";
import assert from "node:assert/strict";
import { test } from "node:test";
import type { SRFlipFlopOutput } from "../hackjs";

await test("SRLatch > can hold state", () => {
  assert.deepStrictEqual(SRFlipFlop(0, 0, { q: 0, nq: 1 }), { q: 0, nq: 1 });
  assert.deepStrictEqual(SRFlipFlop(0, 0, { q: 1, nq: 0 }), { q: 1, nq: 0 });
});

await test("SRLatch > can reset (ie set Q to 0)", () => {
  assert.deepStrictEqual(SRFlipFlop(0, 1, { q: 0, nq: 1 }), { q: 0, nq: 1 });
  assert.deepStrictEqual(SRFlipFlop(0, 1, { q: 1, nq: 0 }), { q: 0, nq: 1 });
});

await test("SRLatch > can set (ie set Q to 1)", () => {
  assert.deepStrictEqual(SRFlipFlop(1, 0, { q: 0, nq: 1 }), { q: 1, nq: 0 });
  assert.deepStrictEqual(SRFlipFlop(1, 0, { q: 1, nq: 0 }), { q: 1, nq: 0 });
});

await test("SRLatch > can validate a simple set/latch/reset/latch flow", () => {
  let output: SRFlipFlopOutput = { q: 0, nq: 1 };

  // Q is set.
  output = SRFlipFlop(1, 0, output);
  assert.deepStrictEqual(output, { q: 1, nq: 0 });

  // Keep 1.
  output = SRFlipFlop(0, 0, output);
  assert.deepStrictEqual(output, { q: 1, nq: 0 });

  // Q is reset.
  output = SRFlipFlop(0, 1, output);
  assert.deepStrictEqual(output, { q: 0, nq: 1 });

  // Latch on.
  output = SRFlipFlop(0, 0, output);
  assert.deepStrictEqual(output, { q: 0, nq: 1 });

  // Set to invalid output (both set and reset bits).
  output = SRFlipFlop(1, 1, output);
  assert.deepStrictEqual(output, { q: 0, nq: 0 });
});

await test("GatedDFlipFlopTick > ignores the data when the clock is low", () => {
  {
    const result = GatedDFlipFlopTick(0, 0, { q: 0, nq: 1 });
    assert.deepStrictEqual(result, { q: 0, nq: 1 });
  }
  {
    const result = GatedDFlipFlopTick(0, 0, { q: 1, nq: 0 });
    assert.deepStrictEqual(result, { q: 1, nq: 0 });
  }
});

await test("GatedDFlipFlop > should send the data input to the output.", () => {
  assert.deepStrictEqual(GatedDFlipFlop(0, 1, { q: 1, nq: 0 }), { q: 0, nq: 1 });
  assert.deepStrictEqual(GatedDFlipFlop(0, 1, { q: 0, nq: 1 }), { q: 0, nq: 1 });
  assert.deepStrictEqual(GatedDFlipFlop(1, 1, { q: 1, nq: 0 }), { q: 1, nq: 0 });
  assert.deepStrictEqual(GatedDFlipFlop(1, 1, { q: 0, nq: 1 }), { q: 1, nq: 0 });
});

await test("GatedDFlipFlop > should hold the value, when the clock is low.", () => {
  assert.deepStrictEqual(GatedDFlipFlop(0, 0, { q: 1, nq: 0 }), { q: 1, nq: 0 });
  assert.deepStrictEqual(GatedDFlipFlop(0, 0, { q: 0, nq: 1 }), { q: 0, nq: 1 });
  assert.deepStrictEqual(GatedDFlipFlop(1, 0, { q: 1, nq: 0 }), { q: 1, nq: 0 });
  assert.deepStrictEqual(GatedDFlipFlop(1, 0, { q: 0, nq: 1 }), { q: 0, nq: 1 });
});
