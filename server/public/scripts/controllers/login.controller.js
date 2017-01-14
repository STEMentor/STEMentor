app.controller('LoginController', ['$scope', '$mdDialog', '$firebaseAuth', 'AuthFactory', function($scope, $mdDialog, $firebaseAuth, AuthFactory){
  console.log('login controller is running');
  var auth = $firebaseAuth();
  var self = this;

  self.isLoggedIn = AuthFactory.userStatus.isLoggedIn;
  console.log(self.isLoggedIn);

  self.logIn = function() {
    console.log('logging user in');
    AuthFactory.logIn().then(function(response){
      console.log('Logged In: ', AuthFactory.userStatus.isLoggedIn);
    });

    // auth.$signInWithPopup("google").then(function(firebaseUser) {
    //   console.log("Firebase Authenticated as: ", firebaseUser.user);
    // }).catch(function(error) {
    //   console.log("Authentication failed: ", error);
    // });
  };

  self.logOut = function() {
    console.log('logging user out');
    AuthFactory.logOut();
  };

  self.hide = function() {
    $mdDialog.hide();
  };

  self.cancel = function() {
    $mdDialog.cancel();
  };

  self.answer = function(answer) {
    logIn();
    // $mdDialog.hide(answer);
    // console.log('from dialog controller', answer);
  };



}]);
