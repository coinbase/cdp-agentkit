import * as Errors from './Errors.js'
import type * as RpcResponse from './RpcResponse.js'
import type * as RpcSchema from './RpcSchema.js'
import { getUrl } from './internal/errors.js'
import * as promise from './internal/promise.js'
import type * as RpcSchema_internal from './internal/rpcSchema.js'
import * as internal from './internal/rpcTransport.js'
import type { Compute } from './internal/types.js'

/** Root type for an RPC Transport. */
export type RpcTransport<
  raw extends boolean = false,
  options extends Record<string, unknown> = {},
  schema extends RpcSchema.Generic = RpcSchema.Default,
> = Compute<{
  request: RequestFn<raw, options, schema>
}>

/** HTTP-based RPC Transport. */
export type Http<
  raw extends boolean = false,
  schema extends RpcSchema.Generic = RpcSchema.Default,
> = RpcTransport<raw, HttpOptions, schema>

export type HttpOptions = {
  /** Request configuration to pass to `fetch`. */
  fetchOptions?:
    | Omit<RequestInit, 'body'>
    | ((
        method: RpcSchema.Generic['Request'],
      ) => Omit<RequestInit, 'body'> | Promise<Omit<RequestInit, 'body'>>)
    | undefined
  /** Function to use to make the request. @default fetch */
  fetchFn?: typeof fetch | undefined
  /** Timeout for the request in milliseconds. @default 10_000 */
  timeout?: number | undefined
}

export type RequestFn<
  raw extends boolean = false,
  options extends Record<string, unknown> = {},
  schema extends RpcSchema.Generic = RpcSchema.Default,
> = <
  methodName extends RpcSchema.MethodNameGeneric,
  raw_override extends boolean | undefined = undefined,
>(
  parameters: Compute<
    RpcSchema_internal.ExtractRequestOpaque<schema, methodName>
  >,
  options?: internal.Options<raw_override, options, schema> | undefined,
) => Promise<
  raw_override extends boolean
    ? raw_override extends true
      ? RpcResponse.RpcResponse<RpcSchema.ExtractReturnType<schema, methodName>>
      : RpcSchema.ExtractReturnType<schema, methodName>
    : raw extends true
      ? RpcResponse.RpcResponse<RpcSchema.ExtractReturnType<schema, methodName>>
      : RpcSchema.ExtractReturnType<schema, methodName>
>

/**
 * Creates a HTTP JSON-RPC Transport from a URL.
 *
 * @example
 * ```ts twoslash
 * import { RpcTransport } from 'ox'
 *
 * const transport = RpcTransport.fromHttp('https://1.rpc.thirdweb.com')
 *
 * const blockNumber = await transport.request({ method: 'eth_blockNumber' })
 * // @log: '0x1a2b3c'
 * ```
 *
 * @param url - URL to perform the JSON-RPC requests to.
 * @param options - Transport options.
 * @returns HTTP JSON-RPC Transport.
 */
export function fromHttp<
  raw extends boolean = false,
  schema extends RpcSchema.Generic = RpcSchema.Default,
>(url: string, options: fromHttp.Options<raw, schema> = {}): Http<raw, schema> {
  return internal.create<HttpOptions, schema, raw>(
    {
      async request(body_, options_) {
        const {
          fetchFn = options.fetchFn ?? fetch,
          fetchOptions: fetchOptions_ = options.fetchOptions,
          timeout = options.timeout ?? 10_000,
        } = options_

        const body = JSON.stringify(body_)

        const fetchOptions =
          typeof fetchOptions_ === 'function'
            ? await fetchOptions_(body_)
            : fetchOptions_

        const response = await promise.withTimeout(
          ({ signal }) => {
            const init: RequestInit = {
              ...fetchOptions,
              body,
              headers: {
                'Content-Type': 'application/json',
                ...fetchOptions?.headers,
              },
              method: fetchOptions?.method ?? 'POST',
              signal: fetchOptions?.signal ?? (timeout > 0 ? signal : null),
            }
            const request = new Request(url, init)
            return fetchFn(request)
          },
          {
            timeout,
            signal: true,
          },
        )

        const data = await (async () => {
          if (
            response.headers.get('Content-Type')?.startsWith('application/json')
          )
            return response.json()
          return response.text().then((data) => {
            try {
              return JSON.parse(data || '{}')
            } catch (err) {
              if (response.ok)
                throw new MalformedResponseError({
                  response: data,
                })
              return { error: data }
            }
          })
        })()

        if (!response.ok)
          throw new HttpError({
            body,
            details: JSON.stringify(data.error) ?? response.statusText,
            response,
            url,
          })

        return data as never
      },
    },
    { raw: options.raw },
  )
}

export declare namespace fromHttp {
  type Options<
    raw extends boolean = false,
    schema extends RpcSchema.Generic = RpcSchema.Default,
  > = internal.Options<raw, HttpOptions, schema>

  type ErrorType =
    | promise.withTimeout.ErrorType
    | HttpError
    | Errors.GlobalErrorType
}

fromHttp.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromHttp.ErrorType

/** Thrown when a HTTP request fails. */
export class HttpError extends Errors.BaseError {
  override readonly name = 'RpcTransport.HttpError'

  constructor({
    body,
    details,
    response,
    url,
  }: { body: unknown; details: string; response: Response; url: string }) {
    super('HTTP request failed.', {
      details,
      metaMessages: [
        `Status: ${response.status}`,
        `URL: ${getUrl(url)}`,
        body ? `Body: ${JSON.stringify(body)}` : undefined,
      ],
    })
  }
}

/** Thrown when a HTTP response is malformed. */
export class MalformedResponseError extends Errors.BaseError {
  override readonly name = 'RpcTransport.MalformedResponseError'

  constructor({ response }: { response: string }) {
    super('HTTP Response could not be parsed as JSON.', {
      metaMessages: [`Response: ${response}`],
    })
  }
}
