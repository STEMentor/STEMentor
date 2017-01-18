app.controller('NavController', ['$http', '$firebaseAuth', '$mdDialog', 'AuthFactory', 'BioFactory', function($http, $firebaseAuth, $mdDialog, AuthFactory, BioFactory) {
  console.log('NavController running');
  var auth = $firebaseAuth();
  var self = this;

  var userId = AuthFactory.userStatus.userId;
  self.userStatus = AuthFactory.userStatus;

  self.logInModal = function(ev) {
    $mdDialog.show({
        controller: 'LoginController as login',
        templateUrl: '../../views/login-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
  };

<<<<<<< Updated upstream
  self.setMentorId = function(){
    BioFactory.setMentorId(AuthFactory.userStatus.userId);
  }
=======
<<<<<<< Updated upstream
=======
  self.setMentorId = function(){
    BioFactory.setMentorId(AuthFactory.userStatus.userId);
  };
>>>>>>> Stashed changes

  self.logOut = function() {
    console.log('logging user out');
    AuthFactory.logOut();
  };

<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
