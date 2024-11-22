import { writeContract, } from '../../actions/wallet/writeContract.js';
import { portalAbi } from '../abis.js';
import { estimateProveWithdrawalGas, } from './estimateProveWithdrawalGas.js';
/**
 * Proves a withdrawal that occurred on an L2. Used in the Withdrawal flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/proveWithdrawal
 *
 * @param client - Client to use
 * @param parameters - {@link ProveWithdrawalParameters}
 * @returns The prove transaction hash. {@link ProveWithdrawalReturnType}
 *
 * @example
 * import { createWalletClient, http } from 'viem'
 * import { mainnet, optimism } from 'viem/chains'
 * import { proveWithdrawal } from 'viem/op-stack'
 *
 * const walletClientL1 = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const request = await proveWithdrawal(walletClientL1, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   l2OutputIndex: 4529n,
 *   outputRootProof: { ... },
 *   targetChain: optimism,
 *   withdrawalProof: [ ... ],
 *   withdrawal: { ... },
 * })
 */
export async function proveWithdrawal(client, parameters) {
    const { account, chain = client.chain, gas, l2OutputIndex, maxFeePerGas, maxPriorityFeePerGas, nonce, outputRootProof, targetChain, withdrawalProof, withdrawal, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const gas_ = typeof gas !== 'bigint' && gas !== null
        ? await estimateProveWithdrawalGas(client, parameters)
        : (gas ?? undefined);
    return writeContract(client, {
        account: account,
        abi: portalAbi,
        address: portalAddress,
        chain,
        functionName: 'proveWithdrawalTransaction',
        args: [withdrawal, l2OutputIndex, outputRootProof, withdrawalProof],
        gas: gas_,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
    });
}
//# sourceMappingURL=proveWithdrawal.js.map