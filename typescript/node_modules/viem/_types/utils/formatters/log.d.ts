import type { ErrorType } from '../../errors/utils.js';
import type { Log } from '../../types/log.js';
import type { RpcLog } from '../../types/rpc.js';
import type { ExactPartial } from '../../types/utils.js';
export type FormatLogErrorType = ErrorType;
export declare function formatLog(log: ExactPartial<RpcLog>, { args, eventName, }?: {
    args?: unknown | undefined;
    eventName?: string | undefined;
}): Log;
//# sourceMappingURL=log.d.ts.map