import type { TestClient, TestClientMode } from '../../clients/createTestClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
export type SetAutomineErrorType = RequestErrorType | ErrorType;
/**
 * Enables or disables the automatic mining of new blocks with each new transaction submitted to the network.
 *
 * - Docs: https://viem.sh/docs/actions/test/setAutomine
 *
 * @param client - Client to use
 *
 * @example
 * import { createTestClient, http } from 'viem'
 * import { foundry } from 'viem/chains'
 * import { setAutomine } from 'viem/test'
 *
 * const client = createTestClient({
 *   mode: 'anvil',
 *   chain: 'foundry',
 *   transport: http(),
 * })
 * await setAutomine(client)
 */
export declare function setAutomine<chain extends Chain | undefined, account extends Account | undefined>(client: TestClient<TestClientMode, Transport, chain, account, false>, enabled: boolean): Promise<void>;
//# sourceMappingURL=setAutomine.d.ts.map