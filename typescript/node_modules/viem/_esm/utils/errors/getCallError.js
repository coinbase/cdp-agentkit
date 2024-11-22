import { CallExecutionError, } from '../../errors/contract.js';
import { UnknownNodeError } from '../../errors/node.js';
import { getNodeError, } from './getNodeError.js';
export function getCallError(err, { docsPath, ...args }) {
    const cause = (() => {
        const cause = getNodeError(err, args);
        if (cause instanceof UnknownNodeError)
            return err;
        return cause;
    })();
    return new CallExecutionError(cause, {
        docsPath,
        ...args,
    });
}
//# sourceMappingURL=getCallError.js.map