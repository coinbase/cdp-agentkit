import { UserOperationReceiptNotFoundError, } from '../../errors/userOperation.js';
import { formatUserOperationReceipt } from '../../utils/formatters/userOperationReceipt.js';
/**
 * Returns the User Operation Receipt given a User Operation hash.
 *
 * - Docs: https://viem.sh/docs/actions/bundler/getUserOperationReceipt
 *
 * @param client - Client to use
 * @param parameters - {@link GetUserOperationReceiptParameters}
 * @returns The receipt. {@link GetUserOperationReceiptReturnType}
 *
 * @example
 * import { createBundlerClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getUserOperationReceipt } from 'viem/actions
 *
 * const client = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const receipt = await getUserOperationReceipt(client, {
 *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
 * })
 */
export async function getUserOperationReceipt(client, { hash }) {
    const receipt = await client.request({
        method: 'eth_getUserOperationReceipt',
        params: [hash],
    }, { dedupe: true });
    if (!receipt)
        throw new UserOperationReceiptNotFoundError({ hash });
    return formatUserOperationReceipt(receipt);
}
//# sourceMappingURL=getUserOperationReceipt.js.map