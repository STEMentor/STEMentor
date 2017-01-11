app.controller('SearchController', ['$http', function($http) {
  console.log('SearchController running');

  angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('DemoCtrl', function($scope) {

      angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .controller('DemoCtrl', function($scope) {
    $scope.user = {
      city: 'Mountain View',

    };

    $scope.states = (
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });
  })
  .config(function($mdThemingProvider) {


    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });


/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/

    });
  //
  // self.newSearch = {};
  //
  //
  // self.mentors = [];
  //
  // self.getMentors = function() {
  //   return $http({
  //         method: 'GET',
  //         url: '/mentors',
  //         headers: {
  //           newSearch: newSearch
  //         }
  //       })
  //       .then(function (response) {
  //         self.mentors = response.data;
  //         console.log(mentors);
  //
  //       });
  //   .catch(function (error) {
  //     console.log('An error has occurred');
  //   });
  // }

}]);


  /**
  Copyright 2016 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
  **/
