import { signMessage, } from '../actions/signMessage.js';
import { signTypedData, } from '../actions/signTypedData.js';
/**
 * A suite of Actions based on [Solady contracts](https://github.com/Vectorized/solady).
 *
 * @example
 * import { createPublicClient, createWalletClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { erc7739Actions } from 'viem/experimental'
 *
 * const walletClient = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * }).extend(erc7739Actions())
 *
 * const result = await walletClient.signMessage({...})
 */
export function erc7739Actions(parameters = {}) {
    const { verifier } = parameters;
    return (client) => {
        return {
            signMessage: (parameters) => signMessage(client, { verifier, ...parameters }),
            signTypedData: (parameters) => signTypedData(client, { verifier, ...parameters }),
        };
    };
}
//# sourceMappingURL=erc7739.js.map