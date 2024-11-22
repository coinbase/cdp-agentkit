import type { Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { AccountNotFoundError } from '../../errors/account.js';
import type { BaseError } from '../../errors/base.js';
import type { Account, GetAccountParameter } from '../../types/account.js';
import type { BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
export type GetL1BalanceParameters<account extends Account | undefined = Account | undefined> = GetAccountParameter<account> & {
    token?: Address | undefined;
} & ({
    /** The balance of the account at a block number. */
    blockNumber?: bigint | undefined;
    blockTag?: undefined;
} | {
    blockNumber?: undefined;
    /** The balance of the account at a block tag. */
    blockTag?: BlockTag | undefined;
});
export type GetL1BalanceReturnType = bigint;
export type GetL1BalanceErrorType = AccountNotFoundError | BaseError;
export declare function getL1Balance<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, ...[parameters]: account extends undefined ? [GetL1BalanceParameters<account>] : [GetL1BalanceParameters<account>] | []): Promise<GetL1BalanceReturnType>;
//# sourceMappingURL=getL1Balance.d.ts.map