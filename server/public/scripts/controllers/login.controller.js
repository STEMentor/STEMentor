app.controller('LoginController', ['$scope', '$mdDialog', '$firebaseAuth', function($scope, $mdDialog, $firebaseAuth){
  console.log('login controller is running');
  var auth = $firebaseAuth();
  var self = this;

  var logIn = function() {
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
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
