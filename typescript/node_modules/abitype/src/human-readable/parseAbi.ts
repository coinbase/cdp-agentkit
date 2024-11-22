import type { Abi } from '../abi.js'
import type { Error, Filter } from '../types.js'
import { isStructSignature } from './runtime/signatures.js'
import { parseStructs } from './runtime/structs.js'
import { parseSignature } from './runtime/utils.js'
import type { Signatures } from './types/signatures.js'
import type { ParseStructs } from './types/structs.js'
import type { ParseSignature } from './types/utils.js'

/**
 * Parses human-readable ABI into JSON {@link Abi}
 *
 * @param signatures - Human-readable ABI
 * @returns Parsed {@link Abi}
 *
 * @example
 * type Result = ParseAbi<
 *   // ^? type Result = readonly [{ name: "balanceOf"; type: "function"; stateMutability:...
 *   [
 *     'function balanceOf(address owner) view returns (uint256)',
 *     'event Transfer(address indexed from, address indexed to, uint256 amount)',
 *   ]
 * >
 */
export type ParseAbi<signatures extends readonly string[]> =
  string[] extends signatures
    ? Abi // If `T` was not able to be inferred (e.g. just `string[]`), return `Abi`
    : signatures extends readonly string[]
      ? signatures extends Signatures<signatures> // Validate signatures
        ? ParseStructs<signatures> extends infer sructs
          ? {
              [key in keyof signatures]: signatures[key] extends string
                ? ParseSignature<signatures[key], sructs>
                : never
            } extends infer mapped extends readonly unknown[]
            ? Filter<mapped, never> extends infer result
              ? result extends readonly []
                ? never
                : result
              : never
            : never
          : never
        : never
      : never

/**
 * Parses human-readable ABI into JSON {@link Abi}
 *
 * @param signatures - Human-Readable ABI
 * @returns Parsed {@link Abi}
 *
 * @example
 * const abi = parseAbi([
 *   //  ^? const abi: readonly [{ name: "balanceOf"; type: "function"; stateMutability:...
 *   'function balanceOf(address owner) view returns (uint256)',
 *   'event Transfer(address indexed from, address indexed to, uint256 amount)',
 * ])
 */
export function parseAbi<const signatures extends readonly string[]>(
  signatures: signatures['length'] extends 0
    ? Error<'At least one signature required'>
    : Signatures<signatures> extends signatures
      ? signatures
      : Signatures<signatures>,
): ParseAbi<signatures> {
  const structs = parseStructs(signatures as readonly string[])
  const abi = []
  const length = signatures.length as number
  for (let i = 0; i < length; i++) {
    const signature = (signatures as readonly string[])[i]!
    if (isStructSignature(signature)) continue
    abi.push(parseSignature(signature, structs))
  }
  return abi as unknown as ParseAbi<signatures>
}
