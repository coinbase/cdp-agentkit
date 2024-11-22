import type { ByteArray, Hex } from '../../../types/misc.js';
import { type EncodeFunctionDataReturnType } from '../../../utils/abi/encodeFunctionData.js';
export type GetGeneralPaymasterInputParameters = {
    innerInput: Hex | ByteArray;
};
export type GetGeneralPaymasterInputReturnType = EncodeFunctionDataReturnType;
export declare function getGeneralPaymasterInput(parameters: GetGeneralPaymasterInputParameters): GetGeneralPaymasterInputReturnType;
//# sourceMappingURL=getGeneralPaymasterInput.d.ts.map