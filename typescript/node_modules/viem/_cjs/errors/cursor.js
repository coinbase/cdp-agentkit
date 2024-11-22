"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecursiveReadLimitExceededError = exports.PositionOutOfBoundsError = exports.NegativeOffsetError = void 0;
const base_js_1 = require("./base.js");
class NegativeOffsetError extends base_js_1.BaseError {
    constructor({ offset }) {
        super(`Offset \`${offset}\` cannot be negative.`, {
            name: 'NegativeOffsetError',
        });
    }
}
exports.NegativeOffsetError = NegativeOffsetError;
class PositionOutOfBoundsError extends base_js_1.BaseError {
    constructor({ length, position }) {
        super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: 'PositionOutOfBoundsError' });
    }
}
exports.PositionOutOfBoundsError = PositionOutOfBoundsError;
class RecursiveReadLimitExceededError extends base_js_1.BaseError {
    constructor({ count, limit }) {
        super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: 'RecursiveReadLimitExceededError' });
    }
}
exports.RecursiveReadLimitExceededError = RecursiveReadLimitExceededError;
//# sourceMappingURL=cursor.js.map