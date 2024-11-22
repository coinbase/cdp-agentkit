import type { TestClient, TestClientMode } from '../../clients/createTestClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
export type MineParameters = {
    /** Number of blocks to mine. */
    blocks: number;
    /** Interval between each block in seconds. */
    interval?: number | undefined;
};
export type MineErrorType = RequestErrorType | ErrorType;
/**
 * Mine a specified number of blocks.
 *
 * - Docs: https://viem.sh/docs/actions/test/mine
 *
 * @param client - Client to use
 * @param parameters – {@link MineParameters}
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { mine } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await mine(client, { blocks: 1 })
 */
export declare function mine<chain extends Chain | undefined, account extends Account | undefined>(client: TestClient<TestClientMode, Transport, chain, account, false>, { blocks, interval }: MineParameters): Promise<void>;
//# sourceMappingURL=mine.d.ts.map