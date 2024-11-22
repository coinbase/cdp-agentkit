import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { ZksyncNumberParameter } from '../types/block.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
import type { ZksyncRawBlockTransactions } from '../types/transaction.js';
export type GetRawBlockTransactionsParameters = ZksyncNumberParameter;
export type GetRawBlockTransactionsReturnType = ZksyncRawBlockTransactions;
export declare function getRawBlockTransactions<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>, parameters: GetRawBlockTransactionsParameters): Promise<GetRawBlockTransactionsReturnType>;
//# sourceMappingURL=getRawBlockTransactions.d.ts.map