import type * as RpcSchema from '../RpcSchema.js'

// biome-ignore lint/suspicious/noEmptyInterface:
export interface Register {}

export type ResolvedRegister = {
  RpcSchema: Register extends { RpcSchema: infer schema }
    ? schema
    : DefaultRegister['RpcSchema']
}

/** @internal */
export type DefaultRegister = {
  RpcSchema: RpcSchema.Eth | RpcSchema.Wallet
}
