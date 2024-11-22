import { estimateContractGas, } from '../../actions/public/estimateContractGas.js';
import { portalAbi } from '../abis.js';
/**
 * Estimates gas required to finalize a withdrawal that occurred on an L2.
 *
 * - Docs: https://viem.sh/op-stack/actions/estimateFinalizeWithdrawalGas
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateFinalizeWithdrawalGasParameters}
 * @returns Estimated gas. {@link EstimateFinalizeWithdrawalGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { base, mainnet } from 'viem/chains'
 * import { estimateFinalizeWithdrawalGas } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const gas = await estimateFinalizeWithdrawalGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   targetChain: optimism,
 *   withdrawal: { ... },
 * })
 */
export async function estimateFinalizeWithdrawalGas(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, targetChain, withdrawal, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const params = {
        account,
        abi: portalAbi,
        address: portalAddress,
        functionName: 'finalizeWithdrawalTransaction',
        args: [withdrawal],
        gas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        // TODO: Not sure `chain` is necessary since it's not used downstream
        // in `estimateContractGas` or `estimateGas`
        // @ts-ignore
        chain,
    };
    return estimateContractGas(client, params);
}
//# sourceMappingURL=estimateFinalizeWithdrawalGas.js.map