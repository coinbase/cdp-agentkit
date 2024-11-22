import { estimateContractGas, } from '../../actions/public/estimateContractGas.js';
import { l2ToL1MessagePasserAbi } from '../abis.js';
import { contracts } from '../contracts.js';
/**
 * Estimates gas required to initiate a [withdrawal](https://community.optimism.io/docs/protocol/withdrawal-flow/#withdrawal-initiating-transaction) on an L2 to the L1.
 *
 * - Docs: https://viem.sh/op-stack/actions/estimateInitiateWithdrawalGas
 *
 * @param client - Client to use
 * @param parameters - {@link EstimateInitiateWithdrawalGasParameters}
 * @returns Estimated gas. {@link EstimateInitiateWithdrawalGasReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { base, mainnet } from 'viem/chains'
 * import { estimateInitiateWithdrawalGas } from 'viem/op-stack'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const gas = await estimateInitiateWithdrawalGas(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   request: {
 *     gas: 21_000n,
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *     value: parseEther('1'),
 *   },
 * })
 */
export async function estimateInitiateWithdrawalGas(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, request: { data = '0x', gas: l1Gas, to, value }, } = parameters;
    const params = {
        account,
        abi: l2ToL1MessagePasserAbi,
        address: contracts.l2ToL1MessagePasser.address,
        functionName: 'initiateWithdrawal',
        args: [to, l1Gas, data],
        gas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value,
        // TODO: Not sure `chain` is necessary since it's not used downstream
        // in `estimateContractGas` or `estimateGas`
        // @ts-ignore
        chain,
    };
    return estimateContractGas(client, params);
}
//# sourceMappingURL=estimateInitiateWithdrawalGas.js.map