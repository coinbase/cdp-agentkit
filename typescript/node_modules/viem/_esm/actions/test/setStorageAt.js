import { numberToHex } from '../../utils/encoding/toHex.js';
/**
 * Writes to a slot of an account's storage.
 *
 * - Docs: https://viem.sh/docs/actions/test/setStorageAt
 *
 * @param client - Client to use
 * @param parameters – {@link SetStorageAtParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setStorageAt } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setStorageAt(client, {
 *   address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
 *   index: 2,
 *   value: '0x0000000000000000000000000000000000000000000000000000000000000069',
 * })
 */
export async function setStorageAt(client, { address, index, value }) {
    await client.request({
        method: `${client.mode}_setStorageAt`,
        params: [
            address,
            typeof index === 'number' ? numberToHex(index) : index,
            value,
        ],
    });
}
//# sourceMappingURL=setStorageAt.js.map