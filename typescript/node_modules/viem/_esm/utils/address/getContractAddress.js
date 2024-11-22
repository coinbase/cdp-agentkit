import { concat } from '../data/concat.js';
import { isBytes } from '../data/isBytes.js';
import { pad } from '../data/pad.js';
import { slice } from '../data/slice.js';
import { toBytes } from '../encoding/toBytes.js';
import { toRlp } from '../encoding/toRlp.js';
import { keccak256 } from '../hash/keccak256.js';
import { getAddress } from './getAddress.js';
export function getContractAddress(opts) {
    if (opts.opcode === 'CREATE2')
        return getCreate2Address(opts);
    return getCreateAddress(opts);
}
export function getCreateAddress(opts) {
    const from = toBytes(getAddress(opts.from));
    let nonce = toBytes(opts.nonce);
    if (nonce[0] === 0)
        nonce = new Uint8Array([]);
    return getAddress(`0x${keccak256(toRlp([from, nonce], 'bytes')).slice(26)}`);
}
export function getCreate2Address(opts) {
    const from = toBytes(getAddress(opts.from));
    const salt = pad(isBytes(opts.salt) ? opts.salt : toBytes(opts.salt), {
        size: 32,
    });
    const bytecodeHash = (() => {
        if ('bytecodeHash' in opts) {
            if (isBytes(opts.bytecodeHash))
                return opts.bytecodeHash;
            return toBytes(opts.bytecodeHash);
        }
        return keccak256(opts.bytecode, 'bytes');
    })();
    return getAddress(slice(keccak256(concat([toBytes('0xff'), from, salt, bytecodeHash])), 12));
}
//# sourceMappingURL=getContractAddress.js.map