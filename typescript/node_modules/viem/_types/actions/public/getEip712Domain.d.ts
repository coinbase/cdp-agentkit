import type { Address, TypedDataDomain } from 'abitype';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import { type Eip712DomainNotFoundErrorType } from '../../errors/eip712.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Hex } from '../../types/misc.js';
import type { RequiredBy } from '../../types/utils.js';
import { type ReadContractErrorType, type ReadContractParameters } from './readContract.js';
export type GetEip712DomainParameters = {
    address: Address;
} & Pick<ReadContractParameters, 'factory' | 'factoryData'>;
export type GetEip712DomainReturnType = {
    domain: RequiredBy<TypedDataDomain, 'chainId' | 'name' | 'verifyingContract' | 'version'>;
    fields: Hex;
    extensions: readonly bigint[];
};
export type GetEip712DomainErrorType = Eip712DomainNotFoundErrorType | ReadContractErrorType | ErrorType;
/**
 * Reads the EIP-712 domain from a contract, based on the ERC-5267 specification.
 *
 * @param client - A {@link Client} instance.
 * @param parameters - The parameters of the action. {@link GetEip712DomainParameters}
 * @returns The EIP-712 domain, fields, and extensions. {@link GetEip712DomainReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http, getEip712Domain } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const domain = await getEip712Domain(client, {
 *   address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
 * })
 * // {
 * //   domain: {
 * //     name: 'ExampleContract',
 * //     version: '1',
 * //     chainId: 1,
 * //     verifyingContract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
 * //   },
 * //   fields: '0x0f',
 * //   extensions: [],
 * // }
 * ```
 */
export declare function getEip712Domain(client: Client<Transport>, parameters: GetEip712DomainParameters): Promise<GetEip712DomainReturnType>;
//# sourceMappingURL=getEip712Domain.d.ts.map