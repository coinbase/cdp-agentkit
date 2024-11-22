import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Hash } from '../../../types/misc.js';
import type { Prettify } from '../../../types/utils.js';
import { type ObserveErrorType } from '../../../utils/observe.js';
import { type PollErrorType } from '../../../utils/poll.js';
import { type WaitForUserOperationReceiptTimeoutErrorType } from '../../errors/userOperation.js';
import type { UserOperationReceipt } from '../../types/userOperation.js';
export type WaitForUserOperationReceiptParameters = {
    /** The hash of the User Operation. */
    hash: Hash;
    /**
     * Polling frequency (in ms). Defaults to the client's pollingInterval config.
     * @default client.pollingInterval
     */
    pollingInterval?: number | undefined;
    /**
     * The number of times to retry.
     * @default 6
     */
    retryCount?: number | undefined;
    /** Optional timeout (in ms) to wait before stopping polling. */
    timeout?: number | undefined;
};
export type WaitForUserOperationReceiptReturnType = Prettify<UserOperationReceipt>;
export type WaitForUserOperationReceiptErrorType = WaitForUserOperationReceiptTimeoutErrorType | PollErrorType | ObserveErrorType | ErrorType;
/**
 * Waits for the User Operation to be included on a [Block](https://viem.sh/docs/glossary/terms#block) (one confirmation), and then returns the User Operation receipt.
 *
 * - Docs: https://viem.sh/docs/actions/bundler/waitForUserOperationReceipt
 *
 * @param client - Client to use
 * @param parameters - {@link WaitForUserOperationReceiptParameters}
 * @returns The receipt. {@link WaitForUserOperationReceiptReturnType}
 *
 * @example
 * import { createBundlerClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { waitForUserOperationReceipt } from 'viem/actions'
 *
 * const client = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const receipt = await waitForUserOperationReceipt(client, {
 *   hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
 * })
 */
export declare function waitForUserOperationReceipt(client: Client<Transport>, parameters: WaitForUserOperationReceiptParameters): Promise<WaitForUserOperationReceiptReturnType>;
//# sourceMappingURL=waitForUserOperationReceipt.d.ts.map