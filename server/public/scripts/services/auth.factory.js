app.factory('AuthFactory', ['$http', '$firebaseAuth', '$location', function($http, $firebaseAuth, $location){
  console.log('AuthFactory running');

  var auth = $firebaseAuth();
  var currentUser = {};
  var loggedIn = false;
  var userStatus = {};

  //-------------------------------Login--------------------------------------//
  function logIn(userType) {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      currentUser = firebaseUser.user;
      console.log('USER TYPE:', userType);
      if(currentUser) {
        getUser(currentUser, userType);
      }
    });
  }
  //--------------------------------------------------------------------------//

  //--------------------------------------------------------------------------//
  function getUser(currentUser, userType){
    currentUser.getToken().then(function(idToken){
      // console.log('ID TOKEN:', idToken);
      $http({
        method: 'GET',
        url: '/users',
        headers: {
          id_token: idToken,
          type: userType
        }
      })
      .then(function(response) {
        userStatus.userType = response.data.userStatus.userType;
        userStatus.userId = response.data.userStatus.userId;
        userStatus.isAdmin = response.data.userStatus.isAdmin;
        // if they are a new mentor go straight to profile
        if(userStatus.userType === 'mentor'){
          // BioFactory.setMentorId(userStatus.userId);
          var newUser = response.data.userStatus.newUser;
          if(newUser === true){
            userStatus.newUser = true;
            // $location.path("profile");
          }
          console.log("USER STATUS:", userStatus);
        }
      });
      userStatus.isLoggedIn = true;
    });
  }
  //--------------------------------------------------------------------------//

  //--------------------------------------------------------------------------//
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    currentUser = firebaseUser;
    if(currentUser) {
      getUser(currentUser);
    } else {
      userStatus.isLoggedIn = false;
    }
  });
  //--------------------------------------------------------------------------//

  //-------------------------------Logout-------------------------------------//
  function logOut() {
    return auth.$signOut().then(function() {
      currentUser = undefined;
      userStatus.isLoggedIn = false;
      userStatus.userType = "None";
      $location.path("home");
      userStatus.newUser = false;
      console.log('logged out');
      console.log('currentUser: ', currentUser);
    });
  }
  //--------------------------------------------------------------------------//


  //--------------------------------------------------------------------------//
  var publicApi = {
    auth: auth,
    userStatus: userStatus,
    currentUser: currentUser.user,
    logIn: function(userType) {
      return logIn(userType);
    },
    logOut: function() {
      return logOut();
    }
  };

  return publicApi;
  //--------------------------------------------------------------------------//

}]);
