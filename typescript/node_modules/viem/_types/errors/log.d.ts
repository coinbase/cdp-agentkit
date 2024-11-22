import { BaseError } from './base.js';
export type FilterTypeNotSupportedErrorType = FilterTypeNotSupportedError & {
    name: 'FilterTypeNotSupportedError';
};
export declare class FilterTypeNotSupportedError extends BaseError {
    constructor(type: string);
}
//# sourceMappingURL=log.d.ts.map