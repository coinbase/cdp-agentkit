export class ProviderRpcError extends Error {
    constructor(code, message) {
        super(message);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = code;
        this.details = message;
    }
}
//# sourceMappingURL=eip1193.js.map