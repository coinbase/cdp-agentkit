"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpcRpcClient = exports.mainnetTrustedSetupPath = exports.ipc = void 0;
var ipc_js_1 = require("../clients/transports/ipc.js");
Object.defineProperty(exports, "ipc", { enumerable: true, get: function () { return ipc_js_1.ipc; } });
var trustedSetups_js_1 = require("./trustedSetups.js");
Object.defineProperty(exports, "mainnetTrustedSetupPath", { enumerable: true, get: function () { return trustedSetups_js_1.mainnetTrustedSetupPath; } });
var ipc_js_2 = require("../utils/rpc/ipc.js");
Object.defineProperty(exports, "getIpcRpcClient", { enumerable: true, get: function () { return ipc_js_2.getIpcRpcClient; } });
//# sourceMappingURL=index.js.map