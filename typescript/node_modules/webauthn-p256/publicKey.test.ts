import { describe, expect, test } from 'vitest'
import {
  parseCredentialPublicKey,
  parsePublicKey,
  serializePublicKey,
} from './publicKey.js'
import { hexToBytes } from './utils.js'

describe('parseCredentialPublicKey', () => {
  test('default', async () => {
    const cPublicKey = hexToBytes(
      '0x3059301306072a8648ce3d020106082a8648ce3d030107034200041fd0593f9f25ed8ecab174bba6ea6fcf22909c53b3a4e34d5a9f6abd37d6f98cf4954eec64a4b8a39c89e7c4a00b315359e0113fa3fa325ac23cc30ab98a5f21',
    )
    const publicKey = await parseCredentialPublicKey(cPublicKey)
    expect(publicKey).toMatchInlineSnapshot(
      `
      {
        "prefix": 4,
        "x": 14389818466216923403884535744812623934104284630497217462135254660270949595532n,
        "y": 110628139976330432697037350083947752916572921133903068828158883693760290119457n,
      }
    `,
    )
  })
})

describe('parsePublicKey', () => {
  test('default', () => {
    const publicKey =
      '0x2caa86454963544bbc964f29979ddb953395f1baa9b123b1edb6ed1109bf0cb2ce91893a28a0f9f0c6b85edf44b01e95d46a39eeeab45a0b2583c05cb6414904'
    const parsed = parsePublicKey(publicKey)
    expect(parsed).toMatchInlineSnapshot(`
      {
        "prefix": undefined,
        "x": 20203056040651495381197951451296140612901279933246014793928478310014916693170n,
        "y": 93433586739750872222655519548076692627611806436511880340534198806289473161476n,
      }
    `)
  })

  test('bytes', () => {
    const publicKey = hexToBytes(
      '0x2caa86454963544bbc964f29979ddb953395f1baa9b123b1edb6ed1109bf0cb2ce91893a28a0f9f0c6b85edf44b01e95d46a39eeeab45a0b2583c05cb6414904',
    )
    const parsed = parsePublicKey(publicKey)
    expect(parsed).toMatchInlineSnapshot(`
      {
        "prefix": undefined,
        "x": 20203056040651495381197951451296140612901279933246014793928478310014916693170n,
        "y": 93433586739750872222655519548076692627611806436511880340534198806289473161476n,
      }
    `)
  })

  test('uncompressed', () => {
    const publicKey =
      '0x042caa86454963544bbc964f29979ddb953395f1baa9b123b1edb6ed1109bf0cb2ce91893a28a0f9f0c6b85edf44b01e95d46a39eeeab45a0b2583c05cb6414904'
    const parsed = parsePublicKey(publicKey)
    expect(parsed).toMatchInlineSnapshot(`
      {
        "prefix": 4,
        "x": 20203056040651495381197951451296140612901279933246014793928478310014916693170n,
        "y": 93433586739750872222655519548076692627611806436511880340534198806289473161476n,
      }
    `)
  })

  test('uncompressed bytes', () => {
    const publicKey = hexToBytes(
      '0x042caa86454963544bbc964f29979ddb953395f1baa9b123b1edb6ed1109bf0cb2ce91893a28a0f9f0c6b85edf44b01e95d46a39eeeab45a0b2583c05cb6414904',
    )
    const parsed = parsePublicKey(publicKey)
    expect(parsed).toMatchInlineSnapshot(`
      {
        "prefix": 4,
        "x": 20203056040651495381197951451296140612901279933246014793928478310014916693170n,
        "y": 93433586739750872222655519548076692627611806436511880340534198806289473161476n,
      }
    `)
  })
})

describe('serializePublicKey', () => {
  test('default', () => {
    const publicKey = {
      x: 20203056040651495381197951451296140612901279933246014793928478310014916693170n,
      y: 93433586739750872222655519548076692627611806436511880340534198806289473161476n,
    }
    const parsed = serializePublicKey(publicKey)
    expect(parsed).toMatchInlineSnapshot(
      `"0x2caa86454963544bbc964f29979ddb953395f1baa9b123b1edb6ed1109bf0cb2ce91893a28a0f9f0c6b85edf44b01e95d46a39eeeab45a0b2583c05cb6414904"`,
    )
  })

  test('uncompressed', () => {
    const publicKey = {
      prefix: 4,
      x: 20203056040651495381197951451296140612901279933246014793928478310014916693170n,
      y: 93433586739750872222655519548076692627611806436511880340534198806289473161476n,
    }
    const parsed = serializePublicKey(publicKey)
    expect(parsed).toMatchInlineSnapshot(
      `"0x042caa86454963544bbc964f29979ddb953395f1baa9b123b1edb6ed1109bf0cb2ce91893a28a0f9f0c6b85edf44b01e95d46a39eeeab45a0b2583c05cb6414904"`,
    )
  })

  test('args: compressed', () => {
    const publicKey = {
      prefix: 4,
      x: 20203056040651495381197951451296140612901279933246014793928478310014916693170n,
      y: 93433586739750872222655519548076692627611806436511880340534198806289473161476n,
    }
    const parsed = serializePublicKey(publicKey, { compressed: true })
    expect(parsed).toMatchInlineSnapshot(
      `"0x2caa86454963544bbc964f29979ddb953395f1baa9b123b1edb6ed1109bf0cb2ce91893a28a0f9f0c6b85edf44b01e95d46a39eeeab45a0b2583c05cb6414904"`,
    )
  })

  test('args: to', () => {
    const publicKey = {
      x: 20203056040651495381197951451296140612901279933246014793928478310014916693170n,
      y: 93433586739750872222655519548076692627611806436511880340534198806289473161476n,
    }
    const parsed = serializePublicKey(publicKey, { to: 'bytes' })
    expect(parsed).toMatchInlineSnapshot(
      `
      Uint8Array [
        44,
        170,
        134,
        69,
        73,
        99,
        84,
        75,
        188,
        150,
        79,
        41,
        151,
        157,
        219,
        149,
        51,
        149,
        241,
        186,
        169,
        177,
        35,
        177,
        237,
        182,
        237,
        17,
        9,
        191,
        12,
        178,
        206,
        145,
        137,
        58,
        40,
        160,
        249,
        240,
        198,
        184,
        94,
        223,
        68,
        176,
        30,
        149,
        212,
        106,
        57,
        238,
        234,
        180,
        90,
        11,
        37,
        131,
        192,
        92,
        182,
        65,
        73,
        4,
      ]
    `,
    )
  })
})
