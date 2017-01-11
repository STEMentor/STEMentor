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


  self.newSearch = {first_name: null, last_name:null, email: null, company: null,
                    job_title:null, zip: null, race: null, sex: null, orientation: null,
                    birthday: null, school: null, degree: null, major: null, language: null};
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });


  self.getMentors = function() {
    return $http({
          method: 'GET',
          url: '/mentors',
          headers: {
            newSearch: newSearch
          }
        })
        .then(function (response) {
          self.mentors = response.data;
          console.log(mentors);
        }),
        function(err){
          console.log("Error with search get request ", err);
        };

  }
/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/
