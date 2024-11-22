/**
 * Modifies the bytecode stored at an account's address.
 *
 * - Docs: https://viem.sh/docs/actions/test/setCode
 *
 * @param client - Client to use
 * @param parameters – {@link SetCodeParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setCode } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setCode(client, {
 *   address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
 *   bytecode: '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df…',
 * })
 */
export async function setCode(client, { address, bytecode }) {
    if (client.mode === 'ganache')
        await client.request({
            method: 'evm_setAccountCode',
            params: [address, bytecode],
        });
    else
        await client.request({
            method: `${client.mode}_setCode`,
            params: [address, bytecode],
        });
}
//# sourceMappingURL=setCode.js.map