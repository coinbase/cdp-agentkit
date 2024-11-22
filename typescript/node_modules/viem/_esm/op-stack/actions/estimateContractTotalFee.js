import { parseAccount, } from '../../accounts/utils/parseAccount.js';
import { encodeFunctionData, } from '../../utils/abi/encodeFunctionData.js';
import { getContractError, } from '../../utils/errors/getContractError.js';
import { estimateTotalFee, } from './estimateTotalFee.js';
/**
 * Estimates the L1 data fee + L2 fee to execute an L2 contract write.
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateContractTotalFeeParameters}
 * @returns The gas estimate (in wei). {@link EstimateContractTotalFeeReturnType}
 *
 * @example
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { optimism } from 'viem/chains'
 * import { estimateContractTotalFee } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: optimism,
 *   transport: http(),
 * })
 * const totalFee = await estimateContractTotalFee(client, {
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi(['function mint() public']),
 *   functionName: 'mint',
 *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
 * })
 */
export async function estimateContractTotalFee(client, parameters) {
    const { abi, address, args, functionName, ...request } = parameters;
    const data = encodeFunctionData({
        abi,
        args,
        functionName,
    });
    try {
        const fee = await estimateTotalFee(client, {
            data,
            to: address,
            ...request,
        });
        return fee;
    }
    catch (error) {
        const account = request.account ? parseAccount(request.account) : undefined;
        throw getContractError(error, {
            abi,
            address,
            args,
            docsPath: '/docs/chains/op-stack/estimateTotalFee',
            functionName,
            sender: account?.address,
        });
    }
}
//# sourceMappingURL=estimateContractTotalFee.js.map