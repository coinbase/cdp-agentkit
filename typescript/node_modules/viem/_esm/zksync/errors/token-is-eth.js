import { BaseError } from '../../errors/base.js';
export class TokenIsEthError extends BaseError {
    constructor() {
        super(['Token is an ETH token.', '', 'ETH token cannot be retrieved.'].join('\n'), { name: 'TokenIsEthError' });
    }
}
//# sourceMappingURL=token-is-eth.js.map