# Migration Guide for v5

## Breaking Changes

### Node Version
Node version 16 is no longer supported - 18 is the minimum version supported.

### SDK Unit Test Helpers
The formerly available helper functions exposed in this package have been removed. These
functions were intended for use in the unit tests of a generated SDK project.

The functions are now present in a new package called `@ibm-cloud/sdk-test-utilities`.
To continue using the helper functions in SDK test code, install this new package as a
development dependency and import the functions from there. The interface and functions
remain completely identical to the functions formerly exposed in this package.
