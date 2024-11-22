import { writeContract, } from '../../actions/wallet/writeContract.js';
import { zeroAddress } from '../../constants/address.js';
import { portalAbi } from '../abis.js';
import { estimateDepositTransactionGas, } from './estimateDepositTransactionGas.js';
/**
 * Initiates a [deposit transaction](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md) on an L1, which executes a transaction on L2.
 *
 * Internally performs a contract write to the [`depositTransaction` function](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L378)
 * on the [Optimism Portal contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol).
 *
 * - Docs: https://viem.sh/op-stack/actions/depositTransaction
 *
 * @param client - Client to use
 * @param parameters - {@link DepositTransactionParameters}
 * @returns The L1 transaction hash. {@link DepositTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom, parseEther } from 'viem'
 * import { base, mainnet } from 'viem/chains'
 * import { depositTransaction } from 'viem/op-stack'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 *
 * const hash = await depositTransaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   request: {
 *     gas: 21_000n,
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *     value: parseEther('1'),
 *   },
 *   targetChain: base,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { base, mainnet } from 'viem/chains'
 * import { depositTransaction } from 'viem/op-stack'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const hash = await depositTransaction(client, {
 *   request: {
 *     gas: 21_000n,
 *     to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *     value: parseEther('1'),
 *   },
 *   targetChain: base,
 * })
 */
export async function depositTransaction(client, parameters) {
    const { account, chain = client.chain, gas, maxFeePerGas, maxPriorityFeePerGas, nonce, request: { data = '0x', gas: l2Gas, isCreation = false, mint, to = '0x', value, }, targetChain, } = parameters;
    const portalAddress = (() => {
        if (parameters.portalAddress)
            return parameters.portalAddress;
        if (chain)
            return targetChain.contracts.portal[chain.id].address;
        return Object.values(targetChain.contracts.portal)[0].address;
    })();
    const gas_ = typeof gas !== 'number' && gas !== null
        ? await estimateDepositTransactionGas(client, parameters)
        : undefined;
    return writeContract(client, {
        account: account,
        abi: portalAbi,
        address: portalAddress,
        chain,
        functionName: 'depositTransaction',
        args: [
            isCreation ? zeroAddress : to,
            value ?? mint ?? 0n,
            l2Gas,
            isCreation,
            data,
        ],
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value: mint,
        gas: gas_,
    });
}
//# sourceMappingURL=depositTransaction.js.map