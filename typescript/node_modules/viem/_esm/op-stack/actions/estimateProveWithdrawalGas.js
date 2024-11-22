import { estimateContractGas, } from '../../actions/public/estimateContractGas.js';
import { portalAbi } from '../abis.js';
/**
 * Estimates gas required to prove a withdrawal that occurred on an L2.
 *
 * - Docs: https://viem.sh/op-stack/actions/estimateProveWithdrawalGas
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateProveWithdrawalGasParameters}
 * @returns Estimated gas. {@link EstimateProveWithdrawalGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { base, mainnet } from 'viem/chains'
 * import { estimateProveWithdrawalGas } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const gas = await estimateProveWithdrawalGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   l2OutputIndex: 4529n,
 *   outputRootProof: { ... },
 *   targetChain: optimism,
 *   withdrawalProof: [ ... ],
 *   withdrawal: { ... },
 * })
 */
export async function estimateProveWithdrawalGas(client, parameters) {
    const { account, chain = client.chain, gas, l2OutputIndex, maxFeePerGas, maxPriorityFeePerGas, nonce, outputRootProof, targetChain, withdrawalProof, withdrawal, } = parameters;
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
        functionName: 'proveWithdrawalTransaction',
        args: [withdrawal, l2OutputIndex, outputRootProof, withdrawalProof],
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
//# sourceMappingURL=estimateProveWithdrawalGas.js.map