/**
 * Implements various elementary logic gates based on one or more input gates and one or more output gate.
 * Everything except the NAND gate is implemented entirely by compositing other gates.
 */
import type { Bit, Bit2, Bit3 } from "../hackjs";

/**
 * A NAND (not-and) gate, the only gate not implemented as a composite of other gates.
 */
export const Nand = (a: Bit, b: Bit): Bit => (a === 1 && b === 1 ? 0 : 1);

/**
 * A NOT gate, inverts the input.
 */
export const Not = (a: Bit): Bit => Nand(a, a);

/**
 * An AND gate, returns 1 when both a and b is 1.
 */
export const And = (a: Bit, b: Bit): Bit => Nand(
  Nand(a, b),
  Nand(a, b),
);

/**
 * An OR gate, returns 1 if either a or b (or both) is 1.
 */
export const Or = (a: Bit, b: Bit): Bit => Nand(
  Not(a),
  Not(b),
);

/**
 * A NOR (not OR) gate, returns 1 if both a and b is 0.
 */
export const Nor = (a: Bit, b: Bit): Bit => Not(
  Or(a, b),
);

/**
 * An XOR (exclusive-or) gate, returns 1 if either a or b is 1, buth not both.
 */
export const Xor = (a: Bit, b: Bit): Bit => Or(
  And(a, Not(b)),
  And(Not(a), b),
);

/**
 * An XNOR (exclusive-not-or) gate, return 1 if a and b is equal.
 */
export const Xnor = (a: Bit, b: Bit): Bit => Nand(
  Nand(
    Not(a),
    Not(b),
  ),
  Nand(a, b),
);

/**
 * A multiplexor gate. Selects bit a, when the selector is 0, otherwise bit b is outputted.
 */
export const Mux = (a: Bit, b: Bit, sel: Bit): Bit => Or(
  And(
    Not(sel),
    a,
  ),
  And(sel, b),
);

/**
 * A 4-way multiplexor.
 */
export const Mux4 = (a: Bit, b: Bit, c: Bit, d: Bit, sel: Bit2): Bit => Or(
  And(
    Not(sel[1]),
    Mux(a, b, sel[0]),
  ),
  And(
    sel[1],
    Mux(c, d, sel[0]),
  ),
);

/**
 * A 8-way multiplexor.
 */
export const Mux8 = (a: Bit, b: Bit, c: Bit, d: Bit, e: Bit, f: Bit, g: Bit, h: Bit, sel: Bit3): Bit => Or(
  And(
    Not(sel[2]),
    Mux4(a, b, c, d, [sel[0], sel[1]]),
  ),
  And(
    sel[2],
    Mux4(e, f, g, h, [sel[0], sel[1]]),
  ),
);

/**
 * A demultiplexor gate. Outputs the input based on the selector bit.
 */
export const DMux = (a: Bit, sel: Bit): Bit2 => [
  And(Not(sel), a),
  And(sel, a),
];
