import { expect, test } from 'vitest'
import * as Module from './Paths.js'

test('exports', () => {
  expect(Object.keys(Module)).toMatchInlineSnapshot(`
    [
      "mainnet",
    ]
  `)
})
