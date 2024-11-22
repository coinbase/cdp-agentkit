"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletActions = walletActions;
const getChainId_js_1 = require("../../actions/public/getChainId.js");
const addChain_js_1 = require("../../actions/wallet/addChain.js");
const deployContract_js_1 = require("../../actions/wallet/deployContract.js");
const getAddresses_js_1 = require("../../actions/wallet/getAddresses.js");
const getPermissions_js_1 = require("../../actions/wallet/getPermissions.js");
const prepareTransactionRequest_js_1 = require("../../actions/wallet/prepareTransactionRequest.js");
const requestAddresses_js_1 = require("../../actions/wallet/requestAddresses.js");
const requestPermissions_js_1 = require("../../actions/wallet/requestPermissions.js");
const sendRawTransaction_js_1 = require("../../actions/wallet/sendRawTransaction.js");
const sendTransaction_js_1 = require("../../actions/wallet/sendTransaction.js");
const signMessage_js_1 = require("../../actions/wallet/signMessage.js");
const signTransaction_js_1 = require("../../actions/wallet/signTransaction.js");
const signTypedData_js_1 = require("../../actions/wallet/signTypedData.js");
const switchChain_js_1 = require("../../actions/wallet/switchChain.js");
const watchAsset_js_1 = require("../../actions/wallet/watchAsset.js");
const writeContract_js_1 = require("../../actions/wallet/writeContract.js");
function walletActions(client) {
    return {
        addChain: (args) => (0, addChain_js_1.addChain)(client, args),
        deployContract: (args) => (0, deployContract_js_1.deployContract)(client, args),
        getAddresses: () => (0, getAddresses_js_1.getAddresses)(client),
        getChainId: () => (0, getChainId_js_1.getChainId)(client),
        getPermissions: () => (0, getPermissions_js_1.getPermissions)(client),
        prepareTransactionRequest: (args) => (0, prepareTransactionRequest_js_1.prepareTransactionRequest)(client, args),
        requestAddresses: () => (0, requestAddresses_js_1.requestAddresses)(client),
        requestPermissions: (args) => (0, requestPermissions_js_1.requestPermissions)(client, args),
        sendRawTransaction: (args) => (0, sendRawTransaction_js_1.sendRawTransaction)(client, args),
        sendTransaction: (args) => (0, sendTransaction_js_1.sendTransaction)(client, args),
        signMessage: (args) => (0, signMessage_js_1.signMessage)(client, args),
        signTransaction: (args) => (0, signTransaction_js_1.signTransaction)(client, args),
        signTypedData: (args) => (0, signTypedData_js_1.signTypedData)(client, args),
        switchChain: (args) => (0, switchChain_js_1.switchChain)(client, args),
        watchAsset: (args) => (0, watchAsset_js_1.watchAsset)(client, args),
        writeContract: (args) => (0, writeContract_js_1.writeContract)(client, args),
    };
}
//# sourceMappingURL=wallet.js.map