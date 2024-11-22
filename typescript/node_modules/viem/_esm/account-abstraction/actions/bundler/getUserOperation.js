import { UserOperationNotFoundError, } from '../../errors/userOperation.js';
import { formatUserOperation } from '../../utils/formatters/userOperation.js';
/**
 * Retrieves information about a User Operation given a hash.
 *
 * - Docs: https://viem.sh/docs/actions/bundler/getUserOperation
 *
 * @param client - Client to use
 * @param parameters - {@link GetUserOperationParameters}
 * @returns The receipt. {@link GetUserOperationReturnType}
 *
 * @example
 * import { createBundlerClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getUserOperation } from 'viem/actions
 *
 * const client = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const receipt = await getUserOperation(client, {
 *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
 * })
 */
export async function getUserOperation(client, { hash }) {
    const result = await client.request({
        method: 'eth_getUserOperationByHash',
        params: [hash],
    }, { dedupe: true });
    if (!result)
        throw new UserOperationNotFoundError({ hash });
    const { blockHash, blockNumber, entryPoint, transactionHash, userOperation } = result;
    return {
        blockHash,
        blockNumber: BigInt(blockNumber),
        entryPoint,
        transactionHash,
        userOperation: formatUserOperation(userOperation),
    };
}
//# sourceMappingURL=getUserOperation.js.map