app.factory('AuthFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){
  console.log('AuthFactory running');

  var auth = $firebaseAuth();
  var currentUser;
  var loggedIn = false;
  var userStatus = {};

  function logIn(userType) {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      // console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      // console.log('firebaseUser.user.email: ', firebaseUser.user.email);
      currentUser = firebaseUser.user;
      // console.log('currentUser: ', currentUser);
      // console.log('firebaseUser: ', firebaseUser);
      console.log('USER TYPE:', userType);
      if(currentUser) {
        getUser(currentUser, userType);
      }
    });
  }

  function getUser(currentUser, userType){
    currentUser.getToken().then(function(idToken){
      console.log('ID TOKEN:', idToken);
      $http({
        method: 'GET',
        url: '/users.route',
        headers: {
          id_token: idToken,
          type: userType
        }
      })
      .then(function(response) {
        // console.log(response.data);
        userStatus.userType = response.data.userType;
        console.log(userStatus);
      });
      userStatus.isLoggedIn = true;
      // console.log(userStatus);
    });
  }

  auth.$onAuthStateChanged(function(firebaseUser){

    // firebaseUser will be null if not logged in
    currentUser = firebaseUser;
    console.log("CURRENT USER", currentUser);
    if(currentUser) {
      getUser(currentUser);
    } else {
      userStatus.isLoggedIn = false;
    }
    console.log('User is logged in:', userStatus.isLoggedIn);
  });

  function logOut() {
    return auth.$signOut().then(function() {
      currentUser = undefined;
      userStatus.isLoggedIn = false;
      userStatus.userType = "None";
      console.log('logged out');
      console.log('currentUser: ', currentUser);
    });
  }

  // TODO: Have Oliver explain what these variables are
  var publicApi = {
    auth: auth,
    userStatus: userStatus,
    logIn: function(userType) {
      return logIn(userType);
    },
    logOut: function() {
      return logOut();
    }
  };

  return publicApi;


}]);
