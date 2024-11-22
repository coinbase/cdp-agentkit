import { numberToHex } from '../../utils/encoding/toHex.js';
/**
 * Sets the block's gas limit.
 *
 * - Docs: https://viem.sh/docs/actions/test/setBlockGasLimit
 *
 * @param client - Client to use
 * @param parameters – {@link SetBlockGasLimitParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setBlockGasLimit } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setBlockGasLimit(client, { gasLimit: 420_000n })
 */
export async function setBlockGasLimit(client, { gasLimit }) {
    await client.request({
        method: 'evm_setBlockGasLimit',
        params: [numberToHex(gasLimit)],
    });
}
//# sourceMappingURL=setBlockGasLimit.js.map