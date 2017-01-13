app.factory('AuthFactory', ['$http', function($http){
  console.log('AuthFactory running');

  var auth = $firebaseAuth();
  var currentUser = undefined;
  var emailInDatabase = false;
  var loggedIn = false;

  function logIn() {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      console.log('firebaseUser.user.email: ', firebaseUser.user.email);
      currentUser = firebaseUser.user;
      console.log('currentUser: ', currentUser);
      loggedIn = true;
      // Adding new user to db
      $http.get('/login')
      .then(function(response) {
        // console.log('login response.data: ', response.data);
        users = response.data;
      }).then(function() {
        for (var i = 0; i < users.length; i++) {
          if(currentUser.email == users[i].email) {
            emailInDatabase = true;
          }
        }
        if (emailInDatabase === false) {
          console.log('trying to add currentUser: ', currentUser);
          $http.post('/login', currentUser)
          .then(function(response) {
            console.log('added user to db:');
          });
        }
      });
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  }

  function logOut() {
    return auth.$signOut().then(function() {
      currentUser = undefined;
      loggedIn = false;
      console.log('logged out');
      console.log('currentUser: ', currentUser);
    });
  }

  var publicApi = {
    logIn: function() {
      return logIn();
    },
    logOut: function() {
      return logOut();
    },
  };

  return publicApi;


}]);
