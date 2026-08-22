import { Not } from "./gates";
import type { Bit, Bit16, Bit8, SRFlipFlopOutput } from "./hackjs";

/**
 * Converts a binary string to a bit array.
 * Keep in mind that the array ordering when printed is reversed compared to the orderuing the binary string.
 */
export const binaryToArray = (binary: string, length: number): Bit[] => {
  if (binary.length !== length) {
    throw new TypeError(`binary length (${binary.length}) is not equal to the expected bit length (${length})`);
  }
  return Array.from(binary)
    .map((e) => Number.parseInt(e, 2) as Bit)
    .toReversed();
};

export const binaryToBit8 = (binary: string): Bit8 => binaryToArray(binary, 8) as Bit8;

export const binaryToBit16 = (binary: string): Bit16 => binaryToArray(binary, 16) as Bit16;

export const BIT16_FALSE = binaryToBit16("0000000000000000");
export const BIT16_TRUE = binaryToBit16("0000000000000001");

/**
 * Converts a bit to a bit16.
 */
export const bitToBit16 = (input: Bit): Bit16 => ([
  input, input, input, input, input, input, input, input,
  input, input, input, input, input, input, input, input,
]);

export const bitToSRFlipFlopOutput = (b: Bit): SRFlipFlopOutput => ({
  nq: Not(b),
  q: b,
});
