app.controller('ProfileController', ['$http', '$mdDialog', 'BioFactory', function($http, $mdDialog, BioFactory) {
  console.log('ProfileController running');
  var self = this;

  self.imagePath = '../server/public/assets/images/cooldog.jpeg';

  // This is an object containing all of mentor's fields
  self.mentor = BioFactory.mentorBio.info;

  self.createMessage = function(ev) {
    $mdDialog.show({
      controller: 'MessageController as message',
      templateUrl: '../../views/message-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  BioFactory.getProfiles();

  





}]);
