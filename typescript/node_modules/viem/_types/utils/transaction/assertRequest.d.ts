import { type ParseAccountErrorType } from '../../accounts/utils/parseAccount.js';
import type { SendTransactionParameters } from '../../actions/wallet/sendTransaction.js';
import { type InvalidAddressErrorType } from '../../errors/address.js';
import { type FeeCapTooHighErrorType, type TipAboveFeeCapErrorType } from '../../errors/node.js';
import { type FeeConflictErrorType } from '../../errors/transaction.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import type { ExactPartial } from '../../types/utils.js';
export type AssertRequestParameters = ExactPartial<SendTransactionParameters<Chain>>;
export type AssertRequestErrorType = InvalidAddressErrorType | FeeConflictErrorType | FeeCapTooHighErrorType | ParseAccountErrorType | TipAboveFeeCapErrorType | ErrorType;
export declare function assertRequest(args: AssertRequestParameters): void;
//# sourceMappingURL=assertRequest.d.ts.map