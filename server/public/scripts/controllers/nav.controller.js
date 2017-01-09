app.controller('NavController', ['$http', function($http) {
  console.log('NavController running');

  (function() {
    'use strict';

    angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('AppCtrl', AppCtrl);

    function AppCtrl($scope) {
      $scope.currentNavItem = 'page1';
    }
  })();

}]);
