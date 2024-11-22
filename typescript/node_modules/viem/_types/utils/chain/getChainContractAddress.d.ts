import { type ChainDoesNotSupportContractErrorType } from '../../errors/chain.js';
import type { Chain } from '../../types/chain.js';
export type GetChainContractAddressErrorType = ChainDoesNotSupportContractErrorType;
export declare function getChainContractAddress({ blockNumber, chain, contract: name, }: {
    blockNumber?: bigint | undefined;
    chain: Chain;
    contract: string;
}): `0x${string}`;
//# sourceMappingURL=getChainContractAddress.d.ts.map