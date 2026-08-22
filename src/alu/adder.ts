import { And, Or, Xor } from "../gates";
import type { Bit, Bit16, Bit8 } from "../hackjs";
import { BIT16_TRUE } from "../helpers";

export interface IAdderResult {
  sum: Bit;
  carry: Bit;
}

/**
 * Half Adder, takes 2 bits and returns a carry and a sum.
 */
export const HalfAdder = (a: Bit, b: Bit): IAdderResult => ({
  carry: And(a, b),
  sum: Xor(a, b),
});

/**
 * Full adder, takes 2 bits plus a carry bit, and adds them together.
 * Returning a carry and a bit.
 */
export const FullAdder = (a: Bit, b: Bit, c: Bit): IAdderResult => ({
  carry: Or(
    And(a, b),
    And(
      c,
      Xor(a, b),
    ),
  ),
  sum: Xor(
    c,
    Xor(a, b),
  ),
});

/**
 * An 8-bit adder, adds two bytes together and returns the sum.
 * Ignoring any overflows.
 */
export const Adder8 = (a: Bit8, b: Bit8): Bit8 => {
  const res0 = HalfAdder(a[0], b[0]);
  const res1 = FullAdder(a[1], b[1], res0.carry);
  const res2 = FullAdder(a[2], b[2], res1.carry);
  const res3 = FullAdder(a[3], b[3], res2.carry);
  const res4 = FullAdder(a[4], b[4], res3.carry);
  const res5 = FullAdder(a[5], b[5], res4.carry);
  const res6 = FullAdder(a[6], b[6], res5.carry);
  const res7 = FullAdder(a[7], b[7], res6.carry);
  return [
    res0.sum,
    res1.sum,
    res2.sum,
    res3.sum,
    res4.sum,
    res5.sum,
    res6.sum,
    res7.sum,
  ];
};

/**
 * An 16-bit adder, adds two bytes together and returns the sum.
 * Ignoring any overflows.
 */
export const Adder16 = (a: Bit16, b: Bit16): Bit16 => {
  const res0 = HalfAdder(a[0], b[0]);
  const res1 = FullAdder(a[1], b[1], res0.carry);
  const res2 = FullAdder(a[2], b[2], res1.carry);
  const res3 = FullAdder(a[3], b[3], res2.carry);
  const res4 = FullAdder(a[4], b[4], res3.carry);
  const res5 = FullAdder(a[5], b[5], res4.carry);
  const res6 = FullAdder(a[6], b[6], res5.carry);
  const res7 = FullAdder(a[7], b[7], res6.carry);
  const res8 = FullAdder(a[8], b[8], res7.carry);
  const res9 = FullAdder(a[9], b[9], res8.carry);
  const res10 = FullAdder(a[10], b[10], res9.carry);
  const res11 = FullAdder(a[11], b[11], res10.carry);
  const res12 = FullAdder(a[12], b[12], res11.carry);
  const res13 = FullAdder(a[13], b[13], res12.carry);
  const res14 = FullAdder(a[14], b[14], res13.carry);
  const res15 = FullAdder(a[15], b[15], res14.carry);
  return [
    res0.sum,
    res1.sum,
    res2.sum,
    res3.sum,
    res4.sum,
    res5.sum,
    res6.sum,
    res7.sum,
    res8.sum,
    res9.sum,
    res10.sum,
    res11.sum,
    res12.sum,
    res13.sum,
    res14.sum,
    res15.sum,
  ];
};

/**
 * A 16-bit incrementor.
 * Outputs the input + 1.
 */
export const Inc16 = (
  input: Bit16,
): Bit16 => Adder16(input, BIT16_TRUE);
