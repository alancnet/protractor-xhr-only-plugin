describe('exchange rate tool', function() {
  beforeEach(function() {
    browser.get('http://localhost:3456');
  });

  it('should be able to wait only for $http, not $timeout', function() {
    var loadButton = element(by.id('load-button'));
    var loadStatus = element(by.id('load-status'));

    protractor.waitForXHROnly(true);
    loadButton.click();
    expect(loadStatus.getText()).toEqual('Waiting on timeout');
  });

  it('should wait for $timeout by default', function() {
    var loadButton = element(by.id('load-button'));
    var loadStatus = element(by.id('load-status'));

    protractor.waitForXHROnly(false);
    loadButton.click();
    expect(loadStatus.getText()).toEqual('Timeout done.');
  });
});
