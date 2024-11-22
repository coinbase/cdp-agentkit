import type { Address } from 'abitype';
import type { ErrorType } from '../../errors/utils.js';
import type { Account } from '../types.js';
export type ParseAccountErrorType = ErrorType;
export declare function parseAccount<accountOrAddress extends Address | Account>(account: accountOrAddress): accountOrAddress extends Address ? Account : accountOrAddress;
//# sourceMappingURL=parseAccount.d.ts.map