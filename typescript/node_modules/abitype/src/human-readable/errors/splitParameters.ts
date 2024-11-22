import { BaseError } from '../../errors.js'

export class InvalidParenthesisError extends BaseError {
  override name = 'InvalidParenthesisError'

  constructor({ current, depth }: { current: string; depth: number }) {
    super('Unbalanced parentheses.', {
      metaMessages: [
        `"${current.trim()}" has too many ${
          depth > 0 ? 'opening' : 'closing'
        } parentheses.`,
      ],
      details: `Depth "${depth}"`,
    })
  }
}
