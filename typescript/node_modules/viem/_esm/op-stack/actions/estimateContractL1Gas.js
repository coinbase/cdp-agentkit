import { parseAccount, } from '../../accounts/utils/parseAccount.js';
import { encodeFunctionData, } from '../../utils/abi/encodeFunctionData.js';
import { getContractError, } from '../../utils/errors/getContractError.js';
import { estimateL1Gas, } from './estimateL1Gas.js';
/**
 * Estimates the L1 data gas required to successfully execute a contract write function call.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateContractL1GasParameters}
 * @returns The gas estimate (in wei). {@link EstimateContractL1GasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateContractL1Gas } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const l1Gas = await estimateContractL1Gas(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint() public']),
 *   functionName: 'mint',
 *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
 * })
 */
export async function estimateContractL1Gas(client, parameters) {
    const { abi, address, args, functionName, ...request } = parameters;
    const data = encodeFunctionData({
        abi,
        args,
        functionName,
    });
    try {
        const gas = await estimateL1Gas(client, {
            data,
            to: address,
            ...request,
        });
        return gas;
    }
    catch (error) {
        const account = request.account ? parseAccount(request.account) : undefined;
        throw getContractError(error, {
            abi,
            address,
            args,
            docsPath: '/docs/chains/op-stack/estimateContractL1Gas',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=estimateContractL1Gas.js.map