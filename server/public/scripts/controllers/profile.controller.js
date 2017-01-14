app.controller('ProfileController', ['$http', '$mdDialog', function($http, $mdDialog) {
  console.log('ProfileController running');
  var self = this;


  angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

  .controller('AppCtrl', function($scope) {
    $scope.imagePath = '../server/public/assets/images/cooldog.jpeg';
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  });

  self.createMessage = function(ev) {
    $mdDialog.show({
      controller: 'MessageController as message',
      templateUrl: '../../views/message-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });

  };


  /**
  Copyright 2016 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
  **/

}]);

// angular.module('cardDemo2', ['ngMaterial'])
//
// .controller('AppCtrl', function($scope) {
//   $scope.imagePath = 'img/washedout.png';
// });
