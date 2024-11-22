import type { TestClient, TestClientMode } from '../../clients/createTestClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
export type SetBlockTimestampIntervalParameters = {
    /** The interval (in seconds). */
    interval: number;
};
export type SetBlockTimestampIntervalErrorType = RequestErrorType | ErrorType;
/**
 * Similar to [`increaseTime`](https://viem.sh/docs/actions/test/increaseTime), but sets a block timestamp `interval`. The timestamp of future blocks will be computed as `lastBlock_timestamp` + `interval`.
 *
 * - Docs: https://viem.sh/docs/actions/test/setBlockTimestampInterval
 *
 * @param client - Client to use
 * @param parameters – {@link SetBlockTimestampIntervalParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setBlockTimestampInterval } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setBlockTimestampInterval(client, { interval: 5 })
 */
export declare function setBlockTimestampInterval<chain extends Chain | undefined, account extends Account | undefined>(client: TestClient<TestClientMode, Transport, chain, account, false>, { interval }: SetBlockTimestampIntervalParameters): Promise<void>;
//# sourceMappingURL=setBlockTimestampInterval.d.ts.map