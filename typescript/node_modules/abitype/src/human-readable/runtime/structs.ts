import type { AbiParameter } from '../../abi.js'
import { execTyped, isTupleRegex } from '../../regex.js'
import { UnknownTypeError } from '../errors/abiItem.js'
import { InvalidAbiTypeParameterError } from '../errors/abiParameter.js'
import {
  InvalidSignatureError,
  InvalidStructSignatureError,
} from '../errors/signature.js'
import { CircularReferenceError } from '../errors/struct.js'
import type { StructLookup } from '../types/structs.js'
import { execStructSignature, isStructSignature } from './signatures.js'
import { isSolidityType, parseAbiParameter } from './utils.js'

export function parseStructs(signatures: readonly string[]) {
  // Create "shallow" version of each struct (and filter out non-structs or invalid structs)
  const shallowStructs: StructLookup = {}
  const signaturesLength = signatures.length
  for (let i = 0; i < signaturesLength; i++) {
    const signature = signatures[i]!
    if (!isStructSignature(signature)) continue

    const match = execStructSignature(signature)
    if (!match) throw new InvalidSignatureError({ signature, type: 'struct' })

    const properties = match.properties.split(';')

    const components: AbiParameter[] = []
    const propertiesLength = properties.length
    for (let k = 0; k < propertiesLength; k++) {
      const property = properties[k]!
      const trimmed = property.trim()
      if (!trimmed) continue
      const abiParameter = parseAbiParameter(trimmed, {
        type: 'struct',
      })
      components.push(abiParameter)
    }

    if (!components.length) throw new InvalidStructSignatureError({ signature })
    shallowStructs[match.name] = components
  }

  // Resolve nested structs inside each parameter
  const resolvedStructs: StructLookup = {}
  const entries = Object.entries(shallowStructs)
  const entriesLength = entries.length
  for (let i = 0; i < entriesLength; i++) {
    const [name, parameters] = entries[i]!
    resolvedStructs[name] = resolveStructs(parameters, shallowStructs)
  }

  return resolvedStructs
}

const typeWithoutTupleRegex =
  /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/

function resolveStructs(
  abiParameters: readonly (AbiParameter & { indexed?: true })[],
  structs: StructLookup,
  ancestors = new Set<string>(),
) {
  const components: AbiParameter[] = []
  const length = abiParameters.length
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i]!
    const isTuple = isTupleRegex.test(abiParameter.type)
    if (isTuple) components.push(abiParameter)
    else {
      const match = execTyped<{ array?: string; type: string }>(
        typeWithoutTupleRegex,
        abiParameter.type,
      )
      if (!match?.type) throw new InvalidAbiTypeParameterError({ abiParameter })

      const { array, type } = match
      if (type in structs) {
        if (ancestors.has(type)) throw new CircularReferenceError({ type })

        components.push({
          ...abiParameter,
          type: `tuple${array ?? ''}`,
          components: resolveStructs(
            structs[type] ?? [],
            structs,
            new Set([...ancestors, type]),
          ),
        })
      } else {
        if (isSolidityType(type)) components.push(abiParameter)
        else throw new UnknownTypeError({ type })
      }
    }
  }

  return components
}
