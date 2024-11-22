import type { TypedData } from 'abitype';
import type { Account } from '../../accounts/types.js';
import { type ParseAccountErrorType } from '../../accounts/utils/parseAccount.js';
import type { SignTypedDataErrorType as SignTypedDataErrorType_account } from '../../accounts/utils/signTypedData.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import { type AccountNotFoundErrorType } from '../../errors/account.js';
import type { ErrorType } from '../../errors/utils.js';
import type { GetAccountParameter } from '../../types/account.js';
import type { Chain } from '../../types/chain.js';
import type { Hex } from '../../types/misc.js';
import type { TypedDataDefinition } from '../../types/typedData.js';
import type { RequestErrorType } from '../../utils/buildRequest.js';
import type { IsHexErrorType } from '../../utils/data/isHex.js';
import type { StringifyErrorType } from '../../utils/stringify.js';
import { type GetTypesForEIP712DomainErrorType, type SerializeTypedDataErrorType, type ValidateTypedDataErrorType } from '../../utils/typedData.js';
export type SignTypedDataParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData, account extends Account | undefined = undefined, primaryTypes = typedData extends TypedData ? keyof typedData : string> = TypedDataDefinition<typedData, primaryType, primaryTypes> & GetAccountParameter<account>;
export type SignTypedDataReturnType = Hex;
export type SignTypedDataErrorType = AccountNotFoundErrorType | ParseAccountErrorType | GetTypesForEIP712DomainErrorType | ValidateTypedDataErrorType | StringifyErrorType | SignTypedDataErrorType_account | IsHexErrorType | RequestErrorType | SerializeTypedDataErrorType | ErrorType;
/**
 * Signs typed data and calculates an Ethereum-specific signature in [https://eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712): `sign(keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(message)))`
 *
 * - Docs: https://viem.sh/docs/actions/wallet/signTypedData
 * - JSON-RPC Methods:
 *   - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data#signtypeddata-v4)
 *   - Local Accounts: Signs locally. No JSON-RPC request.
 *
 * @param client - Client to use
 * @param parameters - {@link SignTypedDataParameters}
 * @returns The signed data. {@link SignTypedDataReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { signTypedData } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signTypedData(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   types: {
 *     Person: [
 *       { name: 'name', type: 'string' },
 *       { name: 'wallet', type: 'address' },
 *     ],
 *     Mail: [
 *       { name: 'from', type: 'Person' },
 *       { name: 'to', type: 'Person' },
 *       { name: 'contents', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Mail',
 *   message: {
 *     from: {
 *       name: 'Cow',
 *       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
 *     },
 *     to: {
 *       name: 'Bob',
 *       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *     },
 *     contents: 'Hello, Bob!',
 *   },
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { signTypedData } from 'viem/wallet'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const signature = await signTypedData(client, {
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   types: {
 *     Person: [
 *       { name: 'name', type: 'string' },
 *       { name: 'wallet', type: 'address' },
 *     ],
 *     Mail: [
 *       { name: 'from', type: 'Person' },
 *       { name: 'to', type: 'Person' },
 *       { name: 'contents', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Mail',
 *   message: {
 *     from: {
 *       name: 'Cow',
 *       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
 *     },
 *     to: {
 *       name: 'Bob',
 *       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *     },
 *     contents: 'Hello, Bob!',
 *   },
 * })
 */
export declare function signTypedData<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain', chain extends Chain | undefined, account extends Account | undefined>(client: Client<Transport, chain, account>, parameters: SignTypedDataParameters<typedData, primaryType, account>): Promise<SignTypedDataReturnType>;
//# sourceMappingURL=signTypedData.d.ts.map