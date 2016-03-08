/* global browser */
/* global protractor */
'use strict';

var enabled = false;
function setup() {
  browser.addMockModule('protractorHttpInterceptorModule_', function() {
    var serviceId = 'mockedInterceptor';
    angular.module('protractorHttpInterceptorModule_', [])
        .config([ '$httpProvider', configMock ])
        .factory(serviceId, [ mockedInterceptor ]);
    var outstandingRequests = 0;
    var pendingCallbacks = [];

    window.whenNoRequests = function(callback) {
      if (outstandingRequests <= 0) {
        callback();
      } else {
        pendingCallbacks.push(callback);
      }
    };

    function mockedInterceptor() {
      return {
        request : function(config) {
          outstandingRequests += 1;
          return config;
        },
        response : function(response) {
          outstandingRequests -= 1;
          if (outstandingRequests <= 0) {
            pendingCallbacks.forEach((cb) => cb());
          }
          pendingCallbacks = [];
          return response
        }
      };
    }

    function configMock($httpProvider) {
      $httpProvider.interceptors.push('mockedInterceptor');
    }

  });

  protractor.waitForXHROnly = function(enable) {
    if (enable) {
      enabled = true;
      exports.skipAngularStability = true;
    } else {
      enabled = false;
      exports.skipAngularStability = false;
    }
  };
}

function waitForPromise() {
  if (enabled) {
    return browser
        .executeAsyncScript(
            'window.whenNoRequests(arguments[arguments.length -1]);')
        .then(function(browserErr) {
          if (browserErr) {
            throw 'Error while waiting to sync with the page: ' +
                JSON.stringify(browserErr);
          }
          return true
        });
  } else {
    return null;
  }
}

exports.setup = setup;
exports.waitForPromise = waitForPromise;
exports.skipAngularStability = false;
