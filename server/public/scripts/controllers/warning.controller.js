app.controller('WarningController', ['$http', 'AuthFactory', '$mdDialog', 'BioFactory', function($http, AuthFactory, $mdDialog, BioFactory) {
  // console.log('WarningController running');
  var self = this;

  self.cancel = function() {
    $mdDialog.cancel();
  };

  self.logIn = function(userType) {
    console.log('logging user in');
    AuthFactory.logIn(userType).then(function(response){
      // console.log('Logged In: ', AuthFactory.userStatus.isLoggedIn);
    })
    .then(function(){
      self.cancel();
    });
  };

}]);
