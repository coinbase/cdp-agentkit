import type { Address } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { AccountNotFoundError } from '../../errors/account.js';
import type { BaseError } from '../../errors/base.js';
import type { Account, GetAccountParameter } from '../../types/account.js';
import type { BlockTag } from '../../types/block.js';
import type { Chain } from '../../types/chain.js';
export type GetL1AllowanceParameters<account extends Account | undefined = Account | undefined> = GetAccountParameter<account> & {
    bridgeAddress: Address;
    blockTag?: BlockTag;
    token: Address;
};
export type GetL1AllowanceReturnType = bigint;
export type GetL1AllowanceErrorType = AccountNotFoundError | BaseError;
export declare function getL1Allowance<chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: GetL1AllowanceParameters<account>): Promise<GetL1AllowanceReturnType>;
//# sourceMappingURL=getL1Allowance.d.ts.map