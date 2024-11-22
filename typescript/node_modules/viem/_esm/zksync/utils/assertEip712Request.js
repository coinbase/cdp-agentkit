import { assertRequest, } from '../../utils/transaction/assertRequest.js';
import { InvalidEip712TransactionError, } from '../errors/transaction.js';
import { isEIP712Transaction } from './isEip712Transaction.js';
export function assertEip712Request(args) {
    if (!isEIP712Transaction(args))
        throw new InvalidEip712TransactionError();
    assertRequest(args);
}
//# sourceMappingURL=assertEip712Request.js.map