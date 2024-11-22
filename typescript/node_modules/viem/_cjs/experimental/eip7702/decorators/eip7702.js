"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eip7702Actions = eip7702Actions;
const signAuthorization_js_1 = require("../actions/signAuthorization.js");
function eip7702Actions() {
    return (client) => {
        return {
            signAuthorization: (parameters) => (0, signAuthorization_js_1.signAuthorization)(client, parameters),
        };
    };
}
//# sourceMappingURL=eip7702.js.map