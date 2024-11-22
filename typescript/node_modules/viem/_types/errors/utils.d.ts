import type { Address } from 'abitype';
export type ErrorType<name extends string = 'Error'> = Error & {
    name: name;
};
export declare const getContractAddress: (address: Address) => `0x${string}`;
export declare const getUrl: (url: string) => string;
//# sourceMappingURL=utils.d.ts.map