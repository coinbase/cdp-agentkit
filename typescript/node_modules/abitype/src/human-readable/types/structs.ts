import type { AbiParameter } from '../../abi.js'
import type { Error, Trim } from '../../types.js'
import type { StructSignature } from './signatures.js'
import type { ParseAbiParameter } from './utils.js'

export type StructLookup = Record<string, readonly AbiParameter[]>

export type ParseStructs<signatures extends readonly string[]> =
  // Create "shallow" version of each struct (and filter out non-structs or invalid structs)
  {
    [signature in signatures[number] as ParseStruct<signature> extends infer struct extends
      {
        name: string
      }
      ? struct['name']
      : never]: ParseStruct<signature>['components']
  } extends infer structs extends Record<
    string,
    readonly (AbiParameter & { type: string })[]
  >
    ? // Resolve nested structs inside each struct
      {
        [structName in keyof structs]: ResolveStructs<
          structs[structName],
          structs
        >
      }
    : never

export type ParseStruct<
  signature extends string,
  structs extends StructLookup | unknown = unknown,
> = signature extends StructSignature<infer name, infer properties>
  ? {
      readonly name: Trim<name>
      readonly components: ParseStructProperties<properties, structs>
    }
  : never

export type ResolveStructs<
  abiParameters extends readonly (AbiParameter & { type: string })[],
  structs extends Record<string, readonly (AbiParameter & { type: string })[]>,
  keyReferences extends { [_: string]: unknown } | unknown = unknown,
> = readonly [
  ...{
    [key in keyof abiParameters]: abiParameters[key]['type'] extends `${infer head extends
      string & keyof structs}[${infer tail}]` // Struct arrays (e.g. `type: 'Struct[]'`, `type: 'Struct[10]'`, `type: 'Struct[][]'`)
      ? head extends keyof keyReferences
        ? Error<`Circular reference detected. Struct "${abiParameters[key]['type']}" is a circular reference.`>
        : {
            readonly name: abiParameters[key]['name']
            readonly type: `tuple[${tail}]`
            readonly components: ResolveStructs<
              structs[head],
              structs,
              keyReferences & { [_ in head]: true }
            >
          }
      : // Basic struct (e.g. `type: 'Struct'`)
        abiParameters[key]['type'] extends keyof structs
        ? abiParameters[key]['type'] extends keyof keyReferences
          ? Error<`Circular reference detected. Struct "${abiParameters[key]['type']}" is a circular reference.`>
          : {
              readonly name: abiParameters[key]['name']
              readonly type: 'tuple'
              readonly components: ResolveStructs<
                structs[abiParameters[key]['type']],
                structs,
                keyReferences & { [_ in abiParameters[key]['type']]: true }
              >
            }
        : abiParameters[key]
  },
]

export type ParseStructProperties<
  signature extends string,
  structs extends StructLookup | unknown = unknown,
  result extends any[] = [],
> = Trim<signature> extends `${infer head};${infer tail}`
  ? ParseStructProperties<
      tail,
      structs,
      [...result, ParseAbiParameter<head, { structs: structs }>]
    >
  : result
