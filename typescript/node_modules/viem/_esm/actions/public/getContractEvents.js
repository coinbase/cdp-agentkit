import { getAbiItem, } from '../../utils/abi/getAbiItem.js';
import { getAction } from '../../utils/getAction.js';
import { getLogs, } from './getLogs.js';
/**
 * Returns a list of event logs emitted by a contract.
 *
 * - Docs: https://viem.sh/docs/actions/public/getContractEvents
 * - JSON-RPC Methods: [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)
 *
 * @param client - Client to use
 * @param parameters - {@link GetContractEventsParameters}
 * @returns A list of event logs. {@link GetContractEventsReturnType}
 *
 * @example
 * import { createClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getContractEvents } from 'viem/public'
 * import { wagmiAbi } from './abi'
 *
 * const client = createClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const logs = await getContractEvents(client, {
 *  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *  abi: wagmiAbi,
 *  eventName: 'Transfer'
 * })
 */
export async function getContractEvents(client, parameters) {
    const { abi, address, args, blockHash, eventName, fromBlock, toBlock, strict, } = parameters;
    const event = eventName
        ? getAbiItem({ abi, name: eventName })
        : undefined;
    const events = !event
        ? abi.filter((x) => x.type === 'event')
        : undefined;
    return getAction(client, getLogs, 'getLogs')({
        address,
        args,
        blockHash,
        event,
        events,
        fromBlock,
        toBlock,
        strict,
    });
}
//# sourceMappingURL=getContractEvents.js.map