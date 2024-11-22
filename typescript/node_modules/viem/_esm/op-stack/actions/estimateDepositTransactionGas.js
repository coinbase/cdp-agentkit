import { estimateContractGas, } from '../../actions/public/estimateContractGas.js';
import { zeroAddress } from '../../constants/address.js';
import { portalAbi } from '../abis.js';
/**
 * Estimates gas required to initiate a [deposit transaction](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md) on an L1, which executes a transaction on L2.
 *
 * - Docs: https://viem.sh/op-stack/actions/estimateDepositTransactionGas
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateDepositTransactionGasParameters}
 * @returns The L1 transaction hash. {@link EstimateDepositTransactionGasReturnType}
 *
 * @example
 * import { createPublicClient, custom, parseEther } from 'viem'
 * import { base, mainnet } from 'viem/chains'
 * import { estimateDepositTransactionGas } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 *
 * const gas = await estimateDepositTransactionGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   args: {
 *     gas: 21_000n,
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *     value: parseEther('1'),
 *   },
 *   targetChain: base,
 * })
 */
export async function estimateDepositTransactionGas(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, request: { data = '0x', gas: l2Gas, isCreation = false, mint, to = '0x', value, }, targetChain, } = parameters;
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
        functionName: 'depositTransaction',
        args: [
            isCreation ? zeroAddress : to,
            value ?? mint ?? 0n,
            l2Gas,
            isCreation,
            data,
        ],
        gas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value: mint,
        // TODO: Not sure `chain` is necessary since it's not used downstream
        // in `estimateContractGas` or `estimateGas`
        // @ts-ignore
        chain,
    };
    return estimateContractGas(client, params);
}
//# sourceMappingURL=estimateDepositTransactionGas.js.map