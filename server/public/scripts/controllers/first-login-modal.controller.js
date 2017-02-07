app.controller('FirstLoginModalController', ['$http', 'AuthFactory', '$mdDialog', 'BioFactory', '$location', function($http, AuthFactory, $mdDialog, BioFactory, $location) {
  // console.log('FirstLoginModalController running');
  var self = this;

  self.cancel = function() {
    $mdDialog.cancel();
  };

  self.goToProfile = function(){
    BioFactory.setMentorId(AuthFactory.userStatus.userId);
    $location.path("profile");
    self.cancel();
  };

}]);
