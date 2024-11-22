import { encodeFunctionData, } from '../../../utils/abi/encodeFunctionData.js';
import { bytesToHex } from '../../../utils/encoding/toHex.js';
import { paymasterAbi } from '../../constants/abis.js';
export function getGeneralPaymasterInput(parameters) {
    const { innerInput } = parameters;
    const innerInputHex = typeof innerInput === 'string' ? innerInput : bytesToHex(innerInput);
    return encodeFunctionData({
        abi: paymasterAbi,
        functionName: 'general',
        args: [innerInputHex],
    });
}
//# sourceMappingURL=getGeneralPaymasterInput.js.map