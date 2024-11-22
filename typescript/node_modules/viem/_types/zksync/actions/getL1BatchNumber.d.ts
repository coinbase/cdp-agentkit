import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { Hex } from '../../types/misc.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
export type GetL1BatchNumberReturnType = Hex;
export declare function getL1BatchNumber<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>): Promise<GetL1BatchNumberReturnType>;
//# sourceMappingURL=getL1BatchNumber.d.ts.map