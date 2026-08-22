import { DMux8Way, Mux, Mux8Way16 } from "../gates";
import type { Bit, Bit12, Bit15, Bit16, Bit3, Bit6, Bit9 } from "../hackjs";
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
  // Assemble 16 registers, one per bit.
  const regs = [
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
    BitRegister(),
  ] as const;

  return (input: Bit16, load: Bit): Bit16 => [
    regs[0](input[0], load),
    regs[1](input[1], load),
    regs[2](input[2], load),
    regs[3](input[3], load),
    regs[4](input[4], load),
    regs[5](input[5], load),
    regs[6](input[6], load),
    regs[7](input[7], load),
    regs[8](input[8], load),
    regs[9](input[9], load),
    regs[10](input[10], load),
    regs[11](input[11], load),
    regs[12](input[12], load),
    regs[13](input[13], load),
    regs[14](input[14], load),
    regs[15](input[15], load),
  ];
};

/**
 * A RAM unit with 8 registers, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram8 = () => {
  const memory = [
    Register(),
    Register(),
    Register(),
    Register(),
    Register(),
    Register(),
    Register(),
    Register(),
  ] as const;

  return (input: Bit16, address: Bit3, load: Bit): Bit16 => {
    // Start by demuxifying the load bits for each register.
    const loadbits = DMux8Way(load, address);
    // Call all the registers with the demuxified load bit, then multiplex the
    // output to make sure the correct address is returned.
    return Mux8Way16(
      memory[0](input, loadbits[0]),
      memory[1](input, loadbits[1]),
      memory[2](input, loadbits[2]),
      memory[3](input, loadbits[3]),
      memory[4](input, loadbits[4]),
      memory[5](input, loadbits[5]),
      memory[6](input, loadbits[6]),
      memory[7](input, loadbits[7]),
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
  const memory = [
    Ram8(),
    Ram8(),
    Ram8(),
    Ram8(),
    Ram8(),
    Ram8(),
    Ram8(),
    Ram8(),
  ] as const;

  return (input: Bit16, address: Bit6, load: Bit): Bit16 => {
    // Split the address: the low bits select the unit, the rest is the
    // sub-address within it.
    const [a0, a1, a2, ...subAddress] = address;
    const sel: Bit3 = [a0, a1, a2];
    // Start by demuxifying the load bits for each unit.
    const loadbits = DMux8Way(load, sel);
    // Call all the units with the demuxified load bit, then multiplex the
    // output to make sure the correct address is returned.
    return Mux8Way16(
      memory[0](input, subAddress, loadbits[0]),
      memory[1](input, subAddress, loadbits[1]),
      memory[2](input, subAddress, loadbits[2]),
      memory[3](input, subAddress, loadbits[3]),
      memory[4](input, subAddress, loadbits[4]),
      memory[5](input, subAddress, loadbits[5]),
      memory[6](input, subAddress, loadbits[6]),
      memory[7](input, subAddress, loadbits[7]),
      sel
    );
  };
};

/**
 * A RAM unit with 8 x 64 register RAM units, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram512 = () => {
  const memory = [
    Ram64(),
    Ram64(),
    Ram64(),
    Ram64(),
    Ram64(),
    Ram64(),
    Ram64(),
    Ram64(),
  ] as const;

  return (input: Bit16, address: Bit9, load: Bit): Bit16 => {
    // Split the address: the low bits select the unit, the rest is the
    // sub-address within it.
    const [a0, a1, a2, ...subAddress] = address;
    const sel: Bit3 = [a0, a1, a2];
    // Start by demuxifying the load bits for each unit.
    const loadbits = DMux8Way(load, sel);
    // Call all the units with the demuxified load bit, then multiplex the
    // output to make sure the correct address is returned.
    return Mux8Way16(
      memory[0](input, subAddress, loadbits[0]),
      memory[1](input, subAddress, loadbits[1]),
      memory[2](input, subAddress, loadbits[2]),
      memory[3](input, subAddress, loadbits[3]),
      memory[4](input, subAddress, loadbits[4]),
      memory[5](input, subAddress, loadbits[5]),
      memory[6](input, subAddress, loadbits[6]),
      memory[7](input, subAddress, loadbits[7]),
      sel
    );
  };
};

/**
 * A RAM unit with 8 x 512 register RAM units, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram4K = () => {
  const memory = [
    Ram512(),
    Ram512(),
    Ram512(),
    Ram512(),
    Ram512(),
    Ram512(),
    Ram512(),
    Ram512(),
  ] as const;

  return (input: Bit16, address: Bit12, load: Bit): Bit16 => {
    // Split the address: the low bits select the unit, the rest is the
    // sub-address within it.
    const [a0, a1, a2, ...subAddress] = address;
    const sel: Bit3 = [a0, a1, a2];
    // Start by demuxifying the load bits for each unit.
    const loadbits = DMux8Way(load, sel);
    // Call all the units with the demuxified load bit, then multiplex the
    // output to make sure the correct address is returned.
    return Mux8Way16(
      memory[0](input, subAddress, loadbits[0]),
      memory[1](input, subAddress, loadbits[1]),
      memory[2](input, subAddress, loadbits[2]),
      memory[3](input, subAddress, loadbits[3]),
      memory[4](input, subAddress, loadbits[4]),
      memory[5](input, subAddress, loadbits[5]),
      memory[6](input, subAddress, loadbits[6]),
      memory[7](input, subAddress, loadbits[7]),
      sel
    );
  };
};

/**
 * A RAM unit with 8 x 4096 register RAM units, of 16 bits.
 *
 * Call this function to initialize a new RAM unit.
 */
export const Ram16K = () => {
  const memory = [
    Ram4K(),
    Ram4K(),
    Ram4K(),
    Ram4K(),
    Ram4K(),
    Ram4K(),
    Ram4K(),
    Ram4K(),
  ] as const;

  return (input: Bit16, address: Bit15, load: Bit): Bit16 => {
    // Split the address: the low bits select the unit, the rest is the
    // sub-address within it.
    const [a0, a1, a2, ...subAddress] = address;
    const sel: Bit3 = [a0, a1, a2];
    // Start by demuxifying the load bits for each unit.
    const loadbits = DMux8Way(load, sel);
    // Call all the units with the demuxified load bit, then multiplex the
    // output to make sure the correct address is returned.
    return Mux8Way16(
      memory[0](input, subAddress, loadbits[0]),
      memory[1](input, subAddress, loadbits[1]),
      memory[2](input, subAddress, loadbits[2]),
      memory[3](input, subAddress, loadbits[3]),
      memory[4](input, subAddress, loadbits[4]),
      memory[5](input, subAddress, loadbits[5]),
      memory[6](input, subAddress, loadbits[6]),
      memory[7](input, subAddress, loadbits[7]),
      sel
    );
  };
};
