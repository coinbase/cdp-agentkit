import { parseAccount, } from '../../accounts/utils/parseAccount.js';
import { encodeFunctionData, } from '../../utils/abi/encodeFunctionData.js';
import { getContractError, } from '../../utils/errors/getContractError.js';
import { estimateTotalGas, } from './estimateTotalGas.js';
/**
 * Estimates the L1 data gas + L2 gas required to successfully execute a contract write function call.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateContractTotalGasParameters}
 * @returns The gas estimate (in wei). {@link EstimateContractTotalGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateContractTotalGas } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const totalGas = await estimateContractTotalGas(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint() public']),
 *   functionName: 'mint',
 *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
 * })
 */
export async function estimateContractTotalGas(client, parameters) {
    const { abi, address, args, functionName, ...request } = parameters;
    const data = encodeFunctionData({
        abi,
        args,
        functionName,
    });
    try {
        const gas = await estimateTotalGas(client, {
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
            docsPath: '/docs/chains/op-stack/estimateTotalGas',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=estimateContractTotalGas.js.map