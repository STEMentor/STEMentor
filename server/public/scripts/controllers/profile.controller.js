app.controller('ProfileController', ['$http', 'AuthFactory', '$mdDialog', function($http, AuthFactory, $mdDialog) {
  console.log('ProfileController running');
  var self = this;
  // var userStatus = AuthFactory.userStatus;
  var isMentor = false;
  var isStudent = false;

  self.userStatus = AuthFactory.userStatus;

  self.imagePath = '../server/public/assets/images/cooldog.jpeg';

  self.createMessage = function(ev) {
    console.log('profile controller self.userStatus: ', self.userStatus);
    $mdDialog.show({
      controller: 'MessageController as message',
      templateUrl: '../../views/message-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

}]);
