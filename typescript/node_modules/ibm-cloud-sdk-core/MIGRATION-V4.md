# Migration Guide for v4

## Breaking Changes

### Node Version
Node version 12 is no longer supported - 14 is the minimum version supported.

### TypeScript Version
The `typescript` development dependnecy is now required to be at least version 4.

Run `npm install -D typescript@4` to upgrade to version 4.

Code produced by the IBM OpenAPI SDK Generator should already be compliant with TypeScript v4.

Additionally, you may need to upgrade `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` to
v5 to be compatible with the new version of TypeScript. This upgrade should be safe and compatible.

Run `npm i -D '@typescript-eslint/eslint-plugin@latest' '@typescript-eslint/parser@latest'` to upgrade.

### Jest Version
The `jest` development dependency is now required to be at least version 29.

Run `npm install -D jest@29` to upgrade to version 29.

Code produced by the IBM OpenAPI Generator should already be compliant with Jest v29.

Note: Ensure your test code does not contain the anti-pattern of using a `done` callback with an `async` function.
This is no longer permitted in Jest 29, whereas it was discouraged but permitted in previous versions. An old version of the IBM OpenAPI SDK Generator included a bug that generated this pattern. If your generated test code has not been updated since then, you may run into this issue.

Example diff showing proper resolution:
```
diff --git a/test/integration/example.v1.test.js b/test/integration/example.v1.test.js
index be0bec3..62f03f8 100644
--- a/test/integration/example.v1.test.js
+++ b/test/integration/example.v1.test.js
@@ -38,7 +38,7 @@ describe('ExampleV1_integration', () => {
   jest.setTimeout(timeout);
   let example;
 
-  beforeAll(async (done) => {
+  beforeAll(async () => {
     example = ExampleV1.newInstance({});
 
     const config = readExternalSources(ExampleV1.DEFAULT_SERVICE_NAME);
@@ -58,8 +58,6 @@ describe('ExampleV1_integration', () => {
 
     log(`Service URL: ${example.baseOptions.serviceUrl}`);
     log('Finished setup.');
-
-    done();
   });
 
   test('getSomething()', async () => {
```
