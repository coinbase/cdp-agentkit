import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { getChainId } from '../../actions/public/getChainId.js';
import { signTypedData } from '../../actions/wallet/signTypedData.js';
import { AccountNotFoundError } from '../../errors/account.js';
import { BaseError } from '../../errors/base.js';
import { assertCurrentChain } from '../../utils/chain/assertCurrentChain.js';
import { getAction } from '../../utils/getAction.js';
import { assertEip712Request, } from '../utils/assertEip712Request.js';
/**
 * Signs an EIP712 transaction.
 *
 * @param args - {@link SignTransactionParameters}
 * @returns The signed serialized transaction. {@link SignTransactionReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { zksync } from 'viem/chains'
 * import { signEip712Transaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   chain: zksync,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signEip712Transaction(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: 1n,
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { zksync } from 'viem/chains'
 * import { signEip712Transaction } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: zksync,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signEip712Transaction(client, {
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: 1n,
 * })
 */
export async function signEip712Transaction(client, args) {
    const { account: account_ = client.account, chain = client.chain, ...transaction } = args;
    if (!account_)
        throw new AccountNotFoundError({
            docsPath: '/docs/actions/wallet/signTransaction',
        });
    const account = parseAccount(account_);
    assertEip712Request({
        account,
        chain,
        ...args,
    });
    if (!chain?.custom?.getEip712Domain)
        throw new BaseError('`getEip712Domain` not found on chain.');
    if (!chain?.serializers?.transaction)
        throw new BaseError('transaction serializer not found on chain.');
    const chainId = await getAction(client, getChainId, 'getChainId')({});
    if (chain !== null)
        assertCurrentChain({
            currentChainId: chainId,
            chain: chain,
        });
    const eip712Domain = chain?.custom.getEip712Domain({
        ...transaction,
        chainId,
        from: account.address,
        type: 'eip712',
    });
    const customSignature = await signTypedData(client, {
        ...eip712Domain,
        account,
    });
    return chain?.serializers?.transaction({
        chainId,
        ...transaction,
        customSignature,
        type: 'eip712',
    }, { r: '0x0', s: '0x0', v: 0n });
}
//# sourceMappingURL=signEip712Transaction.js.map