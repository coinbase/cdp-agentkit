import { parseAccount, } from '../../accounts/utils/parseAccount.js';
import { encodeFunctionData, } from '../../utils/abi/encodeFunctionData.js';
import { getContractError, } from '../../utils/errors/getContractError.js';
import { getAction } from '../../utils/getAction.js';
import { estimateGas, } from './estimateGas.js';
/**
 * Estimates the gas required to successfully execute a contract write function call.
 *
 * - Docs: https://viem.sh/docs/contract/estimateContractGas
 *
 * Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`estimateGas` action](https://viem.sh/docs/actions/public/estimateGas) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateContractGasParameters}
 * @returns The gas estimate (in wei). {@link EstimateContractGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { estimateContractGas } from 'viem/contract'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const gas = await estimateContractGas(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint() public']),
 *   functionName: 'mint',
 *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
 * })
 */
export async function estimateContractGas(client, parameters) {
    const { abi, address, args, functionName, ...request } = parameters;
    const data = encodeFunctionData({
        abi,
        args,
        functionName,
    });
    try {
        const gas = await getAction(client, estimateGas, 'estimateGas')({
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
            docsPath: '/docs/contract/estimateContractGas',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=estimateContractGas.js.map