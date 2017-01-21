app.controller('LoginController', ['$scope', '$mdDialog', '$firebaseAuth', 'AuthFactory', function($scope, $mdDialog, $firebaseAuth, AuthFactory){
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
      // TODO This isn't working because user type isn't set in time
      if(AuthFactory.userStatus.newUser === false && AuthFactory.userStatus.userType == 'mentor') {
        console.log('duh');
        self.cancel();
      }
      setTimeout(firstTimeMentor, 1500);
    });
  };

  function firstTimeMentor() {
    console.log('and here, AuthFactory.userStatus.newUser: ', AuthFactory.userStatus.newUser);
    if (AuthFactory.userStatus.newUser === true && AuthFactory.userStatus.userType == 'mentor') {
      // alert('fill out yer profile');
      launchPopup();
    }
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
