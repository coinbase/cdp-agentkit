import { hexToBigInt } from '../../../utils/encoding/fromHex.js';
import { receiptStatuses } from '../../../utils/formatters/transactionReceipt.js';
/**
 * Returns the status of a call batch that was sent via `sendCalls`.
 *
 * - Docs: https://viem.sh/experimental/eip5792/getCallsStatus
 * - JSON-RPC Methods: [`wallet_getCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)
 *
 * @param client - Client to use
 * @returns Status of the calls. {@link GetCallsStatusReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { getCallsStatus } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const { receipts, status } = await getCallsStatus(client, { id: '0xdeadbeef' })
 */
export async function getCallsStatus(client, parameters) {
    const { id } = parameters;
    const { receipts, status } = await client.request({
        method: 'wallet_getCallsStatus',
        params: [id],
    });
    return {
        status,
        receipts: receipts?.map((receipt) => ({
            ...receipt,
            blockNumber: hexToBigInt(receipt.blockNumber),
            gasUsed: hexToBigInt(receipt.gasUsed),
            status: receiptStatuses[receipt.status],
        })) ?? [],
    };
}
//# sourceMappingURL=getCallsStatus.js.map