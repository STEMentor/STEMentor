app.controller('NavController', ['$http', '$firebaseAuth', '$mdDialog', 'AuthFactory', function($http, $firebaseAuth, $mdDialog, AuthFactory) {
  console.log('NavController running');
  var auth = $firebaseAuth();
  var self = this;

  self.logInModal = function(ev) {
    $mdDialog.show({
        controller: 'LoginController as login',
        templateUrl: '../../views/login-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      })
      .then(function(answer) {
        // logIn();
      });
  };

  self.userStatus = AuthFactory.userStatus;

  self.logOut = function() {
    console.log('logging user out');
    AuthFactory.logOut();
  };

}]);

// $scope.showAdvanced = function(ev) {
//     $mdDialog.show({
//       controller: DialogController,
//       templateUrl: 'dialog1.tmpl.html',
//       parent: angular.element(document.body),
//       targetEvent: ev,
//       clickOutsideToClose:true,
//       fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
//     })
//     .then(function(answer) {
//       $scope.status = 'You said the information was "' + answer + '".';
//     }, function() {
//       $scope.status = 'You cancelled the dialog.';
//     });
//   };
