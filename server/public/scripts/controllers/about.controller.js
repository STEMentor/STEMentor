app.controller('AboutController', ['$http', 'AuthFactory', function($http, AuthFactory) {
  // console.log('AboutController running');
  var self = this;
  self.userStatus = AuthFactory.userStatus;

}]);
