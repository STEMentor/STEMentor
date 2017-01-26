app.controller('LoginController', ['$scope', '$mdDialog', '$firebaseAuth', 'AuthFactory', '$http','MessageFactory', function($scope, $mdDialog, $firebaseAuth, AuthFactory, $http, MessageFactory){
  console.log('login controller is running');
  var self = this;
  var auth = $firebaseAuth();

  self.isLoggedIn = AuthFactory.userStatus.isLoggedIn;
  console.log(self.isLoggedIn);

  self.logIn = function(userType, ev) {
    console.log('logging user in');
    console.log(userType);
    AuthFactory.logIn(userType).then(function(response){
      console.log('Logged In: ', AuthFactory.userStatus.isLoggedIn);
    })
    .then(function(){
      setTimeout(firstTimeMentor, 2000);
      self.cancel();
    });
  };

  //Check if mentor is logging in for the first time
  function firstTimeMentor() {
    console.log('and here, AuthFactory.userStatus.newUser: ', AuthFactory.userStatus.newUser);
    if (AuthFactory.userStatus.newUser === true && AuthFactory.userStatus.userType == 'mentor') {
      launchPopup();
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
    console.log('logging user out');
    AuthFactory.logOut();
  };

  self.cancel = function() {
    $mdDialog.cancel();
  };

}]);
