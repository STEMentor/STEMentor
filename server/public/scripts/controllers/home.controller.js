app.controller('HomeController', ['$http', function($http, $firebaseAuth) {
  console.log('HomeController running');
  var auth = $firebaseAuth();
  var self = this;

  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

}]);
