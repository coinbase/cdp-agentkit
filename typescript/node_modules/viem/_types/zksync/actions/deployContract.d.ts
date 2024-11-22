import type { Abi } from 'abitype';
import type { Account } from '../../accounts/types.js';
import type { DeployContractParameters as DeployContractParameters_ } from '../../actions/wallet/deployContract.js';
import type { Client } from '../../clients/createClient.js';
import type { Transport } from '../../clients/transports/createTransport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { ContractConstructorArgs } from '../../types/contract.js';
import type { Hash, Hex } from '../../types/misc.js';
import type { ChainEIP712 } from '../types/chain.js';
import type { ContractDeploymentType } from '../types/contract.js';
import { type EncodeDeployDataErrorType } from '../utils/abi/encodeDeployData.js';
import { type SendEip712TransactionErrorType, type SendEip712TransactionReturnType } from './sendEip712Transaction.js';
export type DeployContractParameters<abi extends Abi | readonly unknown[] = Abi, chain extends ChainEIP712 | undefined = ChainEIP712 | undefined, account extends Account | undefined = Account | undefined, chainOverride extends ChainEIP712 | undefined = ChainEIP712 | undefined, allArgs = ContractConstructorArgs<abi>> = DeployContractParameters_<abi, chain, account, chainOverride, allArgs> & {
    deploymentType?: ContractDeploymentType;
    factoryDeps?: Hex[];
    salt?: Hash;
};
export type DeployContractReturnType = SendEip712TransactionReturnType;
export type DeployContractErrorType = EncodeDeployDataErrorType | SendEip712TransactionErrorType | ErrorType;
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
export declare function deployContract<const abi extends Abi | readonly unknown[], chain extends ChainEIP712 | undefined, account extends Account | undefined, chainOverride extends ChainEIP712 | undefined>(walletClient: Client<Transport, chain, account>, parameters: DeployContractParameters<abi, chain, account, chainOverride>): Promise<DeployContractReturnType>;
//# sourceMappingURL=deployContract.d.ts.map