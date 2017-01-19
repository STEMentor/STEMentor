app.factory('AuthFactory', ['$http', '$firebaseAuth', 'BioFactory', '$location', function($http, $firebaseAuth, BioFactory, $location){
  console.log('AuthFactory running');

  var auth = $firebaseAuth();
  var currentUser = {};
  var loggedIn = false;
  var userStatus = {};

  function logIn(userType) {
    return auth.$signInWithPopup("google").then(function(firebaseUser) {
      currentUser = firebaseUser.user;
      console.log('USER TYPE:', userType);
      if(currentUser) {
        getUser(currentUser, userType);
      }
    });
  }

  function getUser(currentUser, userType){
    currentUser.getToken().then(function(idToken){
      // console.log('ID TOKEN:', idToken);
      $http({
        method: 'GET',
        url: '/users.route',
        headers: {
          id_token: idToken,
          type: userType
        }
      })
      .then(function(response) {
        console.log(response.data);
        userStatus.userType = response.data.userStatus.userType;
        userStatus.newUser = response.data.userStatus.newUser;
        userStatus.userId = response.data.userStatus.userId;
        console.log("USER STATUS:", response.data.userStatus);

        // if they are a new mentor go straight to profile

        if(userStatus.userType === 'mentor'){
          BioFactory.setMentorId(userStatus.userId);
          if(userStatus.newUser === true){
              $location.path("profile");
          }
        }

      });
      userStatus.isLoggedIn = true;
      // console.log(userStatus);
    });

  }

  auth.$onAuthStateChanged(function(firebaseUser){

    // firebaseUser will be null if not logged in
    currentUser = firebaseUser;
    // console.log("CURRENT USER", currentUser);

    if(currentUser) {
      getUser(currentUser);
    } else {
      userStatus.isLoggedIn = false;
    }

    // console.log('User is logged in:', userStatus.isLoggedIn);
  });

  function logOut() {
    return auth.$signOut().then(function() {
      currentUser = undefined;
      userStatus.isLoggedIn = false;
      userStatus.userType = "None";
      $location.path("home");
      console.log('logged out');
      console.log('currentUser: ', currentUser);
    });
  }

  // TODO: Have Oliver explain what these variables are
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


}]);
