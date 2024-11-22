/**
 * Serializes the current state (including contracts code, contract's storage,
 * accounts properties, etc.) into a savable data blob.
 *
 * - Docs: https://viem.sh/docs/actions/test/dumpState
 *
 * @param client - Client to use
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { dumpState } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await dumpState(client)
 */
export async function dumpState(client) {
    return client.request({
        method: `${client.mode}_dumpState`,
    });
}
//# sourceMappingURL=dumpState.js.map