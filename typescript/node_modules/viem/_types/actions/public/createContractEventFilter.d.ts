import type { Abi, Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { BlockNumber, BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
import type { ContractEventName, MaybeExtractEventArgsFromAbi } from '../../types/contract.js';
import type { Filter } from '../../types/filter.js';
import { type EncodeEventTopicsErrorType } from '../../utils/abi/encodeEventTopics.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import { type NumberToHexErrorType } from '../../utils/encoding/toHex.js';
export type CreateContractEventFilterParameters<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | undefined = undefined, args extends MaybeExtractEventArgsFromAbi<abi, eventName> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined> = {
    address?: Address | Address[] | undefined;
    abi: abi;
    eventName?: eventName | ContractEventName<abi> | undefined;
    fromBlock?: fromBlock | BlockNumber | BlockTag | undefined;
    /**
     * Whether or not the logs must match the indexed/non-indexed arguments in the event ABI item.
     * @default false
     */
    strict?: strict | boolean | undefined;
    toBlock?: toBlock | BlockNumber | BlockTag | undefined;
} & (undefined extends eventName ? {
    args?: undefined;
} : MaybeExtractEventArgsFromAbi<abi, eventName> extends infer eventFilterArgs ? {
    args?: eventFilterArgs | (args extends eventFilterArgs ? args : never) | undefined;
} : {
    args?: undefined;
});
export type CreateContractEventFilterReturnType<abi extends Abi | readonly unknown[] = Abi, eventName extends ContractEventName<abi> | undefined = undefined, args extends MaybeExtractEventArgsFromAbi<abi, eventName> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined> = Filter<'event', abi, eventName, args, strict, fromBlock, toBlock>;
export type CreateContractEventFilterErrorType = EncodeEventTopicsErrorType | RequestErrorType | NumberToHexErrorType | ErrorType;
/**
 * Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs).
 *
 * - Docs: https://viem.sh/docs/contract/createContractEventFilter
 *
 * @param client - Client to use
 * @param parameters - {@link CreateContractEventFilterParameters}
 * @returns [`Filter`](https://viem.sh/docs/glossary/types#filter). {@link CreateContractEventFilterReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { createContractEventFilter } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const filter = await createContractEventFilter(client, {
 *   abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']),
 * })
 */
export declare function createContractEventFilter<chain extends Chain | undefined, const abi extends Abi | readonly unknown[], eventName extends ContractEventName<abi> | undefined, args extends MaybeExtractEventArgsFromAbi<abi, eventName> | undefined, strict extends boolean | undefined = undefined, fromBlock extends BlockNumber | BlockTag | undefined = undefined, toBlock extends BlockNumber | BlockTag | undefined = undefined>(client: Client<Transport, chain>, parameters: CreateContractEventFilterParameters<abi, eventName, args, strict, fromBlock, toBlock>): Promise<CreateContractEventFilterReturnType<abi, eventName, args, strict, fromBlock, toBlock>>;
//# sourceMappingURL=createContractEventFilter.d.ts.map