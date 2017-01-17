app.controller('ProfileController', ['$http', '$mdDialog', function($http, $mdDialog) {
  console.log('ProfileController running');
  var self = this;

  self.imagePath = '../server/public/assets/images/cooldog.jpeg';

  self.createMessage = function(ev) {
    $mdDialog.show({
      controller: 'MessageController as message',
      templateUrl: '../../views/message-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

}]);
