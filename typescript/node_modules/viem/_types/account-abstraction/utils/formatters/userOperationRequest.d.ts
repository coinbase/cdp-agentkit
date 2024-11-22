import type { ErrorType } from '../../../errors/utils.js';
import type { ExactPartial } from '../../../types/utils.js';
import type { RpcUserOperation } from '../../types/rpc.js';
import type { UserOperation } from '../../types/userOperation.js';
export type FormatUserOperationRequestErrorType = ErrorType;
export declare function formatUserOperationRequest(request: ExactPartial<UserOperation>): RpcUserOperation;
//# sourceMappingURL=userOperationRequest.d.ts.map