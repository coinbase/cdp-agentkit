import type { ErrorType } from '../../errors/utils.js';
import type { ExactPartial } from '../../types/utils.js';
import { type AssertRequestErrorType } from '../../utils/transaction/assertRequest.js';
import type { zksync } from '../../zksync/chains.js';
import type { SendTransactionParameters } from '../actions/sendTransaction.js';
import { type InvalidEip712TransactionErrorType } from '../errors/transaction.js';
export type AssertEip712RequestParameters = ExactPartial<SendTransactionParameters<typeof zksync>>;
/** @internal */
export type AssertEip712RequestErrorType = InvalidEip712TransactionErrorType | AssertRequestErrorType | ErrorType;
export declare function assertEip712Request(args: AssertEip712RequestParameters): void;
//# sourceMappingURL=assertEip712Request.d.ts.map