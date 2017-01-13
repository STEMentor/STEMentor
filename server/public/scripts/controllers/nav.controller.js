app.controller('NavController', ['$http', '$firebaseAuth', '$mdDialog', function($http, $firebaseAuth, $mdDialog) {
  console.log('NavController running');
  var auth = $firebaseAuth();
  var self = this;

  self.logIn = function() {
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  self.logInModal = function(ev) {
    $mdDialog.show({
        controller: 'DiagController as diag',
        templateUrl: '../../views/login-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      })
      .then(function(answer) {
        // logIn();
      });
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
