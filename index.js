/* global browser */

function setup() {
  browser.addMockModule('protractorHttpInterceptorModule_', function() {
		var serviceId = 'mockedInterceptor';
console.log('adding module');
    angular.module('protractorHttpInterceptorModule_', [])
      .config(['$httpProvider', configMock])
			.factory(serviceId, [mockedInterceptor]);
			outstandingRequests = 0;
			pendingCallbacks = [];

			window.whenNoRequests = function(callback) {
				if (outstandingRequests <= 0) {
					callback();
				} else {
					pendingCallbacks.push(callback);
				}
			}

			function mockedInterceptor() {
					return {
							request: function (config) {
									outstandingRequests += 1;
									return config;
							},
							response: function (response) {
									outstandingRequests -= 1;
									if (outstandingRequests <= 0) {
										pendingCallbacks.forEach((cb) => cb());
									}
									return response
							}
					};
			}

			function configMock($httpProvider) {
					$httpProvider.interceptors.push('mockedInterceptor');
			}

  });
}

function teardown() {
}

function waitForPromise() {
	return browser.executeAsyncScript('window.whenNoRequests(arguments[arguments.length -1]);')
			.then(function (browserErr) {
				console.log("Done with browser call.")
				if (browserErr) {
						throw 'Error while waiting to sync with the page: ' + JSON.stringify(browserErr);
				}
				return true
			});
}

exports.setup = setup;
exports.teardown = teardown;
exports.waitForPromise = waitForPromise;
exports.skipAngularStability = true
