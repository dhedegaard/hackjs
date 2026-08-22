import { Not } from "./gates";
import type { Bit, Bit16, Bit8, SRFlipFlopOutput } from "./hackjs";

const charToBit = (char: string): Bit => {
  if (char !== "0" && char !== "1") {
    throw new TypeError(`unexpected binary character: ${char}`);
  }
  return char === "1" ? 1 : 0;
};

const assertLength = (binary: string, length: number): void => {
  if (binary.length !== length) {
    throw new TypeError(`binary length (${binary.length}) is not equal to the expected bit length (${length})`);
  }
};

/**
 * Converts a binary string to a bit array.
 * Keep in mind that the array ordering when printed is reversed compared to the orderuing the binary string.
 */
export const binaryToArray = (binary: string, length: number): Bit[] => {
  assertLength(binary, length);
  return Array.from(binary)
    .map((char) => charToBit(char))
    .toReversed();
};

export const binaryToBit8 = (binary: string): Bit8 => {
  assertLength(binary, 8);
  return [
    charToBit(binary.charAt(7)),
    charToBit(binary.charAt(6)),
    charToBit(binary.charAt(5)),
    charToBit(binary.charAt(4)),
    charToBit(binary.charAt(3)),
    charToBit(binary.charAt(2)),
    charToBit(binary.charAt(1)),
    charToBit(binary.charAt(0)),
  ];
};

export const binaryToBit16 = (binary: string): Bit16 => {
  assertLength(binary, 16);
  return [
    charToBit(binary.charAt(15)),
    charToBit(binary.charAt(14)),
    charToBit(binary.charAt(13)),
    charToBit(binary.charAt(12)),
    charToBit(binary.charAt(11)),
    charToBit(binary.charAt(10)),
    charToBit(binary.charAt(9)),
    charToBit(binary.charAt(8)),
    charToBit(binary.charAt(7)),
    charToBit(binary.charAt(6)),
    charToBit(binary.charAt(5)),
    charToBit(binary.charAt(4)),
    charToBit(binary.charAt(3)),
    charToBit(binary.charAt(2)),
    charToBit(binary.charAt(1)),
    charToBit(binary.charAt(0)),
  ];
};

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
