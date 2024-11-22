import type { OneOf, Pretty } from './types.js'
import { version } from './version.js'

type BaseErrorArgs = Pretty<
  {
    docsPath?: string | undefined
    metaMessages?: string[] | undefined
  } & OneOf<{ details?: string | undefined } | { cause?: BaseError | Error }>
>

export class BaseError extends Error {
  details: string
  docsPath?: string | undefined
  metaMessages?: string[] | undefined
  shortMessage: string

  override name = 'AbiTypeError'

  constructor(shortMessage: string, args: BaseErrorArgs = {}) {
    const details =
      args.cause instanceof BaseError
        ? args.cause.details
        : args.cause?.message
          ? args.cause.message
          : args.details!
    const docsPath =
      args.cause instanceof BaseError
        ? args.cause.docsPath || args.docsPath
        : args.docsPath
    const message = [
      shortMessage || 'An error occurred.',
      '',
      ...(args.metaMessages ? [...args.metaMessages, ''] : []),
      ...(docsPath ? [`Docs: https://abitype.dev${docsPath}`] : []),
      ...(details ? [`Details: ${details}`] : []),
      `Version: abitype@${version}`,
    ].join('\n')

    super(message)

    if (args.cause) this.cause = args.cause
    this.details = details
    this.docsPath = docsPath
    this.metaMessages = args.metaMessages
    this.shortMessage = shortMessage
  }
}
