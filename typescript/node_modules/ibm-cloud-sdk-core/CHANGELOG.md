# [5.1.0](https://github.com/IBM/node-sdk-core/compare/v5.0.2...v5.1.0) (2024-10-15)


### Features

* **IamAssumeAuthenticator:** add new authentication type for iam assume ([#287](https://github.com/IBM/node-sdk-core/issues/287)) ([addebfc](https://github.com/IBM/node-sdk-core/commit/addebfca36f0b45a1e4df18605984a66073413bb))

## [5.0.2](https://github.com/IBM/node-sdk-core/compare/v5.0.1...v5.0.2) (2024-09-03)


### Bug Fixes

* **logging:** improve node core's debug logging ([#286](https://github.com/IBM/node-sdk-core/issues/286)) ([7bcb404](https://github.com/IBM/node-sdk-core/commit/7bcb404fa88592079571149c4b4224f97798f47d))

## [5.0.1](https://github.com/IBM/node-sdk-core/compare/v5.0.0...v5.0.1) (2024-08-14)


### Bug Fixes

* **deps:** update axios to resolve vulnerability ([#282](https://github.com/IBM/node-sdk-core/issues/282)) ([83d9473](https://github.com/IBM/node-sdk-core/commit/83d9473dc88a288398fa307703f626ca3ebf8bd5))
* **deps:** update axios to resolve vulnerability ([#283](https://github.com/IBM/node-sdk-core/issues/283)) ([3500bf2](https://github.com/IBM/node-sdk-core/commit/3500bf22d1e321e54614c3c97186779266b9f264))

# [5.0.0](https://github.com/IBM/node-sdk-core/compare/v4.3.3...v5.0.0) (2024-06-18)


### Bug Fixes

* remove test utilities and dependency from package ([901ece0](https://github.com/IBM/node-sdk-core/commit/901ece06d6f7897164b54d58f316da94ae1fc5da))


### Build System

* bump minimum node version to v18 ([3d8fef5](https://github.com/IBM/node-sdk-core/commit/3d8fef5cf6a1b4d01cfa2c132f186bf16cec1a56))


### BREAKING CHANGES

* SDK test helpers are no longer exposed in this package.

To continue using the test helpers, which SDK unit tests still rely on, install
the new "@ibm-cloud/sdk-test-utilities" package as a development dependency.

Signed-off-by: Dustin Popp <dustinpopp@ibm.com>
* Node v18 or above is now required to use this package.

Signed-off-by: Dustin Popp <dustinpopp@ibm.com>

## [4.3.3](https://github.com/IBM/node-sdk-core/compare/v4.3.2...v4.3.3) (2024-06-04)


### Bug Fixes

* revert "fix(deps): remove `expect` as redundant development dependency" ([362e20a](https://github.com/IBM/node-sdk-core/commit/362e20aad22172bc6db0a3458743809b0cdefe3a))

## [4.3.2](https://github.com/IBM/node-sdk-core/compare/v4.3.1...v4.3.2) (2024-06-03)


### Bug Fixes

* **deps:** remove `expect` as redundant development dependency ([b57b491](https://github.com/IBM/node-sdk-core/commit/b57b49108f17008fdf670ae2364edc908181773c))

## [4.3.1](https://github.com/IBM/node-sdk-core/compare/v4.3.0...v4.3.1) (2024-05-21)


### Bug Fixes

* **deps:** bump `braces` and `micromatch` to avoid vulnerabilities ([#274](https://github.com/IBM/node-sdk-core/issues/274)) ([1ecac01](https://github.com/IBM/node-sdk-core/commit/1ecac01847dbcef18747c0400e5e36f9a981b936))

# [4.3.0](https://github.com/IBM/node-sdk-core/compare/v4.2.5...v4.3.0) (2024-04-17)


### Features

* send user-agent header with auth token requests ([#272](https://github.com/IBM/node-sdk-core/issues/272)) ([a558274](https://github.com/IBM/node-sdk-core/commit/a558274d3c19a2d0d453b8e9f5bc233f201ebb85))

## [4.2.5](https://github.com/IBM/node-sdk-core/compare/v4.2.4...v4.2.5) (2024-03-29)


### Bug Fixes

* **deps:** update axios to resolve vulnerability ([#269](https://github.com/IBM/node-sdk-core/issues/269)) ([4a2c7a5](https://github.com/IBM/node-sdk-core/commit/4a2c7a5f7dba688f22f21c44983c257533bc50ca))

## [4.2.4](https://github.com/IBM/node-sdk-core/compare/v4.2.3...v4.2.4) (2024-02-28)


### Bug Fixes

* adjust IAM token expiration time ([#268](https://github.com/IBM/node-sdk-core/issues/268)) ([9b975e0](https://github.com/IBM/node-sdk-core/commit/9b975e0da75d46ea29095eebeda5d0b079f058c6))

## [4.2.3](https://github.com/IBM/node-sdk-core/compare/v4.2.2...v4.2.3) (2024-02-01)


### Bug Fixes

* **token-manager:** handle request errors when refreshing tokens ([#267](https://github.com/IBM/node-sdk-core/issues/267)) ([2909804](https://github.com/IBM/node-sdk-core/commit/290980474d8e567612d36d6160315ee7e433b07b))

## [4.2.2](https://github.com/IBM/node-sdk-core/compare/v4.2.1...v4.2.2) (2024-01-04)


### Bug Fixes

* **deps:** bump axios to 1.6.4 ([#265](https://github.com/IBM/node-sdk-core/issues/265)) ([48c558b](https://github.com/IBM/node-sdk-core/commit/48c558b3afdb8988ae8559ea1594a1cf950f18db))

## [4.2.1](https://github.com/IBM/node-sdk-core/compare/v4.2.0...v4.2.1) (2024-01-02)


### Bug Fixes

* **deps:** bump axios to 1.6.3 to avoid ReDOS vulnerability ([#263](https://github.com/IBM/node-sdk-core/issues/263)) ([b08f9de](https://github.com/IBM/node-sdk-core/commit/b08f9dee9af2b62c520524cfa036e3c8a83e591a))

# [4.2.0](https://github.com/IBM/node-sdk-core/compare/v4.1.5...v4.2.0) (2023-11-15)


### Features

* **McspAuthenticator:** add new authenticator for Multi-Cloud Saas Platform ([#258](https://github.com/IBM/node-sdk-core/issues/258)) ([4fe7f71](https://github.com/IBM/node-sdk-core/commit/4fe7f7191c8a93947b359034229f7f966936ae53))

## [4.1.5](https://github.com/IBM/node-sdk-core/compare/v4.1.4...v4.1.5) (2023-11-13)


### Bug Fixes

* move @types/debug to 'dependencies' ([#260](https://github.com/IBM/node-sdk-core/issues/260)) ([2eb6ad6](https://github.com/IBM/node-sdk-core/commit/2eb6ad6d506a2bbdadf764e6dfb92228c962522e))

## [4.1.4](https://github.com/IBM/node-sdk-core/compare/v4.1.3...v4.1.4) (2023-10-31)


### Bug Fixes

* **deps:** resolve vulnerability in axios version ([#256](https://github.com/IBM/node-sdk-core/issues/256)) ([9bc0358](https://github.com/IBM/node-sdk-core/commit/9bc0358a58e05032ad644973e6f60ae09756efa7))

## [4.1.3](https://github.com/IBM/node-sdk-core/compare/v4.1.2...v4.1.3) (2023-10-19)


### Bug Fixes

* bump @babel/traverse to avoid CVE-2023-45133 ([#253](https://github.com/IBM/node-sdk-core/issues/253)) ([c95f5b2](https://github.com/IBM/node-sdk-core/commit/c95f5b23f3a74e00d53142520f6c9d408e298b6b))

## [4.1.2](https://github.com/IBM/node-sdk-core/compare/v4.1.1...v4.1.2) (2023-09-27)


### Bug Fixes

* harden checks for cookies in error responses ([#252](https://github.com/IBM/node-sdk-core/issues/252)) ([36f7bfe](https://github.com/IBM/node-sdk-core/commit/36f7bfeb80cde1ea8b159659a8a0a8c5b4cf6ea1))

## [4.1.1](https://github.com/IBM/node-sdk-core/compare/v4.1.0...v4.1.1) (2023-09-20)


### Bug Fixes

* process cookies in failed responses ([#251](https://github.com/IBM/node-sdk-core/issues/251)) ([52f758b](https://github.com/IBM/node-sdk-core/commit/52f758bc5700b3ccd283e39cca7401ee8dcb60d9))

# [4.1.0](https://github.com/IBM/node-sdk-core/compare/v4.0.9...v4.1.0) (2023-07-06)


### Features

* add logic for serializing/deserializing model objects ([#247](https://github.com/IBM/node-sdk-core/issues/247)) ([2397eae](https://github.com/IBM/node-sdk-core/commit/2397eaef56c247a2720396c7d1444b2331ae5a73))

## [4.0.9](https://github.com/IBM/node-sdk-core/compare/v4.0.8...v4.0.9) (2023-06-22)


### Bug Fixes

* remove unused dependencies ([#246](https://github.com/IBM/node-sdk-core/issues/246)) ([3885ef0](https://github.com/IBM/node-sdk-core/commit/3885ef018ffa0ecb0def8ba6a38f1897b8f39077))

## [4.0.8](https://github.com/IBM/node-sdk-core/compare/v4.0.7...v4.0.8) (2023-05-22)


### Bug Fixes

* refresh dependencies and address import cycles ([#244](https://github.com/IBM/node-sdk-core/issues/244)) ([72aa8d5](https://github.com/IBM/node-sdk-core/commit/72aa8d5f8308ea0e7d092e79b45743fc3f273506))

## [4.0.7](https://github.com/IBM/node-sdk-core/compare/v4.0.6...v4.0.7) (2023-05-22)


### Bug Fixes

* **ContainerAuthenticator:** add sa-token as default CR token filename ([#241](https://github.com/IBM/node-sdk-core/issues/241)) ([91f9932](https://github.com/IBM/node-sdk-core/commit/91f9932ab0a74c11e1de5aecb46481dee3058018))

## [4.0.6](https://github.com/IBM/node-sdk-core/compare/v4.0.5...v4.0.6) (2023-05-18)


### Bug Fixes

* use consistent message for JSON.parse() errors ([#243](https://github.com/IBM/node-sdk-core/issues/243)) ([3cc7bab](https://github.com/IBM/node-sdk-core/commit/3cc7babac6a14b1744d64cf3ab93063b2ce63643))

## [4.0.5](https://github.com/IBM/node-sdk-core/compare/v4.0.4...v4.0.5) (2023-03-01)


### Bug Fixes

* correctly handle empty response bodies ([#239](https://github.com/IBM/node-sdk-core/issues/239)) ([d0c9cb3](https://github.com/IBM/node-sdk-core/commit/d0c9cb37b00adf4493fd46a3ae72123d6f1e33e7))

## [4.0.4](https://github.com/IBM/node-sdk-core/compare/v4.0.3...v4.0.4) (2023-02-27)


### Bug Fixes

* return json error response body as object ([#238](https://github.com/IBM/node-sdk-core/issues/238)) ([6f201b7](https://github.com/IBM/node-sdk-core/commit/6f201b798df234510a6abf6baac96b81c72636bf))

## [4.0.3](https://github.com/IBM/node-sdk-core/compare/v4.0.2...v4.0.3) (2023-01-09)


### Bug Fixes

* **VpcInstanceAuthenticator:** use correct version string ([4a1411a](https://github.com/IBM/node-sdk-core/commit/4a1411a76a09e9b1ade2c94bd98e63f79d845494))

## [4.0.2](https://github.com/IBM/node-sdk-core/compare/v4.0.1...v4.0.2) (2022-12-30)


### Bug Fixes

* **auth:** revert to using decode instead verify for jwt ([#227](https://github.com/IBM/node-sdk-core/issues/227)) ([cf3d641](https://github.com/IBM/node-sdk-core/commit/cf3d64106f35943c34f2a9c5d1b4de63994aed2a))

## [4.0.1](https://github.com/IBM/node-sdk-core/compare/v4.0.0...v4.0.1) (2022-12-29)


### Bug Fixes

* **auth:** migrate to secure usage of jwt for token authentication ([#225](https://github.com/IBM/node-sdk-core/issues/225)) ([10e0728](https://github.com/IBM/node-sdk-core/commit/10e07283cec2205eb6bda5723e63e5403d9b23f6))

# [4.0.0](https://github.com/IBM/node-sdk-core/compare/v3.2.1...v4.0.0) (2022-12-20)


### Bug Fixes

* axios 1.x in request-wrapper ([9ba195b](https://github.com/IBM/node-sdk-core/commit/9ba195b60d01dc345c2b294dd13af9214671787b))


### Build System

* **deps-dev:** update typescript to 4.9.4 ([1764e22](https://github.com/IBM/node-sdk-core/commit/1764e2256a292e4a758c98cf7706cea686e59b12))


### Features

* update minimum Node.js version to 14 ([5021118](https://github.com/IBM/node-sdk-core/commit/5021118fca8b5cb94544815488cd6d7ac67b0467))


### BREAKING CHANGES

* **deps-dev:** Minimum typescript version is 4.
Upgrade to typescript 4.x.

* Minimum Node.js version is 14.
Upgrade to at least Node.js 14.

* **For assistance migrating to v4** - see the [migration guide](https://github.com/IBM/node-sdk-core/blob/main/MIGRATION-V4.md).


## [3.2.1](https://github.com/IBM/node-sdk-core/compare/v3.2.0...v3.2.1) (2022-10-21)


### Bug Fixes

* allow for synchronous building of file requests ([#211](https://github.com/IBM/node-sdk-core/issues/211)) ([dcce4ea](https://github.com/IBM/node-sdk-core/commit/dcce4ea78189e4619cde2d736436a30128cf4b59))

# [3.2.0](https://github.com/IBM/node-sdk-core/compare/v3.1.0...v3.2.0) (2022-10-12)


### Features

* add method `getNewLogger` to public API ([#210](https://github.com/IBM/node-sdk-core/issues/210)) ([07b99de](https://github.com/IBM/node-sdk-core/commit/07b99def47a0eb5fcb1ab3d88b2eb3bd271b8819))

# [3.1.0](https://github.com/IBM/node-sdk-core/compare/v3.0.1...v3.1.0) (2022-07-28)


### Features

* add `setDefaultHeaders` method on base service class ([#207](https://github.com/IBM/node-sdk-core/issues/207)) ([29bec13](https://github.com/IBM/node-sdk-core/commit/29bec13b67ea08071be488af62b919899f21ec50))

## [3.0.1](https://github.com/IBM/node-sdk-core/compare/v3.0.0...v3.0.1) (2022-07-28)


### Bug Fixes

* correct AuthenticatorInterface type ([#206](https://github.com/IBM/node-sdk-core/issues/206)) ([31dc7bd](https://github.com/IBM/node-sdk-core/commit/31dc7bd1e744a071cdabc2b5bf1e9513024079ac)), closes [#176](https://github.com/IBM/node-sdk-core/issues/176)

# [3.0.0](https://github.com/IBM/node-sdk-core/compare/v2.17.15...v3.0.0) (2022-07-28)


### Bug Fixes

* update file-type to resolve vulnerability ([#205](https://github.com/IBM/node-sdk-core/issues/205)) ([843e66d](https://github.com/IBM/node-sdk-core/commit/843e66d10aeb43dc5a0f7c9583f93ce6a5dbaa7e)), closes [#204](https://github.com/IBM/node-sdk-core/issues/204)


### BREAKING CHANGES

* two synchronous public functions are now asynchronous

The function `getContentType` formerly returned a string but now returns a
Promise that resolves to a string. The function `buildRequestFileObject`
formerly returned a `FileObject` but now returns a Promise that resolves to
a `FileObject`.

## [2.17.15](https://github.com/IBM/node-sdk-core/compare/v2.17.14...v2.17.15) (2022-07-05)


### Bug Fixes

* ensure dist/docs is a directory during build ([#202](https://github.com/IBM/node-sdk-core/issues/202)) ([1b3ef62](https://github.com/IBM/node-sdk-core/commit/1b3ef621e3cbfe0586d433269f63acf77dfa7251))

## [2.17.14](https://github.com/IBM/node-sdk-core/compare/v2.17.13...v2.17.14) (2022-05-02)


### Bug Fixes

* do not retry on 501 ([#197](https://github.com/IBM/node-sdk-core/issues/197)) ([5cb9081](https://github.com/IBM/node-sdk-core/commit/5cb9081f581c73b3ba16e470eb4c03c9b8f5c266))

## [2.17.13](https://github.com/IBM/node-sdk-core/compare/v2.17.12...v2.17.13) (2022-04-04)


### Bug Fixes

* bump dependencies to avoid minimist vulnerability ([#195](https://github.com/IBM/node-sdk-core/issues/195)) ([4de8a9d](https://github.com/IBM/node-sdk-core/commit/4de8a9d4fe35d595c1c1c65b4a2b033c6d5f8b42))

## [2.17.12](https://github.com/IBM/node-sdk-core/compare/v2.17.11...v2.17.12) (2022-03-16)


### Bug Fixes

* update minimum Node version in package.json ([#192](https://github.com/IBM/node-sdk-core/issues/192)) ([dfbebee](https://github.com/IBM/node-sdk-core/commit/dfbebee3bf3b3234c3149323d93272f21b031cf2))

## [2.17.11](https://github.com/IBM/node-sdk-core/compare/v2.17.10...v2.17.11) (2022-03-16)


### Bug Fixes

* update axios to remove vulnerability ([90e0417](https://github.com/IBM/node-sdk-core/commit/90e04179a14409ae209e80e4341779b61e45c772))
* use correct type for cookie jar option ([59a440a](https://github.com/IBM/node-sdk-core/commit/59a440a66f96279b5842d1e6d2b1d48b0b0c2fe8))

## [2.17.10](https://github.com/IBM/node-sdk-core/compare/v2.17.9...v2.17.10) (2022-02-10)


### Bug Fixes

* bump follow-redirects to avoid vuln ([#191](https://github.com/IBM/node-sdk-core/issues/191)) ([8a69d8e](https://github.com/IBM/node-sdk-core/commit/8a69d8e3e525c39cf1b9dcd17dc911df769702a1))

## [2.17.9](https://github.com/IBM/node-sdk-core/compare/v2.17.8...v2.17.9) (2022-01-19)


### Bug Fixes

* bump version of follow-redirects to avoid vulnerability ([#189](https://github.com/IBM/node-sdk-core/issues/189)) ([b88c67a](https://github.com/IBM/node-sdk-core/commit/b88c67a52cd5129cc12228266c2499cbd1fefeec))

## [2.17.8](https://github.com/IBM/node-sdk-core/compare/v2.17.7...v2.17.8) (2022-01-18)


### Bug Fixes

* avoid errors during logging of requests/responses ([#188](https://github.com/IBM/node-sdk-core/issues/188)) ([d05ea1a](https://github.com/IBM/node-sdk-core/commit/d05ea1a560a35a33a44aea0c5f9d24af65929d0b))

## [2.17.7](https://github.com/IBM/node-sdk-core/compare/v2.17.6...v2.17.7) (2022-01-14)


### Bug Fixes

* remove 'module' entry from package.json ([#187](https://github.com/IBM/node-sdk-core/issues/187)) ([3a0aea5](https://github.com/IBM/node-sdk-core/commit/3a0aea5109f01d61ad54c79a7a6f2606fb845ab8))

## [2.17.6](https://github.com/IBM/node-sdk-core/compare/v2.17.5...v2.17.6) (2022-01-05)


### Bug Fixes

* use npm8 and package-lock v2 ([#186](https://github.com/IBM/node-sdk-core/issues/186)) ([6b1122c](https://github.com/IBM/node-sdk-core/commit/6b1122c5318c304454414dcd9cafb9b151c5b51a))

## [2.17.5](https://github.com/IBM/node-sdk-core/compare/v2.17.4...v2.17.5) (2021-12-17)


### Bug Fixes

* avoid Buffer re-encode during compression ([#184](https://github.com/IBM/node-sdk-core/issues/184)) ([8b82f36](https://github.com/IBM/node-sdk-core/commit/8b82f36bf6d4ac0163563ce3a10f0a395bd87627))

## [2.17.4](https://github.com/IBM/node-sdk-core/compare/v2.17.3...v2.17.4) (2021-12-16)


### Bug Fixes

* don't always convert bytes to text in streamToPromise ([#182](https://github.com/IBM/node-sdk-core/issues/182)) ([7fe261b](https://github.com/IBM/node-sdk-core/commit/7fe261b20f934cd3fde45acc69b9d4888836aa69))

## [2.17.3](https://github.com/IBM/node-sdk-core/compare/v2.17.2...v2.17.3) (2021-12-13)


### Bug Fixes

* bump dependencies to avoid vulnerability alerts ([#183](https://github.com/IBM/node-sdk-core/issues/183)) ([aef2c6a](https://github.com/IBM/node-sdk-core/commit/aef2c6a2b2a58ce71990b4ae754a3a0ce32e64fd))

## [2.17.2](https://github.com/IBM/node-sdk-core/compare/v2.17.1...v2.17.2) (2021-12-08)


### Bug Fixes

* **VpcInstanceAuthenticator:** omit request body for default profile scenario ([#181](https://github.com/IBM/node-sdk-core/issues/181)) ([1e3fb2d](https://github.com/IBM/node-sdk-core/commit/1e3fb2d8efede7f1382538d4a4918b16e04deeea))

## [2.17.1](https://github.com/IBM/node-sdk-core/compare/v2.17.0...v2.17.1) (2021-12-06)


### Bug Fixes

* add new validateParams function ([#180](https://github.com/IBM/node-sdk-core/issues/180)) ([514d187](https://github.com/IBM/node-sdk-core/commit/514d187895cb1aa9ca5c642a9dcfccf8e09eb0ed))

# [2.17.0](https://github.com/IBM/node-sdk-core/compare/v2.16.0...v2.17.0) (2021-11-08)


### Features

* **VpcInstanceAuthenticator:** add support for new VPC authentication flow ([#172](https://github.com/IBM/node-sdk-core/issues/172)) ([8bbe704](https://github.com/IBM/node-sdk-core/commit/8bbe704ced5ee9126b4ffdcb2f2c2f7978f9b1d7))

# [2.16.0](https://github.com/IBM/node-sdk-core/compare/v2.15.1...v2.16.0) (2021-10-20)


### Features

* add support for retrieving refresh tokens from iam-based authenticators ([#173](https://github.com/IBM/node-sdk-core/issues/173)) ([e7f11fc](https://github.com/IBM/node-sdk-core/commit/e7f11fce7bbbfff1273c289b9e9b8fba27c705dc))

## [2.15.1](https://github.com/IBM/node-sdk-core/compare/v2.15.0...v2.15.1) (2021-10-15)


### Bug Fixes

* use correct authenticator type constants ([#170](https://github.com/IBM/node-sdk-core/issues/170)) ([ae19adc](https://github.com/IBM/node-sdk-core/commit/ae19adcc25a3257a7c336390f83033960844615e))

# [2.15.0](https://github.com/IBM/node-sdk-core/compare/v2.14.4...v2.15.0) (2021-10-15)


### Features

* add authenticationType method to authenticators ([#169](https://github.com/IBM/node-sdk-core/issues/169)) ([2850c4f](https://github.com/IBM/node-sdk-core/commit/2850c4ff783e0781aa31c9efab5d6b314ce4e8f0))

## [2.14.4](https://github.com/IBM/node-sdk-core/compare/v2.14.3...v2.14.4) (2021-09-22)


### Bug Fixes

* support POST for retry-axios ([#165](https://github.com/IBM/node-sdk-core/issues/165)) ([6b055d3](https://github.com/IBM/node-sdk-core/commit/6b055d38f791977bac686b14fa230a43fa74b6de))

## [2.14.3](https://github.com/IBM/node-sdk-core/compare/v2.14.2...v2.14.3) (2021-09-09)


### Bug Fixes

* **build:** update dependencies ([#161](https://github.com/IBM/node-sdk-core/issues/161)) ([8a37ef0](https://github.com/IBM/node-sdk-core/commit/8a37ef030c5ea793e79ea451043f71cd860ff14b))

## [2.14.2](https://github.com/IBM/node-sdk-core/compare/v2.14.1...v2.14.2) (2021-09-09)


### Bug Fixes

* **build:** bump axios to 0.21.4 to avoid vulnerabilities ([#160](https://github.com/IBM/node-sdk-core/issues/160)) ([12a6c5b](https://github.com/IBM/node-sdk-core/commit/12a6c5b799ff349c9e5ad12df8f383f4f673417d))

## [2.14.1](https://github.com/IBM/node-sdk-core/compare/v2.14.0...v2.14.1) (2021-08-31)


### Performance Improvements

* use maxContentLength -1 instead of Infinity ([#158](https://github.com/IBM/node-sdk-core/issues/158)) ([adbbb3b](https://github.com/IBM/node-sdk-core/commit/adbbb3bceb388b34753f9fe3579eec3f0520ddb3))

# [2.14.0](https://github.com/IBM/node-sdk-core/compare/v2.13.0...v2.14.0) (2021-08-27)


### Features

* add enableRetries and disableRetries ([#156](https://github.com/IBM/node-sdk-core/issues/156)) ([d6f12e7](https://github.com/IBM/node-sdk-core/commit/d6f12e76c91f9f0ddce4fef09f5ff024ca3947bc))

# [2.13.0](https://github.com/IBM/node-sdk-core/compare/v2.12.2...v2.13.0) (2021-08-18)


### Features

* add method `getHttpClient` to get underlying axios instance of base service ([#155](https://github.com/IBM/node-sdk-core/issues/155)) ([2aede01](https://github.com/IBM/node-sdk-core/commit/2aede013cd398a2605fd67c0412e6ca5669c415e))

## [2.12.2](https://github.com/IBM/node-sdk-core/compare/v2.12.1...v2.12.2) (2021-08-13)


### Bug Fixes

* support 'AUTHTYPE' as alias for 'AUTH_TYPE' config property ([#153](https://github.com/IBM/node-sdk-core/issues/153)) ([fccf209](https://github.com/IBM/node-sdk-core/commit/fccf2093874835d9c77c08843809b79e57fb0e78))

## [2.12.1](https://github.com/IBM/node-sdk-core/compare/v2.12.0...v2.12.1) (2021-08-11)


### Bug Fixes

* use typescript 3.8.x to build the published code ([#152](https://github.com/IBM/node-sdk-core/issues/152)) ([4362a37](https://github.com/IBM/node-sdk-core/commit/4362a376b3419baa5e7e428b03490bf021d0a295))

# [2.12.0](https://github.com/IBM/node-sdk-core/compare/v2.11.3...v2.12.0) (2021-08-10)


### Features

* add support for new ContainerAuthenticator ([#151](https://github.com/IBM/node-sdk-core/issues/151)) ([b01c011](https://github.com/IBM/node-sdk-core/commit/b01c011021671ebeb3c49de84fb17315eae3629f))

## [2.11.3](https://github.com/IBM/node-sdk-core/compare/v2.11.2...v2.11.3) (2021-06-14)


### Bug Fixes

* **build:** revert inadvertently-committed directories ([#147](https://github.com/IBM/node-sdk-core/issues/147)) ([1fb6295](https://github.com/IBM/node-sdk-core/commit/1fb62955e74e73c805b6221ca85e22517335f273))

## [2.11.2](https://github.com/IBM/node-sdk-core/compare/v2.11.1...v2.11.2) (2021-06-10)


### Bug Fixes

* remove default limit on request body length ([#145](https://github.com/IBM/node-sdk-core/issues/145)) ([abf604a](https://github.com/IBM/node-sdk-core/commit/abf604a10483194d0e46e3a1d2e4c27c20331867))

## [2.11.1](https://github.com/IBM/node-sdk-core/compare/v2.11.0...v2.11.1) (2021-06-07)


### Bug Fixes

* change constructServiceURL from method to function ([#141](https://github.com/IBM/node-sdk-core/issues/141)) ([cd2d28c](https://github.com/IBM/node-sdk-core/commit/cd2d28ce12b5189ab9de240d6b6d86aa77d33a73))

# [2.11.0](https://github.com/IBM/node-sdk-core/compare/v2.10.4...v2.11.0) (2021-05-27)


### Features

* add `BaseService.constructServiceURL` method ([#138](https://github.com/IBM/node-sdk-core/issues/138)) ([0e73bde](https://github.com/IBM/node-sdk-core/commit/0e73bde12df3cfab0b9243d0064ef40d93c1072a))

## [2.10.4](https://github.com/IBM/node-sdk-core/compare/v2.10.3...v2.10.4) (2021-05-10)


### Bug Fixes

* upgrade package-lock.json ([#136](https://github.com/IBM/node-sdk-core/issues/136)) ([1780894](https://github.com/IBM/node-sdk-core/commit/1780894d05cd8ba9dca9dd6040ee54ceb91275b5))

## [2.10.3](https://github.com/IBM/node-sdk-core/compare/v2.10.2...v2.10.3) (2021-04-01)


### Bug Fixes

* stub sdk-test-helpers in browser environments ([#132](https://github.com/IBM/node-sdk-core/issues/132)) ([006991b](https://github.com/IBM/node-sdk-core/commit/006991bfe89c0671f9c053457cebe52cec924fed))

## [2.10.2](https://github.com/IBM/node-sdk-core/compare/v2.10.1...v2.10.2) (2021-03-31)


### Bug Fixes

* **deps:** update dependencies to avoid vulnerabilities ([#131](https://github.com/IBM/node-sdk-core/issues/131)) ([b931472](https://github.com/IBM/node-sdk-core/commit/b931472d458b370af2132d387b70aedb067b3fb2))

## [2.10.1](https://github.com/IBM/node-sdk-core/compare/v2.10.0...v2.10.1) (2021-03-16)


### Bug Fixes

* enable symbolic-link credentials files ([#129](https://github.com/IBM/node-sdk-core/issues/129)) ([4b87d42](https://github.com/IBM/node-sdk-core/commit/4b87d423e320163bf34c9126ca06f848355f2ad4))

# [2.10.0](https://github.com/IBM/node-sdk-core/compare/v2.9.0...v2.10.0) (2021-03-13)


### Features

* add getQueryParam utility method to support pagination ([#128](https://github.com/IBM/node-sdk-core/issues/128)) ([d4f067a](https://github.com/IBM/node-sdk-core/commit/d4f067a8607fd10e0ea064e939b9c7f4e49108ce))

# [2.9.0](https://github.com/IBM/node-sdk-core/compare/v2.8.2...v2.9.0) (2021-03-12)


### Features

* support username/apikey use-case in CloudPakForDataAuthenticator ([#126](https://github.com/IBM/node-sdk-core/issues/126)) ([a7ca3a0](https://github.com/IBM/node-sdk-core/commit/a7ca3a083b3580b1776544a2958c90c1608fcc7c))

## [2.8.2](https://github.com/IBM/node-sdk-core/compare/v2.8.1...v2.8.2) (2021-03-12)


### Bug Fixes

* persist `enableGzipCompression` setting on the base service ([#127](https://github.com/IBM/node-sdk-core/issues/127)) ([1398044](https://github.com/IBM/node-sdk-core/commit/13980441fad3e0e71eb5e58ce33d66d63782308e))

## [2.8.1](https://github.com/IBM/node-sdk-core/compare/v2.8.0...v2.8.1) (2021-03-09)


### Bug Fixes

* canonicalize iam url ([#125](https://github.com/IBM/node-sdk-core/issues/125)) ([7ce6588](https://github.com/IBM/node-sdk-core/commit/7ce6588c8d0967d13bc3d548a30787360aae6205))

# [2.8.0](https://github.com/IBM/node-sdk-core/compare/v2.7.2...v2.8.0) (2021-02-19)


### Features

* **iam-authenticator:** expose refresh token with a getter - `getRefreshToken()` ([#122](https://github.com/IBM/node-sdk-core/issues/122)) ([d3c4611](https://github.com/IBM/node-sdk-core/commit/d3c46116e42ae6aff9e4a686e9ae4212635e46f2))

## [2.7.2](https://github.com/IBM/node-sdk-core/compare/v2.7.1...v2.7.2) (2021-02-10)


### Bug Fixes

* **build:** main migration ([#121](https://github.com/IBM/node-sdk-core/issues/121)) ([1919510](https://github.com/IBM/node-sdk-core/commit/19195104395ef830c020c36a0f36b60dce0c8eff))

## [2.7.1](https://github.com/IBM/node-sdk-core/compare/v2.7.0...v2.7.1) (2021-01-07)


### Bug Fixes

* **build:** upgrade semantic-release to latest (17.3.1) ([#120](https://github.com/IBM/node-sdk-core/issues/120)) ([3e3c099](https://github.com/IBM/node-sdk-core/commit/3e3c099ccb2b28d92dfa6d9bc975978aa461f5f7))
* change description inside package.json ([#119](https://github.com/IBM/node-sdk-core/issues/119)) ([30aeda9](https://github.com/IBM/node-sdk-core/commit/30aeda9a413087c351d43a500c336bff7c2fcec8))

# [2.7.0](https://github.com/IBM/node-sdk-core/compare/v2.6.0...v2.7.0) (2020-10-06)


### Features

* add support for compressing request bodies ([#111](https://github.com/IBM/node-sdk-core/issues/111)) ([7692d71](https://github.com/IBM/node-sdk-core/commit/7692d710fc2fb4f2c1cdfb3045d943c15d13bf1d))

# [2.6.0](https://github.com/IBM/node-sdk-core/compare/v2.5.0...v2.6.0) (2020-09-25)


### Features

* upgrade axios and re-enable gzipping responses ([#110](https://github.com/IBM/node-sdk-core/issues/110)) ([9e94251](https://github.com/IBM/node-sdk-core/commit/9e94251fd23cb60517022455017ed34d3a419362))

# [2.5.0](https://github.com/IBM/node-sdk-core/compare/v2.4.5...v2.5.0) (2020-09-18)


### Features

* **IAM Authenticator:** add support for optional 'scope' property ([#109](https://github.com/IBM/node-sdk-core/issues/109)) ([1c258b7](https://github.com/IBM/node-sdk-core/commit/1c258b71470c0228e021c959984cc887d849887b))

## [2.4.5](https://github.com/IBM/node-sdk-core/compare/v2.4.4...v2.4.5) (2020-08-12)


### Bug Fixes

* pin typescript dependency to 3.8.3 ([#107](https://github.com/IBM/node-sdk-core/issues/107)) ([ef27bc9](https://github.com/IBM/node-sdk-core/commit/ef27bc94b7626880cb4ab21c5c711bb98b34272d))

## [2.4.4](https://github.com/IBM/node-sdk-core/compare/v2.4.3...v2.4.4) (2020-08-06)


### Bug Fixes

* use `extend` with deep copy where necessary ([#106](https://github.com/IBM/node-sdk-core/issues/106)) ([566b81f](https://github.com/IBM/node-sdk-core/commit/566b81ffea3e88d148d1a7471b01e436432efb75))

## [2.4.3](https://github.com/IBM/node-sdk-core/compare/v2.4.2...v2.4.3) (2020-08-05)


### Bug Fixes

* support `disableSslVerification` when user provides custom httpsAgent ([#104](https://github.com/IBM/node-sdk-core/issues/104)) ([ef39327](https://github.com/IBM/node-sdk-core/commit/ef39327947a42ed357f19fa0db7f5edd063698c4))

## [2.4.2](https://github.com/IBM/node-sdk-core/compare/v2.4.1...v2.4.2) (2020-07-22)


### Bug Fixes

* move test utilities to lib/ and rely directly on `expect` ([#101](https://github.com/IBM/node-sdk-core/issues/101)) ([57ca4c2](https://github.com/IBM/node-sdk-core/commit/57ca4c2edba31a39bae479a041b974ffd94f31a3))

## [2.4.1](https://github.com/IBM/node-sdk-core/compare/v2.4.0...v2.4.1) (2020-05-14)


### Bug Fixes

* Remove trailing slash from url for extra cases ([#95](https://github.com/IBM/node-sdk-core/issues/95)) ([bcaa168](https://github.com/IBM/node-sdk-core/commit/bcaa168b4717b5921d33f72287f8bfbe7ce812f7))

# [2.4.0](https://github.com/IBM/node-sdk-core/compare/v2.3.2...v2.4.0) (2020-05-05)


### Features

* **token-manager:** Introduce a token-manager class for token handling ([#89](https://github.com/IBM/node-sdk-core/issues/89)) ([23c5f3f](https://github.com/IBM/node-sdk-core/commit/23c5f3ff26ec2c9ae58c47163c93a9a1532998b0))

## [2.3.2](https://github.com/IBM/node-sdk-core/compare/v2.3.1...v2.3.2) (2020-05-04)


### Bug Fixes

* flag required params as missing when explicitly undefined, null, or an empty string ([#90](https://github.com/IBM/node-sdk-core/issues/90)) ([414b674](https://github.com/IBM/node-sdk-core/commit/414b674d607e6dec73a163b0445c1854245f69b2))

## [2.3.1](https://github.com/IBM/node-sdk-core/compare/v2.3.0...v2.3.1) (2020-05-01)


### Bug Fixes

* Strip trailing slashes in sendRequest ([#92](https://github.com/IBM/node-sdk-core/issues/92)) ([3d8f568](https://github.com/IBM/node-sdk-core/commit/3d8f568e3911d3d17811e37c5e701db0508a251e))

# [2.3.0](https://github.com/IBM/node-sdk-core/compare/v2.2.0...v2.3.0) (2020-03-23)


### Features

* add optional cookie jar support ([#85](https://github.com/IBM/node-sdk-core/issues/85)) ([27e0060](https://github.com/IBM/node-sdk-core/commit/27e00606046c77d3060e1b62b9e46d1d25d0dceb))

# [2.2.0](https://github.com/IBM/node-sdk-core/compare/v2.1.0...v2.2.0) (2020-03-05)


### Features

* Pace requests to token server for new auth tokens ([#83](https://github.com/IBM/node-sdk-core/issues/83)) ([b14dc4e](https://github.com/IBM/node-sdk-core/commit/b14dc4eea3a629e66c1aa584a3909b29bf12c7b1))

# [2.1.0](https://github.com/IBM/node-sdk-core/compare/v2.0.4...v2.1.0) (2020-02-14)


### Features

* Pace token refresh requests to avoid rate-limiting ([#79](https://github.com/IBM/node-sdk-core/issues/79)) ([d908c0d](https://github.com/IBM/node-sdk-core/commit/d908c0d16ca9d16803b010ee3311c8589983e6c8))

## [2.0.4](https://github.com/IBM/node-sdk-core/compare/v2.0.3...v2.0.4) (2020-01-30)


### Bug Fixes

* use consistent fields between success and error response objects ([#78](https://github.com/IBM/node-sdk-core/issues/78)) ([902d712](https://github.com/IBM/node-sdk-core/commit/902d712f3623edbec606a3223fb366971532346d))

## [2.0.3](https://github.com/IBM/node-sdk-core/compare/v2.0.2...v2.0.3) (2020-01-16)


### Bug Fixes

* use constant defined by generated sdks for url ([#77](https://github.com/IBM/node-sdk-core/issues/77)) ([cb3cc81](https://github.com/IBM/node-sdk-core/commit/cb3cc810d1a7b40a8471271b239f5158b91b0ce6))

## [2.0.2](https://github.com/IBM/node-sdk-core/compare/v2.0.1...v2.0.2) (2020-01-09)


### Bug Fixes

* export unitTestUtils functions as a module ([#76](https://github.com/IBM/node-sdk-core/issues/76)) ([a148da9](https://github.com/IBM/node-sdk-core/commit/a148da9ad882c97c1c4f1c5417c43958db584e3e))

## [2.0.1](https://github.com/IBM/node-sdk-core/compare/v2.0.0...v2.0.1) (2019-12-06)


### Bug Fixes

* convert test utils to .ts ([#74](https://github.com/IBM/node-sdk-core/issues/74)) ([ceec376](https://github.com/IBM/node-sdk-core/commit/ceec3760d50f8e958d35d4c0ca292f99a58bf795)), closes [#993](https://github.com/IBM/node-sdk-core/issues/993)

# [2.0.0](https://github.com/IBM/node-sdk-core/compare/v1.3.0...v2.0.0) (2019-11-19)


### Features

* changes to node-sdk-core to work with service factory feature ([#72](https://github.com/IBM/node-sdk-core/issues/72)) ([cde4cd6](https://github.com/IBM/node-sdk-core/commit/cde4cd68e5a9910fb4f8abacd90a5a3b44b3f8f5))


### BREAKING CHANGES

* The `BaseService` will no longer look for configurations externally by default. A new factory method is provided to create an instance from external configuration.

* feat: changes to node-sdk-core to work with service factory feature

* `BaseService` constructor will no longer call `configureService`. 

* updated test to reflect base service constructor does not call configureService

* added test for getting credentials from vcap

* removed `name` and `serviceVersion` because they are not referenced anymore

* added comment for vcap parsing function. removed vcap_services dependency

* added debug messages for when returning empty credential

# [1.3.0](https://github.com/IBM/node-sdk-core/compare/v1.2.0...v1.3.0) (2019-10-22)


### Features

* adding configureService method for external config options ([#66](https://github.com/IBM/node-sdk-core/issues/66)) ([7324919](https://github.com/IBM/node-sdk-core/commit/7324919))

# [1.2.0](https://github.com/IBM/node-sdk-core/compare/v1.1.0...v1.2.0) (2019-10-15)


### Features

* export unit test utility methods to be used in SDKs ([#65](https://github.com/IBM/node-sdk-core/issues/65)) ([0305974](https://github.com/IBM/node-sdk-core/commit/0305974))

# [1.1.0](https://github.com/IBM/node-sdk-core/compare/v1.0.0...v1.1.0) (2019-10-14)


### Features

* adding debug logger ([#64](https://github.com/IBM/node-sdk-core/issues/64)) ([6079ca0](https://github.com/IBM/node-sdk-core/commit/6079ca0))

# [1.0.0](https://github.com/IBM/node-sdk-core/compare/v0.3.6...v1.0.0) (2019-10-03)


### Bug Fixes

* Move check for serviceUrl to createRequest ([#47](https://github.com/IBM/node-sdk-core/issues/47)) ([6f04739](https://github.com/IBM/node-sdk-core/commit/6f04739))
* parse result from response in token managers ([6bbe423](https://github.com/IBM/node-sdk-core/commit/6bbe423))
* provide bundlers alternate file for browser support ([#58](https://github.com/IBM/node-sdk-core/issues/58)) ([88a9d16](https://github.com/IBM/node-sdk-core/commit/88a9d16))


### Build System

* drop support for Node versions 6 and 8 ([#33](https://github.com/IBM/node-sdk-core/issues/33)) ([d47c737](https://github.com/IBM/node-sdk-core/commit/d47c737))


### Code Refactoring

* look for credentials file in working dir before home dir ([#46](https://github.com/IBM/node-sdk-core/issues/46)) ([c5556de](https://github.com/IBM/node-sdk-core/commit/c5556de))
* return detailed response as second callback argument ([#34](https://github.com/IBM/node-sdk-core/issues/34)) ([dc24154](https://github.com/IBM/node-sdk-core/commit/dc24154))


### Features

* add `setServiceUrl` method as a setter for the `serviceUrl` property ([#41](https://github.com/IBM/node-sdk-core/issues/41)) ([cfb188f](https://github.com/IBM/node-sdk-core/commit/cfb188f))
* add specific error handling for SSL errors with cloud private instances ([#54](https://github.com/IBM/node-sdk-core/issues/54)) ([056ec9a](https://github.com/IBM/node-sdk-core/commit/056ec9a))
* export `UserOptions` interface from the BaseService ([#50](https://github.com/IBM/node-sdk-core/issues/50)) ([4f0075a](https://github.com/IBM/node-sdk-core/commit/4f0075a))
* implement new authenticators to handle sdk authentication ([#37](https://github.com/IBM/node-sdk-core/issues/37)) ([f876b6d](https://github.com/IBM/node-sdk-core/commit/f876b6d))
* refactor core to use Promises instead of callbacks ([#55](https://github.com/IBM/node-sdk-core/issues/55)) ([9ec8afd](https://github.com/IBM/node-sdk-core/commit/9ec8afd))


### BREAKING CHANGES

* None of the authenticators or request methods take callbacks as arguments anymore - they return Promises instead.
* Users that have credential files in both the working directory and the home directory will see a change in which one is used.
* The internal property `url` no longer exists on the `baseOptions` object, it has been renamed to `serviceUrl`
* The old style of passing credentials to the base service will no longer work. An Authenticator instance MUST be passed in to the base service constructor.
* token managers no longer support user access tokens. use BearerTokenAuthenticator instead
* The class names of the token managers have changed.
* `Icp4dTokenManagerV1` renamed to `Cp4dTokenManager`
* `IamTokenManagerV1` renamed to `IamTokenManager`
* `JwtTokenManagerV1` renamed to `JwtTokenManager`
* The public method `setAuthorizationInfo` is renamed to `setClientIdAndSecret`
* The response body is no longer the 2nd callback argument, the detailed response is. The body is located under the `result` property. The `data` property is removed.
* This SDK may no longer work with applications running on Node 6 or 8.

## [0.3.6](https://github.com/IBM/node-sdk-core/compare/v0.3.5...v0.3.6) (2019-09-16)


### Bug Fixes

* Fix handling of array form parameters. ([#43](https://github.com/IBM/node-sdk-core/issues/43)) ([bad8960](https://github.com/IBM/node-sdk-core/commit/bad8960))

## [0.3.5](https://github.com/IBM/node-sdk-core/compare/v0.3.4...v0.3.5) (2019-08-07)


### Bug Fixes

* share service request wrapper instance with token managers ([#36](https://github.com/IBM/node-sdk-core/issues/36)) ([e7609e2](https://github.com/IBM/node-sdk-core/commit/e7609e2))

## [0.3.4](https://github.com/IBM/node-sdk-core/compare/v0.3.3...v0.3.4) (2019-08-05)


### Bug Fixes

* extend constructor options type to allow additional properties ([#35](https://github.com/IBM/node-sdk-core/issues/35)) ([70af0c9](https://github.com/IBM/node-sdk-core/commit/70af0c9))

## [0.3.3](https://github.com/IBM/node-sdk-core/compare/v0.3.2...v0.3.3) (2019-07-17)


### Bug Fixes

* add deprecation notice for node versions 6 and 8 ([#32](https://github.com/IBM/node-sdk-core/issues/32)) ([9e3c667](https://github.com/IBM/node-sdk-core/commit/9e3c667))

## [0.3.2](https://github.com/IBM/node-sdk-core/compare/v0.3.1...v0.3.2) (2019-06-23)


### Bug Fixes

* read iam client id and secret from environment variables ([#30](https://github.com/IBM/node-sdk-core/issues/30)) ([2247d0a](https://github.com/IBM/node-sdk-core/commit/2247d0a))

## [0.3.1](https://github.com/IBM/node-sdk-core/compare/v0.3.0...v0.3.1) (2019-06-06)


### Bug Fixes

* expose the body in the detailed response under the field `result` ([f4aa4f9](https://github.com/IBM/node-sdk-core/commit/f4aa4f9))

# [0.3.0](https://github.com/IBM/node-sdk-core/compare/v0.2.8...v0.3.0) (2019-06-05)


### Features

* add `IcpTokenManagerV1` as a top-level export of the package ([cfa3e1b](https://github.com/IBM/node-sdk-core/commit/cfa3e1b))
* add new token manager for ICP4D ([ee1ddad](https://github.com/IBM/node-sdk-core/commit/ee1ddad))
* add new token manager for ICP4D ([#26](https://github.com/IBM/node-sdk-core/issues/26)) ([2097a64](https://github.com/IBM/node-sdk-core/commit/2097a64))
* carry `disable_ssl_verification` through to token managers ([4f2f789](https://github.com/IBM/node-sdk-core/commit/4f2f789))

## [0.2.8](https://github.com/IBM/node-sdk-core/compare/v0.2.7...v0.2.8) (2019-05-30)


### Bug Fixes

* default request body size to Infinity ([6cea2b9](https://github.com/IBM/node-sdk-core/commit/6cea2b9))

## [0.2.7](https://github.com/IBM/node-sdk-core/compare/v0.2.6...v0.2.7) (2019-05-24)


### Bug Fixes

* remove node request objects from detailed response ([9ac5673](https://github.com/IBM/node-sdk-core/commit/9ac5673))
* remove node request objects from detailed response ([#25](https://github.com/IBM/node-sdk-core/issues/25)) ([192d8cf](https://github.com/IBM/node-sdk-core/commit/192d8cf))

## [0.2.6](https://github.com/IBM/node-sdk-core/compare/v0.2.5...v0.2.6) (2019-05-21)


### Bug Fixes

* temporarily disable gzipping until axios bug fix is released ([b26a310](https://github.com/IBM/node-sdk-core/commit/b26a310))

## [0.2.5](https://github.com/IBM/node-sdk-core/compare/v0.2.4...v0.2.5) (2019-05-15)


### Bug Fixes

* allow users to debug axios traffic ([fd41509](https://github.com/IBM/node-sdk-core/commit/fd41509))

## [0.2.4](https://github.com/IBM/node-sdk-core/compare/v0.2.3...v0.2.4) (2019-05-07)


### Bug Fixes

* **IAM:** renamed UserOptions iam_secret to iam_client_secret to be consistent with other cores ([f755c9c](https://github.com/IBM/node-sdk-core/commit/f755c9c))

## [0.2.3](https://github.com/IBM/node-sdk-core/compare/v0.2.2...v0.2.3) (2019-05-07)


### Bug Fixes

* do not read credentials file in webpack override scenario ([9af4567](https://github.com/IBM/node-sdk-core/commit/9af4567))
* do not read credentials file in webpack override scenario ([#19](https://github.com/IBM/node-sdk-core/issues/19)) ([ec64ae1](https://github.com/IBM/node-sdk-core/commit/ec64ae1))

## [0.2.2](https://github.com/IBM/node-sdk-core/compare/v0.2.1...v0.2.2) (2019-05-01)


### Bug Fixes

* carry user options from constructor to axios parameters ([65d55ec](https://github.com/IBM/node-sdk-core/commit/65d55ec))

## [0.2.1](https://github.com/IBM/node-sdk-core/compare/v0.2.0...v0.2.1) (2019-04-29)


### Bug Fixes

* allow iam client id and secret to be read from constructor ([#17](https://github.com/IBM/node-sdk-core/issues/17)) ([3c88edb](https://github.com/IBM/node-sdk-core/commit/3c88edb))

# [0.2.0](https://github.com/IBM/node-sdk-core/compare/v0.1.2...v0.2.0) (2019-04-19)


### Features

* allow IAM clientid/secret to be configured ([#14](https://github.com/IBM/node-sdk-core/issues/14)) ([ff8f2e7](https://github.com/IBM/node-sdk-core/commit/ff8f2e7))
