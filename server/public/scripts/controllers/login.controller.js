app.controller('LoginController', ['$scope', '$mdDialog', '$firebaseAuth', 'AuthFactory', '$http','MessageFactory', function($scope, $mdDialog, $firebaseAuth, AuthFactory, $http, MessageFactory){
  // console.log('login controller is running');
  var self = this;
  var auth = $firebaseAuth();

  self.isLoggedIn = AuthFactory.userStatus.isLoggedIn;

  self.userSignIn = function(newUser){
    // console.log("Please  set up to handle sign ins Registering new user with: ", newUser.email, newUser.password);
    firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    self.cancel();
  };

  self.googleLogIn = function(userType, ev) {
    AuthFactory.logIn(userType).then(function(response){
      // console.log('Logged In: ', AuthFactory.userStatus.isLoggedIn);
    })
    .then(function(){
      setTimeout(firstTimeMentor, 2000);
      self.cancel();
    });
  };

  self.logInModalLogin = function (ev) {
    // console.log('Login button clicked');
    $mdDialog.show({
      controller: 'LoginController as login',
      templateUrl: '../../views/login-modal-login.html',
      targetEvent: ev,
      clickOutsideToClose: true
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
