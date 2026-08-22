import type { Bit, Bit16 } from "../hackjs";
import { And, Mux, Not, Or } from "./elementary";

export const ZEROED_16BIT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as const satisfies Bit16;
export const ONED_16BIT = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] as const satisfies Bit16;

/**
 * A 16-bit NOT gate, that applies the boolean NOT operation to each bit.
 */
export const Not16 = (a: Bit16): Bit16 => ([
  Not(a[0]),
  Not(a[1]),
  Not(a[2]),
  Not(a[3]),
  Not(a[4]),
  Not(a[5]),
  Not(a[6]),
  Not(a[7]),
  Not(a[8]),
  Not(a[9]),
  Not(a[10]),
  Not(a[11]),
  Not(a[12]),
  Not(a[13]),
  Not(a[14]),
  Not(a[15]),
]);

/**
 * A 16-bit AND gate, that applies the boolean AND operation to each bit pair.
 */
export const And16 = (a: Bit16, b: Bit16): Bit16 => ([
  And(a[0], b[0]),
  And(a[1], b[1]),
  And(a[2], b[2]),
  And(a[3], b[3]),
  And(a[4], b[4]),
  And(a[5], b[5]),
  And(a[6], b[6]),
  And(a[7], b[7]),
  And(a[8], b[8]),
  And(a[9], b[9]),
  And(a[10], b[10]),
  And(a[11], b[11]),
  And(a[12], b[12]),
  And(a[13], b[13]),
  And(a[14], b[14]),
  And(a[15], b[15]),
]);

/**
 * A 16-bit OR gate, that applies the boolean OR operation to each bit pair.
 */
export const Or16 = (a: Bit16, b: Bit16): Bit16 => ([
  Or(a[0], b[0]),
  Or(a[1], b[1]),
  Or(a[2], b[2]),
  Or(a[3], b[3]),
  Or(a[4], b[4]),
  Or(a[5], b[5]),
  Or(a[6], b[6]),
  Or(a[7], b[7]),
  Or(a[8], b[8]),
  Or(a[9], b[9]),
  Or(a[10], b[10]),
  Or(a[11], b[11]),
  Or(a[12], b[12]),
  Or(a[13], b[13]),
  Or(a[14], b[14]),
  Or(a[15], b[15]),
]);

/**
 * A 16-bit multiplexor.
 */
export const Mux16 = (a: Bit16, b: Bit16, sel: Bit): Bit16 => ([
  Mux(a[0], b[0], sel),
  Mux(a[1], b[1], sel),
  Mux(a[2], b[2], sel),
  Mux(a[3], b[3], sel),
  Mux(a[4], b[4], sel),
  Mux(a[5], b[5], sel),
  Mux(a[6], b[6], sel),
  Mux(a[7], b[7], sel),
  Mux(a[8], b[8], sel),
  Mux(a[9], b[9], sel),
  Mux(a[10], b[10], sel),
  Mux(a[11], b[11], sel),
  Mux(a[12], b[12], sel),
  Mux(a[13], b[13], sel),
  Mux(a[14], b[14], sel),
  Mux(a[15], b[15], sel),
]);
