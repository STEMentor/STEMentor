app.factory('AuthFactory', ['$http', '$firebaseAuth', '$location', function ($http, $firebaseAuth, $location) {
  // console.log('AuthFactory running');

  var auth = $firebaseAuth();
  var currentUser = {};
  var loggedIn = false;
  var userStatus = {};

  //-------------------------------Register-----------------------------------//
  function registerNewUser(newUser) {
    console.log('New User registration: ', newUser.email, newUser.password);
    
    // auth.createNewUserWithEmailAndPassword(newUser.email, newUser.password)
    // .catch(function(err) {
    //   //error handling
    //   var errorCode = err.code;
    //   var errorMessage = err.message;

    //   console.log('Error code and message: ', errorCode, errorMessage);
    // });
  }
  //--------------------------------------------------------------------------//

  //-------------------------------Login--------------------------------------//
  function logIn(userType) {
    return auth.$signInWithPopup("google").then(function (firebaseUser) {
      currentUser = firebaseUser.user;
      if (currentUser) {
        getUser(currentUser, userType);
      }
    });
  }
  //--------------------------------------------------------------------------//

  //--------------------------------------------------------------------------//
  function getUser(currentUser, userType) {
    currentUser.getToken().then(function (idToken) {
      $http({
        method: 'GET',
        url: '/users',
        headers: {
          id_token: idToken,
          type: userType
        }
      })
        .then(function (response) {
          userStatus.userType = response.data.userStatus.userType;
          userStatus.userId = response.data.userStatus.userId;
          userStatus.isAdmin = response.data.userStatus.isAdmin;
          // if they are a new mentor go straight to profile
          if (userStatus.userType === 'mentor') {
            // BioFactory.setMentorId(userStatus.userId);
            var newUser = response.data.userStatus.newUser;
            if (newUser === true) {
              userStatus.newUser = true;
            }
          }
        });
      userStatus.isLoggedIn = true;
    });
  }
  //--------------------------------------------------------------------------//

  //--------------------------------------------------------------------------//
  auth.$onAuthStateChanged(function (firebaseUser) {
    // firebaseUser will be null if not logged in
    currentUser = firebaseUser;
    if (currentUser) {
      getUser(currentUser);
    } else {
      userStatus.isLoggedIn = false;
    }
  });
  //--------------------------------------------------------------------------//

  //-------------------------------Logout-------------------------------------//
  function logOut() {
    return auth.$signOut().then(function () {
      currentUser = undefined;
      userStatus.isLoggedIn = false;
      userStatus.userType = "None";
      $location.path("home");
      location.reload(false);
      userStatus.newUser = false;
    });
  }
  //--------------------------------------------------------------------------//


  //--------------------------------------------------------------------------//
  var publicApi = {
    auth: auth,
    userStatus: userStatus,
    currentUser: currentUser.user,
    registerNewUser: function (newUser) {
      return registerNewUser(newUser)
    },
    logIn: function (userType) {
      return logIn(userType);
    },
    logOut: function () {
      return logOut();
    }
  };

  return publicApi;
  //--------------------------------------------------------------------------//

}]);
