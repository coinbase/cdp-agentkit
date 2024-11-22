import { numberToHex } from '../../utils/encoding/toHex.js';
/**
 * Modifies (overrides) the nonce of an account.
 *
 * - Docs: https://viem.sh/docs/actions/test/setNonce
 *
 * @param client - Client to use
 * @param parameters – {@link SetNonceParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setNonce } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setNonce(client, {
 *   address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *   nonce: 420,
 * })
 */
export async function setNonce(client, { address, nonce }) {
    await client.request({
        method: `${client.mode}_setNonce`,
        params: [address, numberToHex(nonce)],
    });
}
//# sourceMappingURL=setNonce.js.map