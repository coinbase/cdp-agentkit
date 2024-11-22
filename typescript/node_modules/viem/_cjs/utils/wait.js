"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = wait;
async function wait(time) {
    return new Promise((res) => setTimeout(res, time));
}
//# sourceMappingURL=wait.js.map