import { parseAccount, } from '../../accounts/utils/parseAccount.js';
import { prepareTransactionRequest, } from '../../actions/wallet/prepareTransactionRequest.js';
/**
 * Prepares parameters for a [withdrawal](https://community.optimism.io/docs/protocol/withdrawal-flow/#withdrawal-initiating-transaction) from an L2 to the L1.
 *
 * - Docs: https://viem.sh/op-stack/actions/buildInitiateWithdrawal
 *
 * @param client - Client to use
 * @param parameters - {@link BuildInitiateWithdrawalParameters}
 * @returns Parameters for `depositTransaction`. {@link DepositTransactionReturnType}
 *
 * @example
 * import { createPublicClient, http, parseEther } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { buildInitiateWithdrawal } from 'viem/wallet'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const args = await buildInitiateWithdrawal(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: parseEther('1'),
 * })
 */
export async function buildInitiateWithdrawal(client, args) {
    const { account: account_, chain = client.chain, gas, data, to, value } = args;
    const account = account_ ? parseAccount(account_) : undefined;
    const request = await prepareTransactionRequest(client, {
        account: null,
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
            to: request.to,
            value: request.value,
        },
    };
}
//# sourceMappingURL=buildInitiateWithdrawal.js.map