import type * as Abi from '../Abi.js'

/** @internal */
export function isSignatures(
  value: Abi.Abi | readonly string[],
): value is readonly string[] {
  for (const item of value) {
    if (typeof item !== 'string') return false
  }
  return true
}
