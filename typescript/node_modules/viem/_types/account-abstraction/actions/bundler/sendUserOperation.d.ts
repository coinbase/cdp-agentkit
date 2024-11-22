import type { Address, Narrow } from 'abitype';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { Chain } from '../../../types/chain.js';
import type { Hex } from '../../../types/misc.js';
import type { Assign, MaybeRequired, OneOf } from '../../../types/utils.js';
import type { RequestErrorType } from '../../../utils/buildRequest.js';
import type { SmartAccount } from '../../accounts/types.js';
import type { PaymasterActions } from '../../clients/decorators/paymaster.js';
import type { DeriveSmartAccount, GetSmartAccountParameter } from '../../types/account.js';
import type { DeriveEntryPointVersion, EntryPointVersion } from '../../types/entryPointVersion.js';
import type { UserOperation, UserOperationCalls, UserOperationRequest } from '../../types/userOperation.js';
import { type FormatUserOperationRequestErrorType } from '../../utils/formatters/userOperationRequest.js';
import { type PrepareUserOperationErrorType } from './prepareUserOperation.js';
export type SendUserOperationParameters<account extends SmartAccount | undefined = SmartAccount | undefined, accountOverride extends SmartAccount | undefined = SmartAccount | undefined, calls extends readonly unknown[] = readonly unknown[], _derivedAccount extends SmartAccount | undefined = DeriveSmartAccount<account, accountOverride>, _derivedVersion extends EntryPointVersion = DeriveEntryPointVersion<_derivedAccount>> = GetSmartAccountParameter<account, accountOverride, false> & (UserOperation | Assign<UserOperationRequest<_derivedVersion>, OneOf<{
    calls: UserOperationCalls<Narrow<calls>>;
} | {
    callData: Hex;
}> & {
    paymaster?: Address | true | {
        /** Retrieves paymaster-related User Operation properties to be used for sending the User Operation. */
        getPaymasterData?: PaymasterActions['getPaymasterData'] | undefined;
        /** Retrieves paymaster-related User Operation properties to be used for gas estimation. */
        getPaymasterStubData?: PaymasterActions['getPaymasterStubData'] | undefined;
    } | undefined;
    /** Paymaster context to pass to `getPaymasterData` and `getPaymasterStubData` calls. */
    paymasterContext?: unknown | undefined;
}>) & MaybeRequired<{
    entryPointAddress?: Address;
}, _derivedAccount extends undefined ? true : false>;
export type SendUserOperationReturnType = Hex;
export type SendUserOperationErrorType = FormatUserOperationRequestErrorType | PrepareUserOperationErrorType | RequestErrorType | ErrorType;
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
export declare function sendUserOperation<const calls extends readonly unknown[], account extends SmartAccount | undefined, accountOverride extends SmartAccount | undefined = undefined>(client: Client<Transport, Chain | undefined, account>, parameters: SendUserOperationParameters<account, accountOverride, calls>): Promise<`0x${string}`>;
//# sourceMappingURL=sendUserOperation.d.ts.map