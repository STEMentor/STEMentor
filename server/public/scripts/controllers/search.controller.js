app.controller('SearchController', ['$http', function($http) {
  console.log('SearchController running');

  angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('DemoCtrl', function($scope) {
      $scope.user = {
        company: 'Google',
      };

      $scope.states = (
      'WY').split(' ').map(function(state) {
          return {abbrev: state};
        });
    })
    .config(function($mdThemingProvider) {

      // Configure a dark theme with primary foreground yellow

      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

    });

  angular.module('Checkbox',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

    .controller('AppCtrl', function($scope) {

      $scope.data = {};
  

    });


}]);


  /**
  Copyright 2016 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
  **/
