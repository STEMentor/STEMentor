app.controller('NavController', ['$http', '$firebaseAuth', '$mdDialog', 'AuthFactory', 'BioFactory', 'MessageFactory', function($http, $firebaseAuth, $mdDialog, AuthFactory, BioFactory, MessageFactory) {
  // console.log('NavController running');
  var auth = $firebaseAuth();
  var self = this;
  var userId = AuthFactory.userStatus.userId;

  self.userStatus = AuthFactory.userStatus;
  self.unreadMessages = MessageFactory.unreadMessages;

  self.logInModal = function(ev) {
    $mdDialog.show({
      controller: 'LoginController as login',
      templateUrl: '../../views/login-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  self.setMentorId = function(){
    BioFactory.setMentorId(AuthFactory.userStatus.userId);
  };

  self.logOut = function() {
    AuthFactory.logOut();
  };

  self.firstLoginModal = function(){
    $mdDialog.show({
      controller: 'FirstLoginController',
      templateUrl: '../../views/first-login-modal.html',
      clickOutsideToClose: true
    });
  };

}]);
