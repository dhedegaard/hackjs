import { And, Nor, Not } from "../gates";
import type { Bit, SRFlipFlopOutput } from "../hackjs";

const SRFlipFlopTick = (s: Bit, r: Bit, output: SRFlipFlopOutput): SRFlipFlopOutput => ({
  nq: Nor(
    s,
    output.q,
  ),
  q: Nor(
    r,
    output.nq,
  ),
});

/**
 * An SR latch/flip-flop circuit.
 *
 * Takes a setter bit, a reset bit and the previous output.
 *
 * Runs the cycle twice to make sure the output is calculated upon a full clock cycle.
 *
 * @param s The set bit.
 * @param r The reset bit.
 * @param output The previous output.
 * @returns The next output in the cycle.
 */
export const SRFlipFlop = (s: Bit, r: Bit, output: SRFlipFlopOutput): SRFlipFlopOutput =>
  SRFlipFlopTick(s, r, SRFlipFlopTick(s, r, output));

export const GatedDFlipFlopTick = (d: Bit, clock: Bit, output: SRFlipFlopOutput): SRFlipFlopOutput => ({
  nq: Nor(
    And(
      clock,
      d,
    ),
    output.q,
  ),
  q: Nor(
    And(
      clock,
      Not(d),
    ),
    output.nq,
  ),
});

/**
 * A gated data flip-flip.
 *
 * Outputs whatever is container (the output in the input), if the clock is high.
 * Otherwise sets a new state.
 *
 * @param d The data input
 * @param clock The clock, either high or low.
 * @param output The output, as both q and !q (nq).
 */
export const GatedDFlipFlop = (d: Bit, clock: Bit, output: SRFlipFlopOutput): SRFlipFlopOutput =>
  GatedDFlipFlopTick(d, clock, GatedDFlipFlopTick(d, clock, output));
