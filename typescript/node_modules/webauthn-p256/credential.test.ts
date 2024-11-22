import { describe, expect, test } from 'vitest'
import { createCredential, getCredentialCreationOptions } from './credential.js'

describe('createCredential', () => {
  test('default', async () => {
    let options: CredentialCreationOptions | undefined

    const credential = await createCredential({
      createFn(options_) {
        options = options_
        return Promise.resolve({
          id: 'm1-bMPuAqpWhCxHZQZTT6e-lSPntQbh3opIoGe7g4Qs',
          response: {
            getPublicKey() {
              return [
                48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134,
                72, 206, 61, 3, 1, 7, 3, 66, 0, 4, 171, 137, 20, 0, 20, 15, 196,
                248, 233, 65, 206, 15, 249, 14, 65, 157, 233, 71, 10, 202, 202,
                97, 59, 189, 113, 122, 71, 117, 67, 80, 49, 167, 216, 132, 49,
                142, 145, 159, 211, 179, 229, 166, 49, 216, 102, 216, 163, 128,
                180, 64, 99, 231, 15, 12, 56, 30, 225, 110, 6, 82, 247, 249,
                117, 84,
              ]
            },
          },
        } as any)
      },
      name: 'Foo',
    })

    expect(credential).toMatchInlineSnapshot(`
      {
        "id": "m1-bMPuAqpWhCxHZQZTT6e-lSPntQbh3opIoGe7g4Qs",
        "publicKey": "0xab891400140fc4f8e941ce0ff90e419de9470acaca613bbd717a4775435031a7d884318e919fd3b3e5a631d866d8a380b44063e70f0c381ee16e0652f7f97554",
        "raw": {
          "id": "m1-bMPuAqpWhCxHZQZTT6e-lSPntQbh3opIoGe7g4Qs",
          "response": {
            "getPublicKey": [Function],
          },
        },
      }
    `)
    expect(options).toMatchInlineSnapshot(`
      {
        "publicKey": {
          "attestation": "none",
          "authenticatorSelection": {
            "authenticatorAttachment": "platform",
            "requireResidentKey": false,
            "residentKey": "preferred",
            "userVerification": "required",
          },
          "challenge": Uint8Array [
            105,
            171,
            180,
            181,
            160,
            222,
            75,
            198,
            42,
            42,
            32,
            31,
            141,
            37,
            186,
            233,
          ],
          "extensions": undefined,
          "pubKeyCredParams": [
            {
              "alg": -7,
              "type": "public-key",
            },
          ],
          "rp": {
            "id": "https://example.com",
            "name": "My Website",
          },
          "user": {
            "displayName": "Foo",
            "id": Uint8Array [
              182,
              8,
              199,
              66,
              131,
              243,
              52,
              225,
              240,
              71,
              219,
              191,
              29,
              170,
              36,
              7,
              212,
              29,
              70,
              137,
              172,
              166,
              124,
              66,
              39,
              150,
              249,
              54,
              172,
              206,
              22,
              183,
            ],
            "name": "Foo",
          },
        },
      }
    `)
  })

  test('error: null credential', async () => {
    await expect(() =>
      createCredential({
        createFn() {
          return Promise.resolve(null)
        },
        name: 'Foo',
      }),
    ).rejects.toMatchInlineSnapshot('[Error: credential creation failed.]')
  })

  test('error: thrown', async () => {
    await expect(() =>
      createCredential({
        createFn() {
          return Promise.reject(new Error('foo'))
        },
        name: 'Foo',
      }),
    ).rejects.toMatchInlineSnapshot('[Error: credential creation failed.]')
  })
})

describe('getCredentialCreationOptions', () => {
  test('default', () => {
    expect(
      getCredentialCreationOptions({
        name: 'Foo',
      }),
    ).toMatchInlineSnapshot(`
      {
        "publicKey": {
          "attestation": "none",
          "authenticatorSelection": {
            "authenticatorAttachment": "platform",
            "requireResidentKey": false,
            "residentKey": "preferred",
            "userVerification": "required",
          },
          "challenge": Uint8Array [
            105,
            171,
            180,
            181,
            160,
            222,
            75,
            198,
            42,
            42,
            32,
            31,
            141,
            37,
            186,
            233,
          ],
          "extensions": undefined,
          "pubKeyCredParams": [
            {
              "alg": -7,
              "type": "public-key",
            },
          ],
          "rp": {
            "id": "https://example.com",
            "name": "My Website",
          },
          "user": {
            "displayName": "Foo",
            "id": Uint8Array [
              182,
              8,
              199,
              66,
              131,
              243,
              52,
              225,
              240,
              71,
              219,
              191,
              29,
              170,
              36,
              7,
              212,
              29,
              70,
              137,
              172,
              166,
              124,
              66,
              39,
              150,
              249,
              54,
              172,
              206,
              22,
              183,
            ],
            "name": "Foo",
          },
        },
      }
    `)
  })

  test('args: excludeCredentialIds', () => {
    expect(
      getCredentialCreationOptions({
        excludeCredentialIds: ['pzpQZRhXUkboj-b_srH0X42XJS7Ai2ZXd6-9lnFULig'],
        name: 'Foo',
      }),
    ).toMatchInlineSnapshot(`
      {
        "publicKey": {
          "attestation": "none",
          "authenticatorSelection": {
            "authenticatorAttachment": "platform",
            "requireResidentKey": false,
            "residentKey": "preferred",
            "userVerification": "required",
          },
          "challenge": Uint8Array [
            105,
            171,
            180,
            181,
            160,
            222,
            75,
            198,
            42,
            42,
            32,
            31,
            141,
            37,
            186,
            233,
          ],
          "excludeCredentials": [
            {
              "id": Uint8Array [
                167,
                58,
                80,
                101,
                24,
                87,
                82,
                70,
                232,
                143,
                230,
                255,
                178,
                177,
                244,
                95,
                141,
                151,
                37,
                46,
                192,
                139,
                102,
                87,
                119,
                175,
                189,
                150,
                113,
                84,
                46,
                40,
              ],
              "type": "public-key",
            },
          ],
          "extensions": undefined,
          "pubKeyCredParams": [
            {
              "alg": -7,
              "type": "public-key",
            },
          ],
          "rp": {
            "id": "https://example.com",
            "name": "My Website",
          },
          "user": {
            "displayName": "Foo",
            "id": Uint8Array [
              182,
              8,
              199,
              66,
              131,
              243,
              52,
              225,
              240,
              71,
              219,
              191,
              29,
              170,
              36,
              7,
              212,
              29,
              70,
              137,
              172,
              166,
              124,
              66,
              39,
              150,
              249,
              54,
              172,
              206,
              22,
              183,
            ],
            "name": "Foo",
          },
        },
      }
    `)
  })

  test('args: user', () => {
    expect(
      getCredentialCreationOptions({
        user: {
          name: 'Foo',
        },
      }),
    ).toMatchInlineSnapshot(`
      {
        "publicKey": {
          "attestation": "none",
          "authenticatorSelection": {
            "authenticatorAttachment": "platform",
            "requireResidentKey": false,
            "residentKey": "preferred",
            "userVerification": "required",
          },
          "challenge": Uint8Array [
            105,
            171,
            180,
            181,
            160,
            222,
            75,
            198,
            42,
            42,
            32,
            31,
            141,
            37,
            186,
            233,
          ],
          "extensions": undefined,
          "pubKeyCredParams": [
            {
              "alg": -7,
              "type": "public-key",
            },
          ],
          "rp": {
            "id": "https://example.com",
            "name": "My Website",
          },
          "user": {
            "displayName": "Foo",
            "id": Uint8Array [
              182,
              8,
              199,
              66,
              131,
              243,
              52,
              225,
              240,
              71,
              219,
              191,
              29,
              170,
              36,
              7,
              212,
              29,
              70,
              137,
              172,
              166,
              124,
              66,
              39,
              150,
              249,
              54,
              172,
              206,
              22,
              183,
            ],
            "name": "Foo",
          },
        },
      }
    `)
  })
})
