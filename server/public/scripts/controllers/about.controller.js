app.controller('AboutController', ['$http', 'AuthFactory', function($http, AuthFactory) {
  console.log('AboutController running');

  self.isLoggedIn = AuthFactory.userStatus.isLoggedIn;
  console.log(self.isLoggedIn);


}]);
