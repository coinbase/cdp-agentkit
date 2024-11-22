/**
 * (C) Copyright IBM Corp. 2019, 2024.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { expect } = require('expect');

/**
 * This module provides a set of utility methods used to reduce code duplication in the generated unit tests
 * for the SDKs that depend on this core package. Note that these methods are not used by the tests for this
 * package - they are meant to be exported and made available to dependent libraries.
 */

/**
 * Takes the request options constructed by the SDK and checks that the `url` and `method` properties
 * were set to their correct values.
 *
 * @param options - the options object put together by the SDK, retrieved from the createRequest mock
 * @param url - The URL path of the service endpoint, from the paths section of the API definition
 * @param method - The HTTP method for the request, from the API definition
 */
function checkUrlAndMethod(options, url, method) {
  expect(options.url).toEqual(url);
  expect(options.method).toEqual(method);
}

/**
 * Takes the mock object for the `createRequest` method, extracts the headers that were sent with the call,
 * and checks for the expected values for `Accept` and `Content-Type`. This to verify that the SDK sets
 * the correct values in the code.
 *
 * @param createRequestMock - the jest mock object for the `createRequest` method in the `RequestWrapper` class
 * @param accept - the expected value for the `Accept` header
 * @param contentType - the expected value for the `Content-Type` header
 */
function checkMediaHeaders(createRequestMock, accept, contentType) {
  const { headers } = createRequestMock.mock.calls[0][0].defaultOptions;
  expect(headers.Accept).toEqual(accept);
  expect(headers['Content-Type']).toEqual(contentType);
}

/**
 * Takes the mock object for the `createRequest` method, extracts the headers that were sent with the call,
 * and checks for the expected value for a user-defined header. This is verify that the SDK accepts header
 * parameters and sends them as headers in the request.
 *
 * @param createRequestMock - the jest mock object for the `createRequest` method in the `RequestWrapper` class
 * @param userHeaderName - the name of the header passed by the user, e.g. `Contained-Content-Type`
 * @param userHeaderValue - the expected value for the header passed by the user
 */
function checkUserHeader(
  createRequestMock,
  userHeaderName,
  userHeaderValue
) {
  const { headers } = createRequestMock.mock.calls[0][0].defaultOptions;
  expect(headers[userHeaderName]).toEqual(userHeaderValue);
}

/**
 * This method simply ensures that the method executed without any issues by extracting
 * the argument from the mock object for the `createRequest` method and verifying that it is an object.
 *
 * @param createRequestMock - the jest mock object for the `createRequest` method in the `RequestWrapper` class
 */
function checkForSuccessfulExecution(createRequestMock) {
  const sdkParams = createRequestMock.mock.calls[0][0];
  expect(typeof sdkParams).toEqual('object');
}

/**
 * This method extracts the `options` property from the object passed into `createRequest`. This property is
 * an object containing all of the SDK method-specific information (like `path` and `body`) used to build a request.
 * This method is just a convenience method for the unit tests to be able to make assertions on the items in the request.
 *
 * @param createRequestMock - the jest mock object for the `createRequest` method in the `RequestWrapper` class
 * @returns Object
 */
function getOptions(createRequestMock) {
  return createRequestMock.mock.calls[0][0].options;
}

/**
 * This method simply ensures that the SDK methods return Promises by checking for
 * the `then` function - common way to assess whether or not an object is a Promise.
 *
 * @param sdkPromise - the Promise returned by an SDK method
 */
function expectToBePromise(sdkPromise) {
  expect(typeof sdkPromise.then).toBe('function');
}

module.exports = {
  checkUrlAndMethod,
  checkMediaHeaders,
  checkUserHeader,
  checkForSuccessfulExecution,
  getOptions,
  expectToBePromise,
};
