import { presignMessagePrefix } from '../../constants/strings.js';
import { concat } from '../data/concat.js';
import { size } from '../data/size.js';
import { bytesToHex, stringToHex, } from '../encoding/toHex.js';
export function toPrefixedMessage(message_) {
    const message = (() => {
        if (typeof message_ === 'string')
            return stringToHex(message_);
        if (typeof message_.raw === 'string')
            return message_.raw;
        return bytesToHex(message_.raw);
    })();
    const prefix = stringToHex(`${presignMessagePrefix}${size(message)}`);
    return concat([prefix, message]);
}
//# sourceMappingURL=toPrefixedMessage.js.map