import type { Bit, Bit16 } from "../hackjs";
import { Mux16, Or } from "../gates";
import { BIT16_FALSE } from "../helpers";
import { Inc16 } from "../alu";
import { Register } from "./ram";

/**
 * A 16-bit program counter.
 *
 * @param input An input, used only if `load` is 1.
 * @param inc Increments the counter by 1, returning the new count.
 * @param load Allows loading the input as the current count.
 * @param reset Resets the count 0.
 */
export const ProgramCounter = () => {
  const reg = Register();

  return (input: Bit16, inc: Bit, load: Bit, reset: Bit): Bit16 => {
    // Whether or not we set the load bit on the internal reguster.
    const loadReg = Or(Or(inc, load), reset);
    // Determine the input using multiplexers.
    const inputReg = Mux16(
      Mux16(
        Mux16(
          BIT16_FALSE,
          // Increment
          Inc16(
            reg(BIT16_FALSE, 0),
          ),
          inc,
        ),
        // Load
        input,
        load,
      ),
      // Reset
      BIT16_FALSE,
      reset,
    );
    // Call the register, returning the next result.
    return reg(inputReg, loadReg);
  };
};
