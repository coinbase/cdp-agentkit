# SDK Test Utilities

A set of utility methods for unit tests in IBM Cloud SDKs.

This package is published separately from `ibm-cloud-sdk-core`. It includes `expect`
as a dependency, which is not intended for inclusion in production packages. This
utility package should only be installed as a _development_ dependency and the logic
it contains will only ever be needed for tests.
