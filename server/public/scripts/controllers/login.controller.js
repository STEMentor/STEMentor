app.controller('LoginController', ['$scope', '$mdDialog', '$firebaseAuth', 'AuthFactory', function($scope, $mdDialog, $firebaseAuth, AuthFactory){
  console.log('login controller is running');
  var auth = $firebaseAuth();
  var self = this;

  self.isLoggedIn = AuthFactory.userStatus.isLoggedIn;
  console.log(self.isLoggedIn);

  self.logIn = function(userType) {
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
      setTimeout(firstTimeMentor, 1000);
    });
  };

  function firstTimeMentor() {
    console.log('and here, AuthFactory.userStatus.newUser: ', AuthFactory.userStatus);
    if (AuthFactory.userStatus.newUser === true && AuthFactory.userStatus.userType == 'mentor') {
      alert('fill out yer profile');
    }
  }

  self.logOut = function() {
    console.log('logging user out');
    AuthFactory.logOut();
  };

  self.cancel = function() {
    $mdDialog.cancel();
  };

}]);
