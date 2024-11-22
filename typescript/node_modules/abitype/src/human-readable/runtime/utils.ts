import type {
  AbiItemType,
  AbiType,
  SolidityArray,
  SolidityBytes,
  SolidityString,
  SolidityTuple,
} from '../../abi.js'
import {
  bytesRegex,
  execTyped,
  integerRegex,
  isTupleRegex,
} from '../../regex.js'
import { UnknownSolidityTypeError } from '../errors/abiItem.js'
import {
  InvalidFunctionModifierError,
  InvalidModifierError,
  InvalidParameterError,
  SolidityProtectedKeywordError,
} from '../errors/abiParameter.js'
import {
  InvalidSignatureError,
  UnknownSignatureError,
} from '../errors/signature.js'
import { InvalidParenthesisError } from '../errors/splitParameters.js'
import type { FunctionModifier, Modifier } from '../types/signatures.js'
import type { StructLookup } from '../types/structs.js'
import { getParameterCacheKey, parameterCache } from './cache.js'
import {
  eventModifiers,
  execConstructorSignature,
  execErrorSignature,
  execEventSignature,
  execFunctionSignature,
  functionModifiers,
  isConstructorSignature,
  isErrorSignature,
  isEventSignature,
  isFallbackSignature,
  isFunctionSignature,
  isReceiveSignature,
} from './signatures.js'

export function parseSignature(signature: string, structs: StructLookup = {}) {
  if (isFunctionSignature(signature)) {
    const match = execFunctionSignature(signature)
    if (!match) throw new InvalidSignatureError({ signature, type: 'function' })

    const inputParams = splitParameters(match.parameters)
    const inputs = []
    const inputLength = inputParams.length
    for (let i = 0; i < inputLength; i++) {
      inputs.push(
        parseAbiParameter(inputParams[i]!, {
          modifiers: functionModifiers,
          structs,
          type: 'function',
        }),
      )
    }

    const outputs = []
    if (match.returns) {
      const outputParams = splitParameters(match.returns)
      const outputLength = outputParams.length
      for (let i = 0; i < outputLength; i++) {
        outputs.push(
          parseAbiParameter(outputParams[i]!, {
            modifiers: functionModifiers,
            structs,
            type: 'function',
          }),
        )
      }
    }

    return {
      name: match.name,
      type: 'function',
      stateMutability: match.stateMutability ?? 'nonpayable',
      inputs,
      outputs,
    }
  }

  if (isEventSignature(signature)) {
    const match = execEventSignature(signature)
    if (!match) throw new InvalidSignatureError({ signature, type: 'event' })

    const params = splitParameters(match.parameters)
    const abiParameters = []
    const length = params.length
    for (let i = 0; i < length; i++) {
      abiParameters.push(
        parseAbiParameter(params[i]!, {
          modifiers: eventModifiers,
          structs,
          type: 'event',
        }),
      )
    }
    return { name: match.name, type: 'event', inputs: abiParameters }
  }

  if (isErrorSignature(signature)) {
    const match = execErrorSignature(signature)
    if (!match) throw new InvalidSignatureError({ signature, type: 'error' })

    const params = splitParameters(match.parameters)
    const abiParameters = []
    const length = params.length
    for (let i = 0; i < length; i++) {
      abiParameters.push(
        parseAbiParameter(params[i]!, { structs, type: 'error' }),
      )
    }
    return { name: match.name, type: 'error', inputs: abiParameters }
  }

  if (isConstructorSignature(signature)) {
    const match = execConstructorSignature(signature)
    if (!match)
      throw new InvalidSignatureError({ signature, type: 'constructor' })

    const params = splitParameters(match.parameters)
    const abiParameters = []
    const length = params.length
    for (let i = 0; i < length; i++) {
      abiParameters.push(
        parseAbiParameter(params[i]!, { structs, type: 'constructor' }),
      )
    }
    return {
      type: 'constructor',
      stateMutability: match.stateMutability ?? 'nonpayable',
      inputs: abiParameters,
    }
  }

  if (isFallbackSignature(signature)) return { type: 'fallback' }
  if (isReceiveSignature(signature))
    return {
      type: 'receive',
      stateMutability: 'payable',
    }

  throw new UnknownSignatureError({ signature })
}

const abiParameterWithoutTupleRegex =
  /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/
const abiParameterWithTupleRegex =
  /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/
const dynamicIntegerRegex = /^u?int$/

type ParseOptions = {
  modifiers?: Set<Modifier>
  structs?: StructLookup
  type?: AbiItemType | 'struct'
}

export function parseAbiParameter(param: string, options?: ParseOptions) {
  // optional namespace cache by `type`
  const parameterCacheKey = getParameterCacheKey(param, options?.type)
  if (parameterCache.has(parameterCacheKey))
    return parameterCache.get(parameterCacheKey)!

  const isTuple = isTupleRegex.test(param)
  const match = execTyped<{
    array?: string
    modifier?: Modifier
    name?: string
    type: string
  }>(
    isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex,
    param,
  )
  if (!match) throw new InvalidParameterError({ param })

  if (match.name && isSolidityKeyword(match.name))
    throw new SolidityProtectedKeywordError({ param, name: match.name })

  const name = match.name ? { name: match.name } : {}
  const indexed = match.modifier === 'indexed' ? { indexed: true } : {}
  const structs = options?.structs ?? {}
  let type: string
  let components = {}
  if (isTuple) {
    type = 'tuple'
    const params = splitParameters(match.type)
    const components_ = []
    const length = params.length
    for (let i = 0; i < length; i++) {
      // remove `modifiers` from `options` to prevent from being added to tuple components
      components_.push(parseAbiParameter(params[i]!, { structs }))
    }
    components = { components: components_ }
  } else if (match.type in structs) {
    type = 'tuple'
    components = { components: structs[match.type] }
  } else if (dynamicIntegerRegex.test(match.type)) {
    type = `${match.type}256`
  } else {
    type = match.type
    if (!(options?.type === 'struct') && !isSolidityType(type))
      throw new UnknownSolidityTypeError({ type })
  }

  if (match.modifier) {
    // Check if modifier exists, but is not allowed (e.g. `indexed` in `functionModifiers`)
    if (!options?.modifiers?.has?.(match.modifier))
      throw new InvalidModifierError({
        param,
        type: options?.type,
        modifier: match.modifier,
      })

    // Check if resolved `type` is valid if there is a function modifier
    if (
      functionModifiers.has(match.modifier as FunctionModifier) &&
      !isValidDataLocation(type, !!match.array)
    )
      throw new InvalidFunctionModifierError({
        param,
        type: options?.type,
        modifier: match.modifier,
      })
  }

  const abiParameter = {
    type: `${type}${match.array ?? ''}`,
    ...name,
    ...indexed,
    ...components,
  }
  parameterCache.set(parameterCacheKey, abiParameter)
  return abiParameter
}

// s/o latika for this
export function splitParameters(
  params: string,
  result: string[] = [],
  current = '',
  depth = 0,
): readonly string[] {
  const length = params.trim().length
  // biome-ignore lint/correctness/noUnreachable: recursive
  for (let i = 0; i < length; i++) {
    const char = params[i]
    const tail = params.slice(i + 1)
    switch (char) {
      case ',':
        return depth === 0
          ? splitParameters(tail, [...result, current.trim()])
          : splitParameters(tail, result, `${current}${char}`, depth)
      case '(':
        return splitParameters(tail, result, `${current}${char}`, depth + 1)
      case ')':
        return splitParameters(tail, result, `${current}${char}`, depth - 1)
      default:
        return splitParameters(tail, result, `${current}${char}`, depth)
    }
  }

  if (current === '') return result
  if (depth !== 0) throw new InvalidParenthesisError({ current, depth })

  result.push(current.trim())
  return result
}

export function isSolidityType(
  type: string,
): type is Exclude<AbiType, SolidityTuple | SolidityArray> {
  return (
    type === 'address' ||
    type === 'bool' ||
    type === 'function' ||
    type === 'string' ||
    bytesRegex.test(type) ||
    integerRegex.test(type)
  )
}

const protectedKeywordsRegex =
  /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/

/** @internal */
export function isSolidityKeyword(name: string) {
  return (
    name === 'address' ||
    name === 'bool' ||
    name === 'function' ||
    name === 'string' ||
    name === 'tuple' ||
    bytesRegex.test(name) ||
    integerRegex.test(name) ||
    protectedKeywordsRegex.test(name)
  )
}

/** @internal */
export function isValidDataLocation(
  type: string,
  isArray: boolean,
): type is Exclude<
  AbiType,
  SolidityString | Extract<SolidityBytes, 'bytes'> | SolidityArray
> {
  return isArray || type === 'bytes' || type === 'string' || type === 'tuple'
}
