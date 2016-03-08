# protractor-xhr-only-plugin

This plugin adds the ability to change how Protractor synchronizes with Angular.

You enable this plugin in your config file:
```js
exports.config = {
  plugins: [{
    package: 'protractor-xhr-only-plugin',
  }]
};
```

In your tests, you can change Protractor's synchronization by calling protractor.waitForXHROnly(), like so.
```js
  it('should be able to wait only for $http, not $timeout', function() {
    var loadButton = element(by.id('load-button'));
    var loadStatus = element(by.id('load-status'));

    protractor.waitForXHROnly(true);
    // Will wait only for outstanding $http calls to resolve.
    loadButton.click();
    expect(loadStatus.getText()).toEqual('Waiting on timeout');

    protractor.waitForXHROnly(false);
    // Will now wait for $timeout and $http calls to resove.
    loadButton.click();
    expect(loadStatus.getText()).toEqual('Timeout done.');
  });
```

Protractor will use the default behavior (waiting for all outstanding $http and $timeout calls) until the first call to protractor.waitForXHROnly(true);
