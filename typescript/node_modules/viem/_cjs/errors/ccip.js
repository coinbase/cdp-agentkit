"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffchainLookupSenderMismatchError = exports.OffchainLookupResponseMalformedError = exports.OffchainLookupError = void 0;
const stringify_js_1 = require("../utils/stringify.js");
const base_js_1 = require("./base.js");
const utils_js_1 = require("./utils.js");
class OffchainLookupError extends base_js_1.BaseError {
    constructor({ callbackSelector, cause, data, extraData, sender, urls, }) {
        super(cause.shortMessage ||
            'An error occurred while fetching for an offchain result.', {
            cause,
            metaMessages: [
                ...(cause.metaMessages || []),
                cause.metaMessages?.length ? '' : [],
                'Offchain Gateway Call:',
                urls && [
                    '  Gateway URL(s):',
                    ...urls.map((url) => `    ${(0, utils_js_1.getUrl)(url)}`),
                ],
                `  Sender: ${sender}`,
                `  Data: ${data}`,
                `  Callback selector: ${callbackSelector}`,
                `  Extra data: ${extraData}`,
            ].flat(),
            name: 'OffchainLookupError',
        });
    }
}
exports.OffchainLookupError = OffchainLookupError;
class OffchainLookupResponseMalformedError extends base_js_1.BaseError {
    constructor({ result, url }) {
        super('Offchain gateway response is malformed. Response data must be a hex value.', {
            metaMessages: [
                `Gateway URL: ${(0, utils_js_1.getUrl)(url)}`,
                `Response: ${(0, stringify_js_1.stringify)(result)}`,
            ],
            name: 'OffchainLookupResponseMalformedError',
        });
    }
}
exports.OffchainLookupResponseMalformedError = OffchainLookupResponseMalformedError;
class OffchainLookupSenderMismatchError extends base_js_1.BaseError {
    constructor({ sender, to }) {
        super('Reverted sender address does not match target contract address (`to`).', {
            metaMessages: [
                `Contract address: ${to}`,
                `OffchainLookup sender address: ${sender}`,
            ],
            name: 'OffchainLookupSenderMismatchError',
        });
    }
}
exports.OffchainLookupSenderMismatchError = OffchainLookupSenderMismatchError;
//# sourceMappingURL=ccip.js.map