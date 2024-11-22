import { describe, expect, test } from 'vitest'
import { serializePublicKey } from './publicKey.js'
import { serializeSignature } from './sign.js'
import { verify } from './verify.js'

describe('verify', () => {
  test('default', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963151n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 1,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xf631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeTruthy()
  })

  test('default', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 92217130139243395344713469331864871617892993489147165241879962954542036045090n,
      s: 25785067610647358687769954197992440351568013796562547723755309225289815468181n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false,"other_keys_can_be_added_here":"do not compare clientDataJSON against a template. See https://goo.gl/yabPex"}',
      typeIndex: 1,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xf631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeTruthy()
  })

  test('behavior: invalid hash', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963151n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 1,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xa631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })

  test('behavior: invalid signature', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963152n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 1,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xa631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })

  test('behavior: authenticator data too short', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963152n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d976305000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 1,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xa631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })

  test('behavior: invalid flag', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 92217130139243395344713469331864871617892993489147165241879962954542036045090n,
      s: 25785067610647358687769954197992440351568013796562547723755309225289815468181n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630000010000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false,"other_keys_can_be_added_here":"do not compare clientDataJSON against a template. See https://goo.gl/yabPex"}',
      typeIndex: 1,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xf631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })

  test('behavior: invalid flag', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963151n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630900000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 1,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xf631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })

  test('behavior: invalid flag', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963151n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97631500000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 1,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xf631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })

  test('behavior: invalid type index', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963151n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM8","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 2,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xf631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })

  test('behavior: invalid challenge', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963151n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challenge":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM9","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 2,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xf631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })

  test('behavior: invalid challenge match', async () => {
    const publicKey = serializePublicKey({
      prefix: 4,
      x: 15325272481743543470187210372131079389379804084126119117911265853867256769440n,
      y: 74947999673872536163854436677160946007685903587557427331495653571111132132212n,
    })
    const signature = serializeSignature({
      r: 10330677067519063752777069525326520293658884904426299601620960859195372963151n,
      s: 47017859265388077754498411591757867926785106410894171160067329762716841868244n,
    })
    const webauthn = {
      authenticatorData:
        '0x49960de5880e8c687434170f6476605b8fe4aeb9a28632c7995cf3ba831d97630500000000',
      challengeIndex: 23,
      clientDataJSON:
        '{"type":"webauthn.get","challene":"9jEFijuhEWrM4SOW-tChJbUEHEP44VcjcJ-Bqo1fTM9","origin":"http://localhost:5173","crossOrigin":false}',
      typeIndex: 2,
      userVerificationRequired: true,
    } as const

    expect(
      await verify({
        hash: '0xf631058a3ba1116acce12396fad0a125b5041c43f8e15723709f81aa8d5f4ccf',
        publicKey,
        signature,
        webauthn,
      }),
    ).toBeFalsy()
  })
})
