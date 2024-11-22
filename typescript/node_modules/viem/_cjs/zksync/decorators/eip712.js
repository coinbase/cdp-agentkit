"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eip712WalletActions = eip712WalletActions;
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
const deployContract_js_1 = require("../actions/deployContract.js");
const sendTransaction_js_1 = require("../actions/sendTransaction.js");
const signTransaction_js_1 = require("../actions/signTransaction.js");
function eip712WalletActions() {
    return (client) => ({
        sendTransaction: (args) => (0, sendTransaction_js_1.sendTransaction)(client, args),
        signTransaction: (args) => (0, signTransaction_js_1.signTransaction)(client, args),
        deployContract: (args) => (0, deployContract_js_1.deployContract)(client, args),
        writeContract: (args) => (0, writeContract_js_1.writeContract)(Object.assign(client, {
            sendTransaction: (args) => (0, sendTransaction_js_1.sendTransaction)(client, args),
        }), args),
    });
}
//# sourceMappingURL=eip712.js.map