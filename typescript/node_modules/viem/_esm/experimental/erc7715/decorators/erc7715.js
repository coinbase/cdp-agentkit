import { grantPermissions, } from '../actions/grantPermissions.js';
/**
 * A suite of ERC-7715 Wallet Actions.
 *
 * - Docs: https://viem.sh/experimental
 *
 * @example
 * import { createPublicClient, createWalletClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { erc7715Actions } from 'viem/experimental'
 *
 * const walletClient = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * }).extend(erc7715Actions())
 *
 * const result = await walletClient.grantPermissions({...})
 */
export function erc7715Actions() {
    return (client) => {
        return {
            grantPermissions: (parameters) => grantPermissions(client, parameters),
        };
    };
}
//# sourceMappingURL=erc7715.js.map