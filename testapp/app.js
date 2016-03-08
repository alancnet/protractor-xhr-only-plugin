var ExchangeCtrl = function($timeout, $scope, $http) {
  $scope.loadStatus = '';

  $scope.loadExchangeRate = function() {
    $scope.loadStatus = "loading"
    $http.get('/rates').then(() => {
      $scope.loadStatus = "Waiting on timeout"
      $timeout(() => {
        $scope.loadStatus = "Timeout done."
      }, 3000);
    });
  };
};

var app = angular.module('app', []).
    controller('ExchangeCtrl', ExchangeCtrl);
