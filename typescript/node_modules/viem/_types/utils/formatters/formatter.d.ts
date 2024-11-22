import type { ErrorType } from '../../errors/utils.js';
import type { Prettify } from '../../types/utils.js';
export type DefineFormatterErrorType = ErrorType;
export declare function defineFormatter<type extends string, parameters, returnType>(type: type, format: (_: parameters) => returnType): <parametersOverride, returnTypeOverride, exclude extends (keyof parameters | keyof parametersOverride)[] = []>({ exclude, format: overrides, }: {
    exclude?: exclude | undefined;
    format: (_: parametersOverride) => returnTypeOverride;
}) => {
    exclude: exclude | undefined;
    format: (args: parametersOverride) => Prettify<returnTypeOverride> & { [_key in exclude[number]]: never; };
    type: type;
};
//# sourceMappingURL=formatter.d.ts.map