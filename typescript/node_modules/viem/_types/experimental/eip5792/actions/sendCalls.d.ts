import type { AbiStateMutability, Address, Narrow } from 'abitype';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Account, GetAccountParameter } from '../../../types/account.js';
import type { Chain, DeriveChain } from '../../../types/chain.js';
import type { ContractFunctionParameters } from '../../../types/contract.js';
import type { WalletCapabilities, WalletSendCallsParameters } from '../../../types/eip1193.js';
import type { Hex } from '../../../types/misc.js';
import type { GetMulticallContractParameters } from '../../../types/multicall.js';
import type { MaybeRequired, OneOf, Prettify } from '../../../types/utils.js';
import type { RequestErrorType } from '../../../utils/buildRequest.js';
export type SendCallsParameters<chain extends Chain | undefined = Chain | undefined, account extends Account | undefined = Account | undefined, chainOverride extends Chain | undefined = Chain | undefined, calls extends readonly unknown[] = readonly unknown[], _chain extends Chain | undefined = DeriveChain<chain, chainOverride>> = {
    chain?: chainOverride | Chain | undefined;
    calls: Calls<Narrow<calls>, _chain>;
    capabilities?: WalletSendCallsParameters<WalletCapabilities>[number]['capabilities'] | undefined;
    version?: WalletSendCallsParameters[number]['version'] | undefined;
} & GetAccountParameter<account>;
export type SendCallsReturnType = string;
export type SendCallsErrorType = RequestErrorType | ErrorType;
/**
 * Requests the connected wallet to send a batch of calls.
 *
 * - Docs: https://viem.sh/experimental/eip5792/sendCalls
 * - JSON-RPC Methods: [`wallet_sendCalls`](https://eips.ethereum.org/EIPS/eip-5792)
 *
 * @param client - Client to use
 * @returns Transaction identifier. {@link SendCallsReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { sendCalls } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const id = await sendCalls(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   calls: [
 *     {
 *       data: '0xdeadbeef',
 *       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *     },
 *     {
 *       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *       value: 69420n,
 *     },
 *   ],
 * })
 */
export declare function sendCalls<const calls extends readonly unknown[], chain extends Chain | undefined, account extends Account | undefined = undefined, chainOverride extends Chain | undefined = undefined>(client: Client<Transport, chain, account>, parameters: SendCallsParameters<chain, account, chainOverride, calls>): Promise<SendCallsReturnType>;
type RawCall = {
    data?: Hex;
    to?: Address;
    value?: bigint;
};
type Call<chain extends Chain | undefined = Chain | undefined, contractFunctionParameters = Omit<ContractFunctionParameters, 'address'>> = OneOf<(contractFunctionParameters & {
    to: Address;
    value?: bigint | undefined;
}) | RawCall> & OneOf<MaybeRequired<{
    chain?: Chain | undefined;
}, chain extends Chain ? false : true> | MaybeRequired<{
    chainId?: number;
}, chain extends Chain ? false : true>>;
type Calls<calls extends readonly unknown[], chain extends Chain | undefined, result extends readonly any[] = []> = calls extends readonly [] ? readonly [] : calls extends readonly [infer call] ? readonly [
    ...result,
    Prettify<Call<chain, Omit<GetMulticallContractParameters<call, AbiStateMutability>, 'address'>>>
] : calls extends readonly [infer call, ...infer rest] ? Calls<[
    ...rest
], chain, [
    ...result,
    Prettify<Call<chain, Omit<GetMulticallContractParameters<call, AbiStateMutability>, 'address'>>>
]> : readonly unknown[] extends calls ? calls : calls extends readonly (infer call extends Call<chain, Omit<ContractFunctionParameters, 'address'>>)[] ? readonly Prettify<call>[] : readonly Call<chain, Omit<ContractFunctionParameters, 'address'>>[];
export {};
//# sourceMappingURL=sendCalls.d.ts.map