import type { UrlRequiredErrorType } from '../../errors/transport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Hash } from '../../types/misc.js';
import type { RpcResponse } from '../../types/rpc.js';
import { type GetIpcRpcClientOptions, type IpcRpcClient } from '../../utils/rpc/ipc.js';
import { type CreateTransportErrorType, type Transport, type TransportConfig } from './createTransport.js';
type IpcTransportSubscribeParameters = {
    onData: (data: RpcResponse) => void;
    onError?: ((error: any) => void) | undefined;
};
type IpcTransportSubscribeReturnType = {
    subscriptionId: Hash;
    unsubscribe: () => Promise<RpcResponse<boolean>>;
};
type IpcTransportSubscribe = {
    subscribe(args: IpcTransportSubscribeParameters & {
        /**
         * @description Add information about compiled contracts
         * @link https://hardhat.org/hardhat-network/docs/reference#hardhat_addcompilationresult
         */
        params: ['newHeads'];
    }): Promise<IpcTransportSubscribeReturnType>;
};
export type IpcTransportConfig = {
    /** The key of the Ipc transport. */
    key?: TransportConfig['key'] | undefined;
    /** The name of the Ipc transport. */
    name?: TransportConfig['name'] | undefined;
    /**
     * Whether or not to attempt to reconnect on socket failure.
     * @default true
     */
    reconnect?: GetIpcRpcClientOptions['reconnect'] | undefined;
    /** The max number of times to retry. */
    retryCount?: TransportConfig['retryCount'] | undefined;
    /** The base delay (in ms) between retries. */
    retryDelay?: TransportConfig['retryDelay'] | undefined;
    /** The timeout (in ms) for async Ipc requests. Default: 10_000 */
    timeout?: TransportConfig['timeout'] | undefined;
};
export type IpcTransport = Transport<'ipc', {
    getRpcClient(): Promise<IpcRpcClient>;
    subscribe: IpcTransportSubscribe['subscribe'];
}>;
export type IpcTransportErrorType = CreateTransportErrorType | UrlRequiredErrorType | ErrorType;
/**
 * @description Creates an IPC transport that connects to a JSON-RPC API.
 */
export declare function ipc(path: string, config?: IpcTransportConfig): IpcTransport;
export {};
//# sourceMappingURL=ipc.d.ts.map