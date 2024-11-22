import type { ErrorType } from '../../errors/utils.js';
import type { Proof } from '../../types/proof.js';
import type { RpcProof } from '../../types/rpc.js';
import type { ExactPartial } from '../../types/utils.js';
export type FormatProofErrorType = ErrorType;
export declare function formatProof(proof: ExactPartial<RpcProof>): Proof;
//# sourceMappingURL=proof.d.ts.map