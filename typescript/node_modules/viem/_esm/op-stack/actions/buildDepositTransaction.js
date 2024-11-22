import { parseAccount, } from '../../accounts/utils/parseAccount.js';
import { prepareTransactionRequest, } from '../../actions/wallet/prepareTransactionRequest.js';
/**
 * Prepares parameters for a [deposit transaction](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md) to be initiated on an L1.
 *
 * - Docs: https://viem.sh/op-stack/actions/buildDepositTransaction
 *
 * @param client - Client to use
 * @param parameters - {@link BuildDepositTransactionParameters}
 * @returns Parameters for `depositTransaction`. {@link DepositTransactionReturnType}
 *
 * @example
 * import { createWalletClient, http, parseEther } from 'viem'
 * import { base } from 'viem/chains'
 * import { publicActionsL2 } from 'viem/op-stack'
 * import { buildDepositTransaction } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: base,
 *   transport: http(),
 * }).extend(publicActionsL2())
 *
 * const args = await buildDepositTransaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export async function buildDepositTransaction(client, args) {
    const { account: account_, chain = client.chain, gas, data, isCreation, mint, to, value, } = args;
    const account = account_ ? parseAccount(account_) : undefined;
    const request = await prepareTransactionRequest(client, {
        account: mint ? undefined : account,
        chain,
        gas,
        data,
        parameters: ['gas'],
        to,
        value,
    });
    return {
        account,
        request: {
            data: request.data,
            gas: request.gas,
            mint,
            isCreation,
            to: request.to,
            value: request.value,
        },
        targetChain: chain,
    };
}
//# sourceMappingURL=buildDepositTransaction.js.map