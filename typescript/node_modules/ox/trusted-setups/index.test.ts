import { expect, test } from 'vitest'
import * as Module from './index.js'

test('exports', () => {
  expect(Object.keys(Module)).toMatchInlineSnapshot(`
    [
      "Paths",
    ]
  `)
})
