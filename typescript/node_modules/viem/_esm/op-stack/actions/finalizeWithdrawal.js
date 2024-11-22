import { writeContract, } from '../../actions/wallet/writeContract.js';
import { portalAbi } from '../abis.js';
import { estimateFinalizeWithdrawalGas, } from './estimateFinalizeWithdrawalGas.js';
/**
 * Finalizes a withdrawal that occurred on an L2. Used in the Withdrawal flow.
 *
 * - Docs: https://viem.sh/op-stack/actions/finalizeWithdrawal
 *
 * @param client - Client to use
 * @param parameters - {@link FinalizeWithdrawalParameters}
 * @returns The finalize transaction hash. {@link FinalizeWithdrawalReturnType}
 *
 * @example
 * import { createWalletClient, http } from 'viem'
 * import { mainnet, optimism } from 'viem/chains'
 * import { finalizeWithdrawal } from 'viem/op-stack'
 *
 * const walletClientL1 = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const request = await finalizeWithdrawal(walletClientL1, {
 *   targetChain: optimism,
 *   withdrawal: { ... },
 * })
 */
export async function finalizeWithdrawal(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, targetChain, withdrawal, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const gas_ = typeof gas !== 'number' && gas !== null
        ? await estimateFinalizeWithdrawalGas(client, parameters)
        : undefined;
    return writeContract(client, {
        account: account,
        abi: portalAbi,
        address: portalAddress,
        chain,
        functionName: 'finalizeWithdrawalTransaction',
        args: [withdrawal],
        gas: gas_,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
    });
}
//# sourceMappingURL=finalizeWithdrawal.js.map