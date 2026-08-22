export as namespace hackjs;

/**
 * The basic type below everything, a simple bit.
 */
export type Bit = 0 | 1;

/**
 * A 2 bit type, as a tuple.
 */
export type Bit2 = readonly [Bit, Bit];

/**
 * A 3 bit type, as a tuple.
 */
export type Bit3 = readonly [Bit, Bit, Bit];

/**
 * A 4 bit type, as a tuple.
 */
export type Bit4 = readonly [Bit, Bit, Bit, Bit];

export type Bit6 = readonly [Bit, Bit, Bit, Bit, Bit, Bit];

/**
 * A 8 bit type, as a tuple.
 */
export type Bit8 = readonly [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit];

export type Bit9 = readonly [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit];

export type Bit12 = readonly [
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit
];

export type Bit15 = readonly [
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit
];

/**
 * A 16 bit type, as a tuple.
 */
export type Bit16 = readonly [
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit
];

/**
 * The composite output from the ALU.
 */
export interface IALUOutput {
  /**
   * The output of an ALU computation.
   */
  readonly out: Bit16;
  /**
   * If the output is 0, then zr is 1.
   */
  readonly zr: Bit;
  /**
   * If the output is negative (if the MSB is 1), then ng equals 1.
   */
  readonly ng: Bit;
}

export interface SRFlipFlopOutput {
  /**
   * Q: The output.
   */
  readonly q: Bit;
  /**
   * Inverse Q, the inverse output.
   */
  readonly nq: Bit;
}
