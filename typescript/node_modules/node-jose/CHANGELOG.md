# Release Notes

## [2.0.1](https://github.com/cisco/node-jose/compare/2.0.0...2.0.1) (2021-11-15)

The changes in this release are only dependency updates. 

### Update

* update dependencies using minor releases for `buffer`, and `lodash`
* updated devDependencies using minor releases for `bowser`, `browserify-istanbul`, `chai`, `gulp-eslint`, `gulp-istanbul`, `gulp-rename`, `json-loader`, `karma`, 
`karma-chrome-launcher`, `karma-coverage`, `karma-firefox-launcher`, `karma-mocha-reporter`, `karma-safari-applescript-launcher`, `karma-sauce-launcher`,
`karma-sourcemap-loader`, `mocha`, `run-sequence`, `webpack-stream`, and `yargs` 
* updated devDependencies use major release for `webpack`, and `karma-webpack`


## [2.0.0](https://github.com/cisco/node-jose/compare/1.1.4...2.0.0) (2020-09-20)

While all of the changes in this release are only dependency updates and otherwise patch-level changes, it does break compatibility with versions of node.js older than version 10.

### Update

* switch to `karma-safari-applescript-launcher` for improved local Safari testing ([a0db723](https://github.com/cisco/node-jose/commit/a0db7230205d8bb6bfd8d06b7a1ffb4b036700fd))
* update dependencies for `karma`, `karma-mocha`, `mocha`, `webpack-stream`, and `yargs` ([96ee8ff](https://github.com/cisco/node-jose/commit/96ee8ff70dc9fbf08309cf4f5240f3affbffb16d))
* update `node-forge` to latest (shahar-h)([277aab5](https://github.com/cisco/node-jose/commit/277aab5c4c1c5b6b6c3923663d40aa9412f9f49d))
* cherry-pick `lodash` modules to effect smaller footprint (tychenjianjun)([003ef1c](https://github.com/cisco/node-jose/commit/003ef1c1488c5006976e4ead72bf40f63c4b098d))
*  replace `browserify-zlib` with `pako` (taymoork2)([85610d6](https://github.com/cisco/node-jose/commit/85610d6fdf411c72f58d15197e6f935e0b20a695))

## [1.1.4](https://github.com/cisco/node-jose/compare/1.1.3...1.1.4) (2020-03-26)


### Bug Fixes

* fixed issues when used in `react-native` ([8126622](https://github.com/cisco/node-jose/commit/81266229bd966e37433433c0d84d79c2b9d37ee3))
* fixed incorrect usage of `node-forge` buffers ([7e46c1f](https://github.com/cisco/node-jose/commit/7e46c1fa090e7bd09bad420f3c3537429da5cdaa)) ([4014f5c](https://github.com/cisco/node-jose/commit/4014f5c2ceb7bae8b516749f6a329132a115bc24))
* updated dependencies.

### Style

* avoid using var shorthands for UglifyJS's sake ([44edb0a](https://github.com/cisco/node-jose/commit/44edb0a1c53fa5ee80ca34317f47498da3204ee6))


<a name="1.1.3"></a>
## [1.1.3](https://github.com/cisco/node-jose/compare/1.1.2...1.1.3) (2019-03-18)

* fail to verify PS signatures with incorrect padding in node ([93399b6](https://github.com/cisco/node-jose/commit/93399b6))

<a name="1.1.2"></a>
## [1.1.2](https://github.com/cisco/node-jose/compare/1.1.1...1.1.2) (2019-02-28)

* replaced outdated vulnerable lodash dependencies ([b9c4f0e](https://github.com/cisco/node-jose/commit/b9c4f0e))

<a name="1.1.1"></a>
## [1.1.1](https://github.com/cisco/node-jose/compare/1.1.0...1.1.1) (2019-02-01)

* Update node-forge ([6b0bc94](https://github.com/cisco/node-jose/commit/6b0bc94))

<a name="1.1.0"></a>
## [1.1.0](https://github.com/cisco/node-jose/compare/1.0.0...1.1.0) (2018-11-05)


### Bug Fixes

* remove setImmediate/nextTick hack (fixes [#203](https://github.com/cisco/node-jose/issues/203)) ([4e24931](https://github.com/cisco/node-jose/commit/4e24931))
* correct jws verify input validation check (fixes [#210](https://github.com/cisco/node-jose/issues/210)) ([be66519](https://github.com/cisco/node-jose/commit/be66519))
* [node] use native crypto for RS signing (fixes [#202](https://github.com/cisco/node-jose/issues/202)) ([59636c3](https://github.com/cisco/node-jose/commit/59636c3))

### Features

* [node] use native crypto for AES-KW Key-Wrapping ([f18011f](https://github.com/cisco/node-jose/commit/f18011f))
* [node] use native crypto for RSA-OAEP and RSA1_5 encryption ([bba0a13](https://github.com/cisco/node-jose/commit/bba0a13))
* [node] use native crypto for RSA1_5 decryption ([2a9e48a](https://github.com/cisco/node-jose/commit/2a9e48a))
* [node] use native crypto for RSA-PSS ([8a05f35](https://github.com/cisco/node-jose/commit/8a05f35))
* [node] use native crypto for ECDSA ([aa5a48d](https://github.com/cisco/node-jose/commit/aa5a48d))


<a name="1.0.0"></a>
## [1.0.0](https://github.com/cisco/node-jose/compare/0.11.0...1.0.0) (2018-05-30)


### Update

* Create a Key without first creating a KeyStore (#170) ([d5971e46253b311ea8a8b1a1967133867f6f6deb](https://github.com/cisco/node-jose/commit/d5971e46253b311ea8a8b1a1967133867f6f6deb)), closes [#170](https://github.com/cisco/node-jose/issues/170)
* support RSA-PSS in WebCrypto (#171) ([f47abe731796c061a80240706a0c21e35062d975](https://github.com/cisco/node-jose/commit/f47abe731796c061a80240706a0c21e35062d975)), closes [#171](https://github.com/cisco/node-jose/issues/171)
* generate and apply header values when key wrapping (#189) ([370baa4aeee99dc3e4244fbe3cd92fcf4dff80d8](https://github.com/cisco/node-jose/commit/370baa4aeee99dc3e4244fbe3cd92fcf4dff80d8)), closes [#189](https://github.com/cisco/node-jose/issues/189)
* use safe Buffer allocators instead of unsafe constructor (#184) ([0e066babef1d85bcd7066095ba20734b40898f1d](https://github.com/cisco/node-jose/commit/0e066babef1d85bcd7066095ba20734b40898f1d)), closes [#184](https://github.com/cisco/node-jose/issues/184)

### Fix

* better error when given key does not support requested algorithms (#186) ([70b0d76b48f8ae069c4357d65bb1b44f3a6d8e9a](https://github.com/cisco/node-jose/commit/70b0d76b48f8ae069c4357d65bb1b44f3a6d8e9a)), closes [#186](https://github.com/cisco/node-jose/issues/186)

### Build

* update supported test platforms (#188) ([da9a9f24edb8054c41b1d7090eb4e7003e12aed6](https://github.com/cisco/node-jose/commit/da9a9f24edb8054c41b1d7090eb4e7003e12aed6)), closes [#188](https://github.com/cisco/node-jose/issues/188)
* use headless firefox for Travis (#156) ([2008bf46ee299d44d164c8a3147e65b5147384bb](https://github.com/cisco/node-jose/commit/2008bf46ee299d44d164c8a3147e65b5147384bb)), closes [#156](https://github.com/cisco/node-jose/issues/156)

### Package

* Fix wrong repository URL syntax (from @sschuberth) (#160) ([0e4dcbaef2cfa66a4520f4510c205c8c4b68707e](https://github.com/cisco/node-jose/commit/0e4dcbaef2cfa66a4520f4510c205c8c4b68707e)), closes [#160](https://github.com/cisco/node-jose/issues/160)


<a name="0.11.1"></a>
## [0.11.1](https://github.com/cisco/node-jose/compare/0.11.0...0.11.1) (2018-05-15)

**NOTE:** This is a security patch, replacing `base64url` with `b64u` to address a [vulnerability in the previous dependency](https://hackerone.com/reports/321687).

### Chore

* replace base64url with b64u (#179) ([7f88049af5de3593adc00d886150bf2fa8f1ecd4](https://github.com/cisco/node-jose/commit/7f88049af5de3593adc00d886150bf2fa8f1ecd4)), closes [#179](https://github.com/cisco/node-jose/issues/179)



<a name="0.11.0"></a>
# [0.11.0](https://github.com/cisco/node-jose/compare/0.10.0...0.11.0) (2017-11-30)

**NOTICE** This release includes a potentially breaking change.  The default of `jose.JWS.Verifier.verify()` before `0.11.0` was to successfully verify if an embedded key was present and verification succeeds.  Now the default is to instead fail verification.   Applications that rely on embedded keys for JWS verification now must provide an `opts` Object to either `jose.JWS.createVerify()` or `jose.JWS.Verifier.verify()`, with the member `allowEmbeddedKeys` set to `true`.

### Update

* configure if embedded keys can be used for signature verification; contributed by Fraser Winterborn of BlackBerry's Security Research Group  ([959a61d707ed2c8cf6582139a5605119283e4acb](https://github.com/cisco/node-jose/commit/959a61d707ed2c8cf6582139a5605119283e4acb))
* configure option for allowed algorithm ([9a86dd6dac3687ab58c806dfed6deca5a7d73dbb](https://github.com/cisco/node-jose/commit/9a86dd6dac3687ab58c806dfed6deca5a7d73dbb))

### Doc

* Enable syntax highlighting on code areas in README  ([be18233154544cd160c185077cfaf77abea27507](https://github.com/cisco/node-jose/commit/be18233154544cd160c185077cfaf77abea27507))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/cisco/node-jose/compare/0.9.5...0.10.0) (2017-09-29)


### Update

* alias JWS.createVerify to construct a sentence  ([2ed035a90c4ff74b210a8341292b3f9d6444a68d](https://github.com/cisco/node-jose/commit/2ed035a90c4ff74b210a8341292b3f9d6444a68d))
* Provide PBKDF2-based algorithms publicly  ([0a6e324eb5d163d69a58c5cf592cde84057faa40](https://github.com/cisco/node-jose/commit/0a6e324eb5d163d69a58c5cf592cde84057faa40))

### Fix

* HMAC minimum length checks should be better enforced ([859539895b5f63f63c48e1d3871d1e052291af4e](https://github.com/cisco/node-jose/commit/859539895b5f63f63c48e1d3871d1e052291af4e))
* prevent JWK.KeyStore#add from modifying jwk input  ([d1b8d882a1e4735434a317be8e6422bf259eed5d](https://github.com/cisco/node-jose/commit/d1b8d882a1e4735434a317be8e6422bf259eed5d))

### Build

* exclude old browsers from SL tests  ([20fe41ee982368123173995ba667c053608ff0bb](https://github.com/cisco/node-jose/commit/20fe41ee982368123173995ba667c053608ff0bb))


<a name="0.9.5"></a>
## [0.9.5](https://github.com/cisco/node-jose/compare/0.9.4...0.9.5) (2017-08-07)

### Update

* prevent embedding 'oct' keys in JWS objects  ([9e0c4dd81315306dc3e857142c84d69fba5c9519](https://github.com/cisco/node-jose/commit/9e0c4dd81315306dc3e857142c84d69fba5c9519))

### Fix

* coerce "kid" during lookup  ([bbe4d739e04e2b8a9e49c1e9235fc057dc952364](https://github.com/cisco/node-jose/commit/bbe4d739e04e2b8a9e49c1e9235fc057dc952364)), closes [#109](https://github.com/cisco/node-jose/issues/109)
* regression errors with Safari  ([7d8070cba5891506e0b5e978948ef9d1ba98a81f](https://github.com/cisco/node-jose/commit/7d8070cba5891506e0b5e978948ef9d1ba98a81f)), closes [#123](https://github.com/cisco/node-jose/issues/123) [#125](https://github.com/cisco/node-jose/issues/125)

### Doc

* Add key hints and status badges to README  ([57916db0133d5ee97c5a34f32b80a46b6d63cb3a](https://github.com/cisco/node-jose/commit/57916db0133d5ee97c5a34f32b80a46b6d63cb3a))

### Build

* bundle package-lock.json for devel  ([3491d882b68270091ced996728b669a1c10086ef](https://github.com/cisco/node-jose/commit/3491d882b68270091ced996728b669a1c10086ef))
* support node-v8 in travis  ([60ba1e7312423ab3d1dee1f3f53c997f5b6f0d34](https://github.com/cisco/node-jose/commit/60ba1e7312423ab3d1dee1f3f53c997f5b6f0d34))


<a name="0.9.4"></a>
## [0.9.4](https://github.com/cisco/node-jose/compare/0.9.3...0.9.4) (2017-04-13)


### Update

* Use native RSA/OpenSSL crypto whenever possible  ([0d1a8cdc351988d74ac42398c3d973902db3d808](https://github.com/cisco/node-jose/commit/0d1a8cdc351988d74ac42398c3d973902db3d808))
* use npm-published base64url implementation  ([c6b30c91502ffef9b9d3addc8bdb1b8b0cc36e69](https://github.com/cisco/node-jose/commit/c6b30c91502ffef9b9d3addc8bdb1b8b0cc36e69)), closes [#96](https://github.com/cisco/node-jose/issues/96)
* use npm-published node-forge implementation ([0f4e0ab57839eaf6dd40c46be511afe3aec9ca44](https://github.com/cisco/node-jose/commit/0f4e0ab57839eaf6dd40c46be511afe3aec9ca44)), closes [#96](https://github.com/cisco/node-jose/issues/96)
* Use WebCrypto API for PBKDF2  ([5e5b9d376f334fa50bb69331e3065e2011c8e9c7](https://github.com/cisco/node-jose/commit/5e5b9d376f334fa50bb69331e3065e2011c8e9c7))

### Doc

* Fix wrong links to JWA and JWK specifications  ([538829dd4af480989422efec20a2c60f809d8d5c](https://github.com/cisco/node-jose/commit/538829dd4af480989422efec20a2c60f809d8d5c)), closes [#102](https://github.com/cisco/node-jose/issues/102)

### Build

* sourcemaps for karma tests  ([a571bd107d87df12bd9f076ade2a875c01b4b24d](https://github.com/cisco/node-jose/commit/a571bd107d87df12bd9f076ade2a875c01b4b24d))
* update karma-firefox-launcher to version 1.0.1  ([84f5f531783e4e50674532fa5c809dff4e6dc25c](https://github.com/cisco/node-jose/commit/84f5f531783e4e50674532fa5c809dff4e6dc25c))
* update travis-ci for newer environments  ([55b91bb0b4bb158d9275dfc89c1de688e14163ed](https://github.com/cisco/node-jose/commit/55b91bb0b4bb158d9275dfc89c1de688e14163ed))
* update yargs to version 7.0.1  ([af24f9e951b1078a088caf50acc13296c0076f68](https://github.com/cisco/node-jose/commit/af24f9e951b1078a088caf50acc13296c0076f68))


<a name="0.9.3"></a>
## [0.9.3](https://github.com/cisco/node-jose/compare/0.9.2...v0.9.3) (2017-02-20)


### Update

* maintain dependencies via Greenkeeper ([2fde860746b009b6522fd9a990b4a62c34d034e4](https://github.com/cisco/node-jose/commit/2fde860746b009b6522fd9a990b4a62c34d034e4))
* update jsbn to version 1.1.0  ([8a83b10c860e3c36aa581e890f5eeea7db23ec35](https://github.com/cisco/node-jose/commit/8a83b10c860e3c36aa581e890f5eeea7db23ec35))

### Fix

* Validate EC public key is on configured curve  ([f92cffb4a0398b4b1158be98423369233282e0af](https://github.com/cisco/node-jose/commit/f92cffb4a0398b4b1158be98423369233282e0af))

### Doc

* note webpack support ([b011c001958c2e346b522e87cdb107f01e584da9](https://github.com/cisco/node-jose/commit/b011c001958c2e346b522e87cdb107f01e584da9))

### Build

* additional tests on ECDH failures  ([af19f289811e75522bb8de662e76b1aef15a95fa](https://github.com/cisco/node-jose/commit/af19f289811e75522bb8de662e76b1aef15a95fa))
* update gulp-mocha to latest version 🚀 ([1e44875e9c1cad370cc44808bddf5fab99226eb0](https://github.com/cisco/node-jose/commit/1e44875e9c1cad370cc44808bddf5fab99226eb0))
* Update webpack to the latest version 🚀  ([bb513056143ad2ecf7b44862d3d7ac00e80852eb](https://github.com/cisco/node-jose/commit/bb513056143ad2ecf7b44862d3d7ac00e80852eb))


<a name="0.9.2"></a>
## [0.9.2](https://github.com/cisco/node-jose/compare/0.9.1...0.9.2) (2016-12-29)


### Build

* include browser tests in travis-ci  ([4005f315f880add9aba33c1cbc7fb2c0a3a7a3d5](https://github.com/cisco/node-jose/commit/4005f315f880add9aba33c1cbc7fb2c0a3a7a3d5))

### Fix

* improper call to base64url.decode  ([e15d17c342c5374c8e953a2aa975c1a9daf1766a](https://github.com/cisco/node-jose/commit/e15d17c342c5374c8e953a2aa975c1a9daf1766a)), closes [#80](https://github.com/cisco/node-jose/issues/80)
* node v6+ emits UnhandledPromiseRejectionWarning  ([6b5dbdfa9e9907ae547a6bce2a918fcc6c25368e](https://github.com/cisco/node-jose/commit/6b5dbdfa9e9907ae547a6bce2a918fcc6c25368e)), closes [#79](https://github.com/cisco/node-jose/issues/79)


<a name="0.9.1"></a>
## [0.9.1](https://github.com/cisco/node-jose/compare/0.9.0...0.9.1) (2016-08-23)


### Build

* upgrade build environment  ([8f625984d668c160db0fea7ba48413b3e9320766](https://github.com/cisco/node-jose/commit/8f625984d668c160db0fea7ba48413b3e9320766))


<a name="0.9.0"></a>
## [0.9.0](https://github.com/cisco/node-jose/compare/0.8.1...0.9.0) (2016-07-17)


### Update

* find keys embedded in JWS header ([445381dd628936a9a3d4b8ff59794f96a0f34adb](https://github.com/cisco/node-jose/commit/445381dd628936a9a3d4b8ff59794f96a0f34adb)), closes [#65](https://github.com/cisco/node-jose/issues/65)

### Fix

* incorrect member name for unprotected JWS header  ([6c6028c1619a500cb098b68fed0b83c52029823f](https://github.com/cisco/node-jose/commit/6c6028c1619a500cb098b68fed0b83c52029823f))



<a name="0.8.1"></a>
## [0.8.1](https://github.com/cisco/node-jose/compare/0.8.0...0.8.1) (2016-07-13)

### Fix

* Documentation typo ([c8e27f517ce444ac13a8602f4e83da664c6fb34e](https://github.com/cisco/node-jose/commit/c8e27f517ce444ac13a8602f4e83da664c6fb34e))
* Issues with latest browserify-buffer ([476e4d7fe743a50b6fd62ef1259d2db03d2313eb](https://github.com/cisco/node-jose/commit/476e4d7fe743a50b6fd62ef1259d2db03d2313eb))
* Typo in lib/algorithms/constants ([480721085b405c24349d5ead321c01d92941bdd2](https://github.com/cisco/node-jose/commit/480721085b405c24349d5ead321c01d92941bdd2))
* Remove warnings from webpack ([5056b6e29168ff147a948da908f305f90b60c45e](https://github.com/cisco/node-jose/commit/5056b6e29168ff147a948da908f305f90b60c45e))

### Build

* Further restrict what is published ([8e8f779cf84fe4d359123fa502276dfcad47ba0b](https://github.com/cisco/node-jose/commit/8e8f779cf84fe4d359123fa502276dfcad47ba0b))
* Reconcile git-prefixed dependencies ([2b6bd1ec3f61ae301c9d631c1ff623b480ddd31b](https://github.com/cisco/node-jose/commit/2b6bd1ec3f61ae301c9d631c1ff623b480ddd31b))


<a name="0.8.0"></a>
## [0.8.0](https://github.com/cisco/node-jose/compare/0.7.1...0.8.0) (2016-04-18)


### Update

* support 'crit' header member ([2a05a6700b5828a32d5b51e707b4c171a08d3ec4](https://github.com/cisco/node-jose/commits/2a05a6700b5828a32d5b51e707b4c171a08d3ec4))

### Fix

* failures on different browser platforms ([d06fe17ae791f14d777e2492cefffd79404e199f](https://github.com/cisco/node-jose/commits/d06fe17ae791f14d777e2492cefffd79404e199f))

### Build

* integrate travis-ci ([7dc80e735579c0f612256db7dd242b415520707f](https://github.com/cisco/node-jose/commits/7dc80e735579c0f612256db7dd242b415520707f))



<a name="0.7.1"></a>
## [0.7.1](https://github.com/cisco/node-jose/compare/0.7.0...0.7.1) (2016-02-09)


### Fix

* fix throws and rejects to be error objects and consistent ([89325da4b183817a7c412af98f2aa2b9dce97ff9](https://github.com/cisco/node-jose/commit/89325da4b183817a7c412af98f2aa2b9dce97ff9))
* only honor isPrivate in JWK.toJSON() if it is actually a Boolean ([9f2f813fc5a10e0d477d5c06e4e719027b6cddbb](https://github.com/cisco/node-jose/commit/9f2f813fc5a10e0d477d5c06e4e719027b6cddbb))



<a name="0.7.0"></a>
## [0.7.0](https://github.com/cisco/node-jose/compare/0.6.0...0.7.0) (2016-01-14)


### Update

* implement JWK thumbprint support [RFC 7638] ([e57384cbf84cc30d8cc0be2b1f881107c4c74577](https://github.com/cisco/node-jose/commit/e57384cbf84cc30d8cc0be2b1f881107c4c74577))
* support Microsoft Edge ([5ea3c881045388992511f61c9bfc17c8ab62f066](https://github.com/cisco/node-jose/commit/5ea3c881045388992511f61c9bfc17c8ab62f066))



<a name="0.6.0"></a>
## [0.6.0](https://github.com/cisco/node-jose/compare/0.5.2...0.6.0) (2015-12-12)


### Update

* export EC keys as PEM ([71d382ef06112dd6f71f7feec8c017b72695d20f](https://github.com/cisco/node-jose/commit/71d382ef06112dd6f71f7feec8c017b72695d20f))
* export RSA keys as PEM ([e6ef2ef9aeddb0afc92d55222ae7669c87a3f6f1](https://github.com/cisco/node-jose/commit/e6ef2ef9aeddb0afc92d55222ae7669c87a3f6f1))
* import EC and RSA keys from "raw" PEM ([f7a6dcab643209347b7bf68cb014d12e1698e8ff](https://github.com/cisco/node-jose/commit/f7a6dcab643209347b7bf68cb014d12e1698e8ff))
* import EC and RSA "raw" private keys from DER ([f3cd2679317cec5a8a80f0634f777e4bc8ace4cd](https://github.com/cisco/node-jose/commit/f3cd2679317cec5a8a80f0634f777e4bc8ace4cd))
* harmonize output from JWE.decrypt and JWS.verify ([ed0ea52e4fc4cc70920f2ce39bda11b09c45f214](https://github.com/cisco/node-jose/commit/ed0ea52e4fc4cc70920f2ce39bda11b09c45f214))


<a name="0.5.2"></a>
## [0.5.2](https://github.com/cisco/node-jose/compare/0.5.1...0.5.2) (2015-11-30)


### Fix

* polyfill should not override native Promise ([7ff0d4e6828e9b21ed12f98118a630d195ed7c9b](https://github.com/cisco/node-jose/commit/7ff0d4e6828e9b21ed12f98118a630d195ed7c9b))

### Doc

* fix wrong decryption sample code in README.md ([733d23f012b90a1b15f5474b7d25b7523d1a6e66](https://github.com/cisco/node-jose/commit/733d23f012b90a1b15f5474b7d25b7523d1a6e66))

### Build

* add code coverage for node + browsers ([4638bd52f81d2163df0aea71e09c4bd564dcee14](https://github.com/cisco/node-jose/commit/4638bd52f81d2163df0aea71e09c4bd564dcee14))
* add code coverage for node + browsers ([df7d8cd0e28e6f381194fb27ea9b5df3a2968b60](https://github.com/cisco/node-jose/commit/df7d8cd0e28e6f381194fb27ea9b5df3a2968b60))


<a name="0.5.1"></a>
## [0.5.1](https://github.com/cisco/node-jose/compare/0.5.0...0.5.1) (2015-11-19)


### Fix

* 'stack exceeded' error on node.js 0.10 ([4ad481210adae7cdc2a06a6c25ddcefe33eff395](https://github.com/cisco/node-jose/commit/4ad481210adae7cdc2a06a6c25ddcefe33eff395))
* address errors with setImmediate in IE ([caa32813dfb059955f0069f76cfee44c40c35c55](https://github.com/cisco/node-jose/commit/caa32813dfb059955f0069f76cfee44c40c35c55))

### Build

* add CGMKW test ([3643a9c5bc476c9ff2423858c772401b0b06557d](https://github.com/cisco/node-jose/commit/3643a9c5bc476c9ff2423858c772401b0b06557d))
* expand the saucelabs platforms ([5eef84db07cfb8069853b2ee072d5888aaf16106](https://github.com/cisco/node-jose/commit/5eef84db07cfb8069853b2ee072d5888aaf16106))


<a name="0.5.0"></a>
## [0.5.0](https://github.com/cisco/node-jose/compare/0.4.0...0.5.0) (2015-10-31)


### Update

* Support extra fields and x5t generation when importing a cert ([0d52aa5dabe6af29a08c2e299fc6be9ff5e81fca](https://github.com/cisco/node-jose/commit/0d52aa5dabe6af29a08c2e299fc6be9ff5e81fca))
* Support deprecated `A*CBC+HS*` algorithms (aka the "plus" algorithms) ([d682e2920eeb9ff6599d7115f2dfbd705104603f](https://github.com/cisco/node-jose/commit/d682e2920eeb9ff6599d7115f2dfbd705104603f))

### Fix

* base64url does not work on IE  ([1ab757265ff2a160e49e870231590b2a47a4537b](https://github.com/cisco/node-jose/commit/1ab757265ff2a160e49e870231590b2a47a4537b)), closes [#16](https://github.com/cisco/node-jose/issues/16)
* When an assumed key is provided, use it over any others ([9df51df13c153958661b7f76c7f1f2c3d322c109](https://github.com/cisco/node-jose/commit/9df51df13c153958661b7f76c7f1f2c3d322c109)), fixes [#14](https://github.com/cisco/node-jose/issues/14)


<a name="0.4.0"></a>
## [0.4.0](https://github.com/cisco/node-jose/compare/0.3.1...0.4.0) (2015-10-12)


### Breaking

* Use external implementation of base64url ([78009311235006e1a2c76e1dadd78e200d4f954b](https://github.com/cisco/node-jose/commit/78009311235006e1a2c76e1dadd78e200d4f954b))

### Update

* Import a RSA or EC key from ASN.1 (PEM or DER) ([cab7fc1e6e2551e5bebda0ec0ab0e6340ed564f3](https://github.com/cisco/node-jose/commit/cab7fc1e6e2551e5bebda0ec0ab0e6340ed564f3))
* Include key in JWS.verify result ([d1267b29a120499d3a86b7213e7db6855c61d6c3](https://github.com/cisco/node-jose/commit/d1267b29a120499d3a86b7213e7db6855c61d6c3))


<a name="0.3.1"></a>
## [0.3.1](https://github.com/cisco/node-jose/compare/0.3.0...0.3.1) (2015-10-06)


### Fix

* JWE encryption fails for ECDH keys  ([3ecb7be38c237b09866b1ab3e7525dd6351e8153](https://github.com/cisco/node-jose/commit/3ecb7be38c237b09866b1ab3e7525dd6351e8153)), closes [#3](https://github.com/cisco/node-jose/issues/3)

* proper name for file header ([6364553ddf581c7628f4ea79877fec57545dff92](https://github.com/cisco/node-jose/commit/6364553ddf581c7628f4ea79877fec57545dff92))

### Update

* provide a generic parse() method to see header(s) and generically unwrap ([ecc859691395114cd7db644171e2c1b2e1015c8b](https://github.com/cisco/node-jose/commit/ecc859691395114cd7db644171e2c1b2e1015c8b))
* support parsing Buffer ([580f763d0dfc63d5f6fdbde3bfec6f52a5218636](https://github.com/cisco/node-jose/commit/580f763d0dfc63d5f6fdbde3bfec6f52a5218636))

### Doc

* fix code blocks to render as blocks consistently ([5f1a7ace4c8871065c3a9d09d8f38f09b8096413](https://github.com/cisco/node-jose/commit/5f1a7ace4c8871065c3a9d09d8f38f09b8096413))
* update readme to reflect NPM publication ([936058bc9ff19049327486842335324e34f1d73e](https://github.com/cisco/node-jose/commit/936058bc9ff19049327486842335324e34f1d73e))

### Build

* browserify is only a devDependency ([17880c401daea03f26af6438b2681232e3654a58](https://github.com/cisco/node-jose/commit/17880c401daea03f26af6438b2681232e3654a58))


<a name="0.3.0"></a>
## [0.3.0] (2015-09-11)

Initial public release.
