import { BaseError } from './base.js';
export class FilterTypeNotSupportedError extends BaseError {
    constructor(type) {
        super(`Filter type "${type}" is not supported.`, {
            name: 'FilterTypeNotSupportedError',
        });
    }
}
//# sourceMappingURL=log.js.map