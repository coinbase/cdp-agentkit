import { Eip712DomainNotFoundError, } from '../../errors/eip712.js';
import { getAction } from '../../utils/getAction.js';
import { readContract, } from './readContract.js';
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
export async function getEip712Domain(client, parameters) {
    const { address, factory, factoryData } = parameters;
    try {
        const [fields, name, version, chainId, verifyingContract, salt, extensions,] = await getAction(client, readContract, 'readContract')({
            abi,
            address,
            functionName: 'eip712Domain',
            factory,
            factoryData,
        });
        return {
            domain: {
                name,
                version,
                chainId: Number(chainId),
                verifyingContract,
                salt,
            },
            extensions,
            fields,
        };
    }
    catch (e) {
        const error = e;
        if (error.name === 'ContractFunctionExecutionError' &&
            error.cause.name === 'ContractFunctionZeroDataError') {
            throw new Eip712DomainNotFoundError({ address });
        }
        throw error;
    }
}
const abi = [
    {
        inputs: [],
        name: 'eip712Domain',
        outputs: [
            { name: 'fields', type: 'bytes1' },
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
            { name: 'salt', type: 'bytes32' },
            { name: 'extensions', type: 'uint256[]' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
//# sourceMappingURL=getEip712Domain.js.map