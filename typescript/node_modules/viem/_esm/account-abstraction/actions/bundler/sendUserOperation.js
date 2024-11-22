import { parseAccount } from '../../../accounts/utils/parseAccount.js';
import { AccountNotFoundError } from '../../../errors/account.js';
import { getAction } from '../../../utils/getAction.js';
import { getUserOperationError } from '../../utils/errors/getUserOperationError.js';
import { formatUserOperationRequest, } from '../../utils/formatters/userOperationRequest.js';
import { prepareUserOperation, } from './prepareUserOperation.js';
/**
 * Broadcasts a User Operation to the Bundler.
 *
 * - Docs: https://viem.sh/actions/bundler/sendUserOperation
 *
 * @param client - Client to use
 * @param parameters - {@link SendUserOperationParameters}
 * @returns The User Operation hash. {@link SendUserOperationReturnType}
 *
 * @example
 * import { createBundlerClient, http, parseEther } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { toSmartAccount } from 'viem/accounts'
 * import { sendUserOperation } from 'viem/actions'
 *
 * const account = await toSmartAccount({ ... })
 *
 * const bundlerClient = createBundlerClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const values = await sendUserOperation(bundlerClient, {
 *   account,
 *   calls: [{ to: '0x...', value: parseEther('1') }],
 * })
 */
export async function sendUserOperation(client, parameters) {
    const { account: account_ = client.account, entryPointAddress } = parameters;
    if (!account_ && !parameters.sender)
        throw new AccountNotFoundError();
    const account = account_ ? parseAccount(account_) : undefined;
    const request = account
        ? await getAction(client, prepareUserOperation, 'prepareUserOperation')(parameters)
        : parameters;
    const signature = (parameters.signature ||
        (await account?.signUserOperation(request)));
    const rpcParameters = formatUserOperationRequest({
        ...request,
        signature,
    });
    try {
        return await client.request({
            method: 'eth_sendUserOperation',
            params: [
                rpcParameters,
                (entryPointAddress ?? account?.entryPoint.address),
            ],
        }, { retryCount: 0 });
    }
    catch (error) {
        const calls = parameters.calls;
        throw getUserOperationError(error, {
            ...request,
            ...(calls ? { calls } : {}),
            signature,
        });
    }
}
//# sourceMappingURL=sendUserOperation.js.map