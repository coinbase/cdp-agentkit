import { versionedHashVersionKzg } from '../../constants/kzg.js';
import { maxUint256 } from '../../constants/number.js';
import { InvalidAddressError, } from '../../errors/address.js';
import { BaseError } from '../../errors/base.js';
import { EmptyBlobError, InvalidVersionedHashSizeError, InvalidVersionedHashVersionError, } from '../../errors/blob.js';
import { InvalidChainIdError, } from '../../errors/chain.js';
import { FeeCapTooHighError, TipAboveFeeCapError, } from '../../errors/node.js';
import { isAddress } from '../address/isAddress.js';
import { size } from '../data/size.js';
import { slice } from '../data/slice.js';
import { hexToNumber } from '../encoding/fromHex.js';
export function assertTransactionEIP7702(transaction) {
    const { authorizationList } = transaction;
    if (authorizationList) {
        for (const authorization of authorizationList) {
            const { contractAddress, chainId } = authorization;
            if (!isAddress(contractAddress))
                throw new InvalidAddressError({ address: contractAddress });
            if (chainId < 0)
                throw new InvalidChainIdError({ chainId });
        }
    }
    assertTransactionEIP1559(transaction);
}
export function assertTransactionEIP4844(transaction) {
    const { blobVersionedHashes } = transaction;
    if (blobVersionedHashes) {
        if (blobVersionedHashes.length === 0)
            throw new EmptyBlobError();
        for (const hash of blobVersionedHashes) {
            const size_ = size(hash);
            const version = hexToNumber(slice(hash, 0, 1));
            if (size_ !== 32)
                throw new InvalidVersionedHashSizeError({ hash, size: size_ });
            if (version !== versionedHashVersionKzg)
                throw new InvalidVersionedHashVersionError({
                    hash,
                    version,
                });
        }
    }
    assertTransactionEIP1559(transaction);
}
export function assertTransactionEIP1559(transaction) {
    const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
    if (chainId <= 0)
        throw new InvalidChainIdError({ chainId });
    if (to && !isAddress(to))
        throw new InvalidAddressError({ address: to });
    if (maxFeePerGas && maxFeePerGas > maxUint256)
        throw new FeeCapTooHighError({ maxFeePerGas });
    if (maxPriorityFeePerGas &&
        maxFeePerGas &&
        maxPriorityFeePerGas > maxFeePerGas)
        throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
export function assertTransactionEIP2930(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
    if (chainId <= 0)
        throw new InvalidChainIdError({ chainId });
    if (to && !isAddress(to))
        throw new InvalidAddressError({ address: to });
    if (maxPriorityFeePerGas || maxFeePerGas)
        throw new BaseError('`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.');
    if (gasPrice && gasPrice > maxUint256)
        throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
export function assertTransactionLegacy(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
    if (to && !isAddress(to))
        throw new InvalidAddressError({ address: to });
    if (typeof chainId !== 'undefined' && chainId <= 0)
        throw new InvalidChainIdError({ chainId });
    if (maxPriorityFeePerGas || maxFeePerGas)
        throw new BaseError('`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.');
    if (gasPrice && gasPrice > maxUint256)
        throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
//# sourceMappingURL=assertTransaction.js.map