describe('exchange rate tool', function() {
  beforeEach(function() {
    browser.get('http://localhost:3456');
  });

  var loadButton = element(by.id('load-button'));
  var loadStatus = element(by.id('load-status'));

  it('should be able to wait only for $http, not $timeout', function() {
    protractor.waitForXHROnly(true);
    loadButton.click();
    expect(loadStatus.getText()).toEqual('Waiting on timeout');
  });

  it('should wait for $timeout by default', function() {
    protractor.waitForXHROnly(false);
    loadButton.click();
    expect(loadStatus.getText()).toEqual('Timeout done.');
  });
});
