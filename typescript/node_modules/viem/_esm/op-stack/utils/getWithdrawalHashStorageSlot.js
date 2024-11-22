import { encodeAbiParameters, } from '../../utils/abi/encodeAbiParameters.js';
import { keccak256, } from '../../utils/hash/keccak256.js';
export function getWithdrawalHashStorageSlot({ withdrawalHash, }) {
    const data = encodeAbiParameters([{ type: 'bytes32' }, { type: 'uint256' }], [withdrawalHash, 0n]);
    return keccak256(data);
}
//# sourceMappingURL=getWithdrawalHashStorageSlot.js.map