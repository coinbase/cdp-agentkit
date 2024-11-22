import { UnknownNodeError } from '../../errors/node.js';
import { TransactionExecutionError, } from '../../errors/transaction.js';
import { getNodeError, } from './getNodeError.js';
export function getTransactionError(err, { docsPath, ...args }) {
    const cause = (() => {
        const cause = getNodeError(err, args);
        if (cause instanceof UnknownNodeError)
            return err;
        return cause;
    })();
    return new TransactionExecutionError(cause, {
        docsPath,
        ...args,
    });
}
//# sourceMappingURL=getTransactionError.js.map