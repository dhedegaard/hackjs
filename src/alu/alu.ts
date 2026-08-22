import { And16, Not, Not16, Or, Or16, Or8Way } from "../gates";
import type { Bit, Bit16, Bit8, IALUOutput } from "../hackjs";
import { BIT16_FALSE, bitToBit16 } from "../helpers";
import { Adder16 } from "./adder";

/**
 * Presets a given input based on the zero bit and the negation bit.
 */
export const Preset = (input: Bit16, z: Bit, n: Bit): Bit16 => Or16(
  And16(
    bitToBit16(n),
    Or16(
      And16(
        bitToBit16(z),
        Not16(BIT16_FALSE),
      ),
      And16(
        bitToBit16(Not(z)),
        Not16(input),
      ),
    ),
  ),
  And16(
    bitToBit16(Not(n)),
    Or16(
      And16(
        bitToBit16(z),
        BIT16_FALSE,
      ),
      And16(
        bitToBit16(Not(z)),
        input,
      ),
    ),
  ),
);

/**
 * Handles the operator (f-bit) of the ALU.
 */
export const Operator = (x: Bit16, y: Bit16, f: Bit): Bit16 => Or16(
  And16(
    bitToBit16(f),
    Adder16(x, y),
  ),
  And16(
    bitToBit16(Not(f)),
    And16(x, y),
  ),
);

/**
 * The Hack ALU.
 * @param x The first input, as 16 bits.
 * @param y The second input, as 16 bits.
 * @param zx Set x to zero.
 * @param nx Set x to negated x (after handling zx).
 * @param zy Set y to zero.
 * @param ny Set y to negated y (after handling zy).
 * @param f If true, then output is x + y, else output is x & y.
 * @param no If true, negate the output.
 */
export const ALU = (
  x: Bit16, y: Bit16,
  zx: Bit, nx: Bit, zy: Bit, ny: Bit, f: Bit, no: Bit,
): IALUOutput => {
  const operatorOut = Operator(
    Preset(x, zx, nx),
    Preset(y, zy, ny),
    f,
  );
  const out = Or16(
    And16(
      bitToBit16(Not(no)),
      operatorOut,
    ),
    And16(
      bitToBit16(no),
      Not16(
        operatorOut,
      ),
    ),
  );
  return {
    ng: out[15],
    out,
    zr: Not(
      Or(
        Or8Way(out.slice(0, 8) as Bit8),
        Or8Way(out.slice(8, 16) as Bit8),
      ),
    ),
  };
};
