import type { Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { Account, GetAccountParameter } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { PublicZksyncRpcSchema } from '../types/eip1193.js';
export type GetAllBalancesParameters<account extends Account | undefined = Account | undefined> = GetAccountParameter<account>;
export type GetAllBalancesReturnType = {
    [key: Address]: bigint;
};
export declare function getAllBalances<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account, PublicZksyncRpcSchema>, parameters: GetAllBalancesParameters<account>): Promise<GetAllBalancesReturnType>;
//# sourceMappingURL=getAllBalances.d.ts.map