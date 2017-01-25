app.controller('NavController', ['$http', '$firebaseAuth', '$mdDialog', 'AuthFactory', 'BioFactory', 'MessageFactory', function($http, $firebaseAuth, $mdDialog, AuthFactory, BioFactory, MessageFactory) {
  console.log('NavController running');
  var auth = $firebaseAuth();
  var self = this;
  var userId = AuthFactory.userStatus.userId;
  
  self.userStatus = AuthFactory.userStatus;
  self.unreadMessages = MessageFactory.unreadMessages;

  self.logInModal = function(ev) {
    $mdDialog.show({
      controller: 'LoginController as login',
      templateUrl: '../../views/login-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  self.setMentorId = function(){
    console.log("SOMETHING");
    console.log("USER ID in setMentorId", AuthFactory.userStatus.userId);
    BioFactory.setMentorId(AuthFactory.userStatus.userId);
  };

  self.logOut = function() {
    console.log('logging user out');
    AuthFactory.logOut();
  };

  self.firstLoginModal = function(){
    $mdDialog.show({
      controller: 'FirstLoginController',
      templateUrl: '../../views/first-login-modal.html',
      clickOutsideToClose: true
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
