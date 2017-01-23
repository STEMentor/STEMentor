app.controller('LoginController', ['$scope', '$mdDialog', '$firebaseAuth', 'AuthFactory', '$http','MessageFactory', function($scope, $mdDialog, $firebaseAuth, AuthFactory, $http, MessageFactory){
  console.log('login controller is running');
  var auth = $firebaseAuth();
  var self = this;

  self.isLoggedIn = AuthFactory.userStatus.isLoggedIn;
  console.log(self.isLoggedIn);

  self.logIn = function(userType, ev) {
    console.log('logging user in');
    console.log(userType);
    AuthFactory.logIn(userType).then(function(response){
      console.log('Logged In: ', AuthFactory.userStatus.isLoggedIn);
    })
    .then(function(){
<<<<<<< HEAD
      // TODO This isn't working because user type isn't set in time
      if(AuthFactory.userStatus.newUser === false && AuthFactory.userStatus.userType == 'mentor') {

        console.log('duh');
        self.cancel();
      }
=======
>>>>>>> dev
      setTimeout(firstTimeMentor, 2000);
      self.cancel();
    });
  };



  function firstTimeMentor() {
    console.log('and here, AuthFactory.userStatus.newUser: ', AuthFactory.userStatus.newUser);

    if (AuthFactory.userStatus.newUser === true && AuthFactory.userStatus.userType == 'mentor') {
      // alert('fill out yer profile');
      launchPopup();
    }
    MessageFactory.getUnreadMessages();
  }

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
