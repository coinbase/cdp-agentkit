import { numberToHex } from '../../utils/encoding/toHex.js';
/**
 * Sets the next block's base fee per gas.
 *
 * - Docs: https://viem.sh/docs/actions/test/setNextBlockBaseFeePerGas
 *
 * @param client - Client to use
 * @param parameters – {@link SetNextBlockBaseFeePerGasParameters}
 *
 * @example
 * import { createTestClient, http, parseGwei } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setNextBlockBaseFeePerGas } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setNextBlockBaseFeePerGas(client, {
 *   baseFeePerGas: parseGwei('20'),
 * })
 */
export async function setNextBlockBaseFeePerGas(client, { baseFeePerGas }) {
    await client.request({
        method: `${client.mode}_setNextBlockBaseFeePerGas`,
        params: [numberToHex(baseFeePerGas)],
    });
}
//# sourceMappingURL=setNextBlockBaseFeePerGas.js.map