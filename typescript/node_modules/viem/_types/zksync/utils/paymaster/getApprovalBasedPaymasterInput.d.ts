import type { Address } from 'abitype';
import type { ByteArray, Hex } from '../../../types/misc.js';
import { type EncodeFunctionDataReturnType } from '../../../utils/abi/encodeFunctionData.js';
export type GetApprovalBasedPaymasterInputParameters = {
    innerInput: Hex | ByteArray;
    minAllowance: bigint;
    token: Address;
};
export type GetApprovalBasedPaymasterInputReturnType = EncodeFunctionDataReturnType;
export declare function getApprovalBasedPaymasterInput(parameters: GetApprovalBasedPaymasterInputParameters): GetApprovalBasedPaymasterInputReturnType;
//# sourceMappingURL=getApprovalBasedPaymasterInput.d.ts.map