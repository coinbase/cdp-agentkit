"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymasterActions = paymasterActions;
const getPaymasterData_js_1 = require("../../actions/paymaster/getPaymasterData.js");
const getPaymasterStubData_js_1 = require("../../actions/paymaster/getPaymasterStubData.js");
function paymasterActions(client) {
    return {
        getPaymasterData: (parameters) => (0, getPaymasterData_js_1.getPaymasterData)(client, parameters),
        getPaymasterStubData: (parameters) => (0, getPaymasterStubData_js_1.getPaymasterStubData)(client, parameters),
    };
}
//# sourceMappingURL=paymaster.js.map