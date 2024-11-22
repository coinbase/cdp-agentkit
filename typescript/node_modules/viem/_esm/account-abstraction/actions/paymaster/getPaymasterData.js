import { hexToBigInt } from '../../../utils/encoding/fromHex.js';
import { numberToHex } from '../../../utils/encoding/toHex.js';
import { formatUserOperationRequest, } from '../../utils/formatters/userOperationRequest.js';
/**
 * Retrieves paymaster-related User Operation properties to be used for sending the User Operation.
 *
 * - Docs: https://viem.sh/account-abstraction/actions/paymaster/getPaymasterData
 *
 * @param client - Client to use
 * @param parameters - {@link GetPaymasterDataParameters}
 * @returns Paymaster-related User Operation properties. {@link GetPaymasterDataReturnType}
 *
 * @example
 * import { http } from 'viem'
 * import { createPaymasterClient, getPaymasterData } from 'viem/account-abstraction'
 *
 * const paymasterClient = createPaymasterClient({
 *   transport: http('https://...'),
 * })
 *
 * const userOperation = { ... }
 *
 * const values = await getPaymasterData(paymasterClient, {
 *   chainId: 1,
 *   entryPointAddress: '0x...',
 *   ...userOperation,
 * })
 */
export async function getPaymasterData(client, parameters) {
    const { chainId, entryPointAddress, context, ...userOperation } = parameters;
    const request = formatUserOperationRequest(userOperation);
    const { paymasterPostOpGasLimit, paymasterVerificationGasLimit, ...rest } = await client.request({
        method: 'pm_getPaymasterData',
        params: [
            {
                ...request,
                callGasLimit: request.callGasLimit ?? '0x0',
                verificationGasLimit: request.verificationGasLimit ?? '0x0',
                preVerificationGas: request.preVerificationGas ?? '0x0',
            },
            entryPointAddress,
            numberToHex(chainId),
            context,
        ],
    });
    return {
        ...rest,
        ...(paymasterPostOpGasLimit && {
            paymasterPostOpGasLimit: hexToBigInt(paymasterPostOpGasLimit),
        }),
        ...(paymasterVerificationGasLimit && {
            paymasterVerificationGasLimit: hexToBigInt(paymasterVerificationGasLimit),
        }),
    };
}
//# sourceMappingURL=getPaymasterData.js.map