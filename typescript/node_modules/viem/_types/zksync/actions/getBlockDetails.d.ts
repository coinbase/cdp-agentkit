import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { ZksyncBlockDetails, ZksyncNumberParameter } from '../types/block.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
export type GetBlockDetailsParameters = ZksyncNumberParameter;
export type GetBlockDetailsReturnType = ZksyncBlockDetails;
export declare function getBlockDetails<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>, parameters: GetBlockDetailsParameters): Promise<GetBlockDetailsReturnType>;
//# sourceMappingURL=getBlockDetails.d.ts.map