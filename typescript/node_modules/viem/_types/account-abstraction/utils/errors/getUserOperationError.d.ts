import type { ErrorType } from '../../../errors/utils.js';
import { type UserOperationExecutionErrorType } from '../../errors/userOperation.js';
import type { UserOperation } from '../../types/userOperation.js';
type GetNodeErrorReturnType = ErrorType;
export type GetUserOperationErrorParameters = UserOperation & {
    calls?: readonly unknown[] | undefined;
    docsPath?: string | undefined;
};
export type GetUserOperationErrorReturnType<cause = ErrorType> = Omit<UserOperationExecutionErrorType, 'cause'> & {
    cause: cause | GetNodeErrorReturnType;
};
export type GetUserOperationErrorErrorType = ErrorType;
export declare function getUserOperationError<err extends ErrorType<string>>(err: err, { calls, docsPath, ...args }: GetUserOperationErrorParameters): GetUserOperationErrorReturnType<err>;
export {};
//# sourceMappingURL=getUserOperationError.d.ts.map