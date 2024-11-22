import type { Address, TypedData, TypedDataDomain } from 'abitype';
import type { Account } from '../../../accounts/types.js';
import { type GetEip712DomainParameters } from '../../../actions/public/getEip712Domain.js';
import type { Client } from '../../../clients/createClient.js';
import type { Transport } from '../../../clients/transports/createTransport.js';
import type { ErrorType } from '../../../errors/utils.js';
import type { GetAccountParameter } from '../../../types/account.js';
import type { Chain } from '../../../types/chain.js';
import type { Hex } from '../../../types/misc.js';
import type { TypedDataDefinition } from '../../../types/typedData.js';
import type { OneOf, RequiredBy } from '../../../types/utils.js';
import type { GetVerifierParameter } from '../types.js';
export type SignTypedDataParameters<typedData extends TypedData | Record<string, unknown> = TypedData, primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData, account extends Account | undefined = undefined, accountOverride extends Account | undefined = undefined, verifier extends Address | undefined = Address | undefined, primaryTypes = typedData extends TypedData ? keyof typedData : string> = TypedDataDefinition<typedData, primaryType, primaryTypes> & Pick<GetEip712DomainParameters, 'factory' | 'factoryData'> & GetAccountParameter<account, accountOverride> & OneOf<{
    verifierDomain: RequiredBy<TypedDataDomain, 'chainId' | 'name' | 'verifyingContract' | 'salt' | 'version'>;
    fields: Hex;
    extensions: readonly bigint[];
    verifier?: undefined;
} | (GetVerifierParameter<verifier> & {
    verifierDomain?: RequiredBy<TypedDataDomain, 'chainId' | 'name' | 'verifyingContract' | 'salt' | 'version'> | undefined;
    fields?: Hex | undefined;
    extensions?: readonly bigint[] | undefined;
})>;
export type SignTypedDataReturnType = Hex;
export type SignTypedDataErrorType = ErrorType;
/**
 * Signs an [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed data message via [ERC-7739 `TypedDataSign` format](https://eips.ethereum.org/EIPS/eip-7702).
 *
 * This Action is suitable to sign messages for Smart Accounts that implement (or conform to) [ERC-7739](https://eips.ethereum.org/EIPS/eip-7702) (e.g. Solady's [ERC1271.sol](https://github.com/Vectorized/solady/blob/main/src/accounts/ERC1271.sol)).
 *
 * - Docs: https://viem.sh/experimental/erc7739/signTypedData
 *
 * @param client - Client to use
 * @param parameters - {@link SignTypedDataParameters}
 * @returns The signed data. {@link SignTypedDataReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { signTypedData } from 'viem/experimental/erc7739'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signTypedData(client, {
 *   account: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb',
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
 *   verifier: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, http } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { signTypedData } from 'viem/experimental/erc7739'
 *
 * const client = createWalletClient({
 *   account: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb'
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
 *   verifier: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 * })
 */
export declare function signTypedData<const typedData extends TypedData | Record<string, unknown>, primaryType extends keyof typedData | 'EIP712Domain', chain extends Chain | undefined, account extends Account | undefined, accountOverride extends Account | undefined = undefined>(client: Client<Transport, chain, account>, parameters: SignTypedDataParameters<typedData, primaryType, account, accountOverride>): Promise<SignTypedDataReturnType>;
//# sourceMappingURL=signTypedData.d.ts.map