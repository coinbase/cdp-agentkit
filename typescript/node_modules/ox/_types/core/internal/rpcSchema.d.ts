import type { Generic, MethodNameGeneric } from '../RpcSchema.js';
import type { Compute, IsNarrowable } from './types.js';
/** @internal */
export type ExtractRequestOpaque<schema extends Generic, methodName extends MethodNameGeneric<schema> = MethodNameGeneric<schema>> = Compute<Omit<{
    method: methodName | schema['Request']['method'];
    params?: unknown;
} & (methodName extends schema['Request']['method'] ? IsNarrowable<schema, Generic> extends true ? Extract<schema, {
    Request: {
        method: methodName;
    };
}>['Request'] : {} : {}), ''>>;
//# sourceMappingURL=rpcSchema.d.ts.map