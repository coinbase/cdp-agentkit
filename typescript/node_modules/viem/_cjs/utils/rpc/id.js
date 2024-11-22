"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idCache = void 0;
function createIdStore() {
    return {
        current: 0,
        take() {
            return this.current++;
        },
        reset() {
            this.current = 0;
        },
    };
}
exports.idCache = createIdStore();
//# sourceMappingURL=id.js.map