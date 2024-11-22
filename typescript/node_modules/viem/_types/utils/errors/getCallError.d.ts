import type { CallParameters } from '../../actions/public/call.js';
import { type CallExecutionErrorType } from '../../errors/contract.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Chain } from '../../types/chain.js';
import { type GetNodeErrorReturnType } from './getNodeError.js';
export type GetCallErrorReturnType<cause = ErrorType> = Omit<CallExecutionErrorType, 'cause'> & {
    cause: cause | GetNodeErrorReturnType;
};
export declare function getCallError<err extends ErrorType<string>>(err: err, { docsPath, ...args }: CallParameters & {
    chain?: Chain | undefined;
    docsPath?: string | undefined;
}): GetCallErrorReturnType<err>;
//# sourceMappingURL=getCallError.d.ts.map