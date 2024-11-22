import { EstimateGasExecutionError, } from '../../errors/estimateGas.js';
import { UnknownNodeError } from '../../errors/node.js';
import { getNodeError, } from './getNodeError.js';
export function getEstimateGasError(err, { docsPath, ...args }) {
    const cause = (() => {
        const cause = getNodeError(err, args);
        if (cause instanceof UnknownNodeError)
            return err;
        return cause;
    })();
    return new EstimateGasExecutionError(cause, {
        docsPath,
        ...args,
    });
}
//# sourceMappingURL=getEstimateGasError.js.map