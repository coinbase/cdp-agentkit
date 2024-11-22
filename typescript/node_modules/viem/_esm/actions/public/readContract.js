import { decodeFunctionResult, } from '../../utils/abi/decodeFunctionResult.js';
import { encodeFunctionData, } from '../../utils/abi/encodeFunctionData.js';
import { getContractError, } from '../../utils/errors/getContractError.js';
import { getAction } from '../../utils/getAction.js';
import { call } from './call.js';
/**
 * Calls a read-only function on a contract, and returns the response.
 *
 * - Docs: https://viem.sh/docs/contract/readContract
 * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_reading-contracts
 *
 * A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.
 *
 * Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
 *
 * @param client - Client to use
 * @param parameters - {@link ReadContractParameters}
 * @returns The response from the contract. Type is inferred. {@link ReadContractReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { readContract } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const result = await readContract(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
 *   functionName: 'balanceOf',
 *   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
 * })
 * // 424122n
 */
export async function readContract(client, parameters) {
    const { abi, address, args, functionName, ...rest } = parameters;
    const calldata = encodeFunctionData({
        abi,
        args,
        functionName,
    });
    try {
        const { data } = await getAction(client, call, 'call')({
            ...rest,
            data: calldata,
            to: address,
        });
        return decodeFunctionResult({
            abi,
            args,
            functionName,
            data: data || '0x',
        });
    }
    catch (error) {
        throw getContractError(error, {
            abi,
            address,
            args,
            docsPath: '/docs/contract/readContract',
            functionName,
        });
    }
}
//# sourceMappingURL=readContract.js.map