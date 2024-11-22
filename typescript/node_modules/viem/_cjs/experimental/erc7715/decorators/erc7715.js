"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erc7715Actions = erc7715Actions;
const grantPermissions_js_1 = require("../actions/grantPermissions.js");
function erc7715Actions() {
    return (client) => {
        return {
            grantPermissions: (parameters) => (0, grantPermissions_js_1.grantPermissions)(client, parameters),
        };
    };
}
//# sourceMappingURL=erc7715.js.map