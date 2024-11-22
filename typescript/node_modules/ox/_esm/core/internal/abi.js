/** @internal */
export function isSignatures(value) {
    for (const item of value) {
        if (typeof item !== 'string')
            return false;
    }
    return true;
}
//# sourceMappingURL=abi.js.map