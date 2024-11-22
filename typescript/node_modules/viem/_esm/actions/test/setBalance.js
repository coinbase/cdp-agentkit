import { numberToHex } from '../../utils/encoding/toHex.js';
/**
 * Modifies the balance of an account.
 *
 * - Docs: https://viem.sh/docs/actions/test/setBalance
 *
 * @param client - Client to use
 * @param parameters – {@link SetBalanceParameters}
 *
 * @example
 * import { createTestClient, http, parseEther } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setBalance } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setBalance(client, {
 *   address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *   value: parseEther('1'),
 * })
 */
export async function setBalance(client, { address, value }) {
    if (client.mode === 'ganache')
        await client.request({
            method: 'evm_setAccountBalance',
            params: [address, numberToHex(value)],
        });
    else
        await client.request({
            method: `${client.mode}_setBalance`,
            params: [address, numberToHex(value)],
        });
}
//# sourceMappingURL=setBalance.js.map