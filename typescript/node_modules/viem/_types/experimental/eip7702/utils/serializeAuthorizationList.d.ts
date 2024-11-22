import type { ErrorType } from '../../../errors/utils.js';
import type { AuthorizationList, SerializedAuthorizationList } from '../types/authorization.js';
export type SerializeAuthorizationListReturnType = SerializedAuthorizationList;
export type SerializeAuthorizationListErrorType = ErrorType;
export declare function serializeAuthorizationList(authorizationList?: AuthorizationList<number, true> | undefined): SerializeAuthorizationListReturnType;
//# sourceMappingURL=serializeAuthorizationList.d.ts.map