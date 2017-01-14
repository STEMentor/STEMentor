app.factory('AuthFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){
  console.log('AuthFactory running');

  var auth = $firebaseAuth();
  var currentUser = undefined;
  var emailInDatabase = false;
  var loggedIn = false;
  var userStatus = {};

  function logIn() {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      console.log('firebaseUser.user.email: ', firebaseUser.user.email);
      currentUser = firebaseUser.user;
      console.log('currentUser: ', currentUser);
      console.log('firebaseUser: ', firebaseUser);
      var type = 'students';
      if(currentUser) {
        currentUser.getToken().then(function(idToken){
          console.log('ID TOKEN:', idToken)
          $http({
            method: 'GET',
            url: '/users.route',
            headers: {
              id_token: idToken,
              type: type
            }
          })
          .then(function(response) {
            console.log(response.data);
            
            });
          userStatus.isLoggedIn = true;
          // console.log(userStatus);
        });
      }
    });
  }

  auth.$onAuthStateChanged(function(firebaseUser){

    // firebaseUser will be null if not logged in
    currentUser = firebaseUser;
    console.log("CURRENT USER", currentUser);
    if(currentUser){
      userStatus.isLoggedIn = true;
    }
    else {
      userStatus.isLoggedIn = false;
    }
    console.log('User is logged in:', userStatus.isLoggedIn);
  });

    // Adding new user to db
    //   $http.get('/login')
    //   .then(function(response) {
    //     console.log('login response.data: ', response.data);
    //     users = response.data;
    //   }).then(function() {
    //     for (var i = 0; i < users.length; i++) {
    //       if(currentUser.email == users[i].email) {
    //         emailInDatabase = true;
    //       }
    //     }
    //     if (emailInDatabase === false) {
    //       console.log('trying to add currentUser: ', currentUser);
    //       $http.post('/login', currentUser)
    //       .then(function(response) {
    //         console.log('added user to db:');
    //       });
    //     }
    //   });
    // }).catch(function(error) {
    //   console.log("Authentication failed: ", error);
    // });


    function logOut() {
      return auth.$signOut().then(function() {
        currentUser = undefined;
        userStatus.isLoggedIn = false;
        console.log('logged out');
        console.log('currentUser: ', currentUser);
      });
    }

    var publicApi = {
      auth: auth,
      userStatus: userStatus,
      logIn: function() {
        return logIn();
      },
      logOut: function() {
        return logOut();
      }
    };

    return publicApi;


  }]);
