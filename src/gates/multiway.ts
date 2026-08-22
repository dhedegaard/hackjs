import type { Bit, Bit16, Bit2, Bit3, Bit4, Bit8 } from "../hackjs";
import { And, DMux, Mux4, Mux8, Not, Or } from "./elementary";

/**
 * An 8 way or gate, outputs 1 if at least one of the bits are 1.
 */
export const Or8Way = (input: Bit8): Bit => Or(
  input[0], Or(
    input[1], Or(
      input[2], Or(
        input[3], Or(
          input[4], Or(
            input[5], Or(
              input[6],
              input[7],
            ),
          ),
        ),
      ),
    ),
  ),
);

/**
 * A 4-way, 16-bit multiplexor.
 */
export const Mux4Way16 = (
  a: Bit16, b: Bit16, c: Bit16, d: Bit16,
  sel: Bit2,
): Bit16 => ([
  Mux4(a[0], b[0], c[0], d[0], sel),
  Mux4(a[1], b[1], c[1], d[1], sel),
  Mux4(a[2], b[2], c[2], d[2], sel),
  Mux4(a[3], b[3], c[3], d[3], sel),
  Mux4(a[4], b[4], c[4], d[4], sel),
  Mux4(a[5], b[5], c[5], d[5], sel),
  Mux4(a[6], b[6], c[6], d[6], sel),
  Mux4(a[7], b[7], c[7], d[7], sel),
  Mux4(a[8], b[8], c[8], d[8], sel),
  Mux4(a[9], b[9], c[9], d[9], sel),
  Mux4(a[10], b[10], c[10], d[10], sel),
  Mux4(a[11], b[11], c[11], d[11], sel),
  Mux4(a[12], b[12], c[12], d[12], sel),
  Mux4(a[13], b[13], c[13], d[13], sel),
  Mux4(a[14], b[14], c[14], d[14], sel),
  Mux4(a[15], b[15], c[15], d[15], sel),
]);

/**
 * An 8-way, 16-bit multiplexor.
 */
export const Mux8Way16 = (
  a: Bit16, b: Bit16, c: Bit16, d: Bit16,
  e: Bit16, f: Bit16, g: Bit16, h: Bit16,
  sel: Bit3,
): Bit16 => ([
  Mux8(a[0], b[0], c[0], d[0], e[0], f[0], g[0], h[0], sel),
  Mux8(a[1], b[1], c[1], d[1], e[1], f[1], g[1], h[1], sel),
  Mux8(a[2], b[2], c[2], d[2], e[2], f[2], g[2], h[2], sel),
  Mux8(a[3], b[3], c[3], d[3], e[3], f[3], g[3], h[3], sel),
  Mux8(a[4], b[4], c[4], d[4], e[4], f[4], g[4], h[4], sel),
  Mux8(a[5], b[5], c[5], d[5], e[5], f[5], g[5], h[5], sel),
  Mux8(a[6], b[6], c[6], d[6], e[6], f[6], g[6], h[6], sel),
  Mux8(a[7], b[7], c[7], d[7], e[7], f[7], g[7], h[7], sel),
  Mux8(a[8], b[8], c[8], d[8], e[8], f[8], g[8], h[8], sel),
  Mux8(a[9], b[9], c[9], d[9], e[9], f[9], g[9], h[9], sel),
  Mux8(a[10], b[10], c[10], d[10], e[10], f[10], g[10], h[10], sel),
  Mux8(a[11], b[11], c[11], d[11], e[11], f[11], g[11], h[11], sel),
  Mux8(a[12], b[12], c[12], d[12], e[12], f[12], g[12], h[12], sel),
  Mux8(a[13], b[13], c[13], d[13], e[13], f[13], g[13], h[13], sel),
  Mux8(a[14], b[14], c[14], d[14], e[14], f[14], g[14], h[14], sel),
  Mux8(a[15], b[15], c[15], d[15], e[15], f[15], g[15], h[15], sel),
]);

/**
 * A 4-way demultiplexor.
 */
export const DMux4Way = (
  a: Bit,
  sel: Bit2,
): Bit4 => {
  const subOutput = DMux(a, sel[0]);
  return [
    ...[
      And(Not(sel[1]), subOutput[0]),
      And(Not(sel[1]), subOutput[1]),
    ],
    ...[
      And(sel[1], subOutput[0]),
      And(sel[1], subOutput[1]),
    ],
  ] as Bit4;
};

/**
 * A 8-way demultiplexor.
 */
export const DMux8Way = (input: Bit, sel: Bit3): Bit8 => {
  const subOut = DMux4Way(input, sel.slice(0, 2) as Bit2);
  return [
    ...[
      And(Not(sel[2]), subOut[0]),
      And(Not(sel[2]), subOut[1]),
      And(Not(sel[2]), subOut[2]),
      And(Not(sel[2]), subOut[3]),
    ],
    ...[
      And(sel[2], subOut[0]),
      And(sel[2], subOut[1]),
      And(sel[2], subOut[2]),
      And(sel[2], subOut[3]),
    ],
] as Bit8;
};
