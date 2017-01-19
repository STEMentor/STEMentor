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
      self.cancel();
    });
  };

  self.logOut = function() {
    console.log('logging user out');
    AuthFactory.logOut();
  };

  self.cancel = function() {
    $mdDialog.cancel();
  };

}]);
