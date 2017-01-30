app.controller('FirstLoginModalController', ['$http', 'AuthFactory', '$mdDialog', 'BioFactory', function($http, AuthFactory, $mdDialog, BioFactory) {
  // console.log('FirstLoginModalController running');
  var self = this;

  self.cancel = function() {
    $mdDialog.cancel();
  };

  self.goToProfile = function(){
    $location.path("profile");
    self.cancel();
  };

}]);
