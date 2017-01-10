app.controller('NavController', ['$http', '$firebaseAuth', function($http, $firebaseAuth) {
  console.log('NavController running');
  var auth = $firebaseAuth();
  var self = this;

  self.logIn = function() {
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  (function() {
    'use strict';

    angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
    .controller('AppCtrl', AppCtrl);

    function AppCtrl($scope) {
      $scope.currentNavItem = 'page1';
    }
  })();

}]);
