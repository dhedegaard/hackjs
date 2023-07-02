import { DMux8Way, Mux, Mux8Way16 } from "../gates";
import { Bit, Bit12, Bit15, Bit16, Bit3, Bit6, Bit9 } from "../hackjs";
import { bitToSRFlipFlopOutput } from "../helpers";
import { GatedDFlipFlop } from "./flipflop";

/**
 * A single bit register.
 *
 * It simulates the concept of time by simply keeping each output in memory
 * after every invocation.
 *
 * Sort of like cheating, but the data has to live somewhere.
 *
 * Call the function to get a register, then call the register with an input
 * and a load bit to receive an output.
 */
export const BitRegister = () => {
  let output: Bit = 0;

  return (input: Bit, load: Bit): Bit => {
    output = GatedDFlipFlop(
      Mux(output, input, load),
      1,
      bitToSRFlipFlopOutput(output)
    ).q;
    return output;
  };
};

/**
 * A 16-bit register.
 *
 * Call to build a register, then call the register with 16-bit input and a
 * load bit to utilize.
 */
export const Register = () => {
  // Assemble 16 registers.
  const output = [...Array(16)].map(() => BitRegister());

  return (input: Bit16, load: Bit): Bit16 =>
    // Call all the registers with each input and the load bit.
    output.map((reg, idx) => reg(definedOrFail(input[idx]), load)) as Bit16;
};

/**
 * A RAM unit with 8 registers, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram8 = () => {
  const memory = [...Array(8)].map(() => Register());

  return (input: Bit16, address: Bit3, load: Bit): Bit16 => {
    // Start by demuxifying the load bits for each register.
    const loadbits = DMux8Way(load, address);
    // Call all the registers with the demuxified load bit.
    const output = memory.map((register, idx) =>
      register(input, definedOrFail(loadbits[idx]))
    );
    // Multiplex the output to make sure the correct address is returned.
    return Mux8Way16(
      definedOrFail(output[0]),
      definedOrFail(output[1]),
      definedOrFail(output[2]),
      definedOrFail(output[3]),
      definedOrFail(output[4]),
      definedOrFail(output[5]),
      definedOrFail(output[6]),
      definedOrFail(output[7]),
      address
    );
  };
};

/**
 * A RAM unit with 8 x 8 register RAM units, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram64 = () => {
  const memory = [...Array(8)].map(() => Ram8());

  return (input: Bit16, address: Bit6, load: Bit): Bit16 => {
    // Start by demuxifying the load bits for each register.
    const loadbits = DMux8Way(load, address.slice(0, 3) as Bit3);
    // Call all the registers with the demuxified load bit.
    const output = memory.map((register, idx) =>
      register(input, address.slice(3) as Bit3, definedOrFail(loadbits[idx]))
    );
    // Multiplex the output to make sure the correct address is returned.
    return Mux8Way16(
      definedOrFail(output[0]),
      definedOrFail(output[1]),
      definedOrFail(output[2]),
      definedOrFail(output[3]),
      definedOrFail(output[4]),
      definedOrFail(output[5]),
      definedOrFail(output[6]),
      definedOrFail(output[7]),
      address.slice(0, 3) as Bit3
    );
  };
};

/**
 * A RAM unit with 8 x 64 register RAM units, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram512 = () => {
  const memory = [...Array(8)].map(() => Ram64());

  return (input: Bit16, address: Bit9, load: Bit): Bit16 => {
    // Start by demuxifying the load bits for each register.
    const loadbits = DMux8Way(load, address.slice(0, 3) as Bit3);
    // Call all the registers with the demuxified load bit.
    const output = memory.map((register, idx) =>
      register(input, address.slice(3) as Bit6, definedOrFail(loadbits[idx]))
    );
    // Multiplex the output to make sure the correct address is returned.
    return Mux8Way16(
      definedOrFail(output[0]),
      definedOrFail(output[1]),
      definedOrFail(output[2]),
      definedOrFail(output[3]),
      definedOrFail(output[4]),
      definedOrFail(output[5]),
      definedOrFail(output[6]),
      definedOrFail(output[7]),
      address.slice(0, 3) as Bit3
    );
  };
};

/**
 * A RAM unit with 8 x 512 register RAM units, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram4K = () => {
  const memory = [...Array(8)].map(() => Ram512());

  return (input: Bit16, address: Bit12, load: Bit): Bit16 => {
    // Start by demuxifying the load bits for each register.
    const loadbits = DMux8Way(load, address.slice(0, 3) as Bit3);
    // Call all the registers with the demuxified load bit.
    const output = memory.map((register, idx) =>
      register(input, address.slice(3) as Bit9, definedOrFail(loadbits[idx]))
    );
    // Multiplex the output to make sure the correct address is returned.
    return Mux8Way16(
      definedOrFail(output[0]),
      definedOrFail(output[1]),
      definedOrFail(output[2]),
      definedOrFail(output[3]),
      definedOrFail(output[4]),
      definedOrFail(output[5]),
      definedOrFail(output[6]),
      definedOrFail(output[7]),
      address.slice(0, 3) as Bit3
    );
  };
};

/**
 * A RAM unit with 8 x 4096 register RAM units, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram16K = () => {
  const memory = [...Array(8)].map(() => Ram4K());

  return (input: Bit16, address: Bit15, load: Bit): Bit16 => {
    // Start by demuxifying the load bits for each register.
    const loadbits = DMux8Way(load, address.slice(0, 3) as Bit3);
    // Call all the registers with the demuxified load bit.
    const output = memory.map((register, idx) =>
      register(input, address.slice(3) as Bit12, definedOrFail(loadbits[idx]))
    );
    // Multiplex the output to make sure the correct address is returned.
    return Mux8Way16(
      definedOrFail(output[0]),
      definedOrFail(output[1]),
      definedOrFail(output[2]),
      definedOrFail(output[3]),
      definedOrFail(output[4]),
      definedOrFail(output[5]),
      definedOrFail(output[6]),
      definedOrFail(output[7]),
      address.slice(0, 3) as Bit3
    );
  };
};

const definedOrFail = <T>(value: T | undefined): T => {
  if (value === undefined) {
    throw new Error("Value is undefined");
  }
  return value;
};
