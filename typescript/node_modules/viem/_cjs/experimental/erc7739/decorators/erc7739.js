"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erc7739Actions = erc7739Actions;
const signMessage_js_1 = require("../actions/signMessage.js");
const signTypedData_js_1 = require("../actions/signTypedData.js");
function erc7739Actions(parameters = {}) {
    const { verifier } = parameters;
    return (client) => {
        return {
            signMessage: (parameters) => (0, signMessage_js_1.signMessage)(client, { verifier, ...parameters }),
            signTypedData: (parameters) => (0, signTypedData_js_1.signTypedData)(client, { verifier, ...parameters }),
        };
    };
}
//# sourceMappingURL=erc7739.js.map