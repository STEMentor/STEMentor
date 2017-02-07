app.controller('LoginController', ['$scope', '$mdDialog', '$firebaseAuth', 'AuthFactory', '$http','MessageFactory', function($scope, $mdDialog, $firebaseAuth, AuthFactory, $http, MessageFactory){
  // console.log('login controller is running');
  var self = this;
  var auth = $firebaseAuth();

  self.isLoggedIn = AuthFactory.userStatus.isLoggedIn;

  self.logIn = function(userType, ev) {
    AuthFactory.logIn(userType).then(function(response){
      // console.log('Logged In: ', AuthFactory.userStatus.isLoggedIn);
    })
    .then(function(){
      setTimeout(firstTimeMentor, 2000);
      self.cancel();
    });
  };

  self.openFirstLoginModal = function(ev) {
    $mdDialog.show({
      controller: 'FirstLoginModalController as first',
      templateUrl: '../../views/first-login-modal.html',
      targetEvent: ev,
      clickOutsideToClose:true
    });
    // .then(function(answer) {
    //   $scope.status = 'You said the information was "' + answer + '".';
    // }, function() {
    //   $scope.status = 'You cancelled the dialog.';
    // });
  };

  //Check if mentor is logging in for the first time
  function firstTimeMentor() {
    if (AuthFactory.userStatus.newUser === true && AuthFactory.userStatus.userType == 'mentor') {
      // launchPopup();
      self.openFirstLoginModal();
    }
    MessageFactory.getUnreadMessages();
  }

  //Bring up alert for a new mentor directing them to fill out their profile
  function launchPopup(ev) {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('New Mentor Account')
      .textContent('Welcome, mentor! Now you can fill your profile page with information about yourself.')
      .ariaLabel('Alert Dialog Demo')
      .ok('Got it!')
      .targetEvent(ev)
    );
  }

  self.logOut = function() {
    AuthFactory.logOut();
  };

  self.cancel = function() {
    $mdDialog.cancel();
  };

}]);
