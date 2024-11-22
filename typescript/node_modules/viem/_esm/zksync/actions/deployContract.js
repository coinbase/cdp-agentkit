import { contractDeployerAddress } from '../constants/address.js';
import { encodeDeployData, } from '../utils/abi/encodeDeployData.js';
import { sendEip712Transaction, } from './sendEip712Transaction.js';
/**
 * Deploys a contract to the network, given bytecode and constructor arguments using EIP712 transaction.
 *
 * - Docs: https://viem.sh/docs/contract/deployContract
 *
 * @param client - Client to use
 * @param parameters - {@link DeployContractParameters}
 * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. {@link DeployContractReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { zksync } from 'viem/chains'
 * import { deployContract } from 'viem/zksync'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: zksync,
 *   transport: custom(provider),
 * })
 * const hash = await deployContract(client, {
 *   abi: [],
 *   account: '0x…,
 *   deploymentType: 'create',
 *   bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
 *   factoryDeps: ['0x608060405260405161083e38038061083e833981016040819052610...'],
 *   gasPerPubdata: 50000n
 * })
 */
export function deployContract(walletClient, parameters) {
    const { abi, args, bytecode, deploymentType, salt, ...request } = parameters;
    const data = encodeDeployData({
        abi,
        args,
        bytecode,
        deploymentType,
        salt,
    });
    // Add the bytecode to the factoryDeps if it's not already there
    request.factoryDeps = request.factoryDeps || [];
    if (!request.factoryDeps.includes(bytecode))
        request.factoryDeps.push(bytecode);
    return sendEip712Transaction(walletClient, {
        ...request,
        data,
        to: contractDeployerAddress,
    });
}
//# sourceMappingURL=deployContract.js.map