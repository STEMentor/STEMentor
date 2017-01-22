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
  // Makes sure that currentUser is set before getting messages from the server
  AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
    getUnreadMessages(currentUser);
  });

  function getUnreadMessages(currentUser){
    console.log("IN THE getUnreadMessages FUNCTION!");
    if(currentUser){
      return currentUser.getToken().then(function(idToken) {
        return $http({
          method: 'GET',
          url: '/message/unread-messages',
        })
        .then(function(response) {
          console.log(response)
        }),
        function(error) {
          console.log('Error with messages POST request: ', error);
        };
      });
    }
  }

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
