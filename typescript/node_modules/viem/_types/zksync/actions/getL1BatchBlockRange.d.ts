import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
export type GetL1BatchBlockRangeParameters = {
    l1BatchNumber: number;
};
export type GetL1BatchBlockRangeReturnParameters = [number, number];
export declare function getL1BatchBlockRange<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>, parameters: GetL1BatchBlockRangeParameters): Promise<GetL1BatchBlockRangeReturnParameters>;
//# sourceMappingURL=getL1BatchBlockRange.d.ts.map