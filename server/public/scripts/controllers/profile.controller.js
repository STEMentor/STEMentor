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

  getFaqs();

  // gets faqs associated with the mentor
  
  function getFaqs(){
    return $http.get('/faq/' + self.mentor.id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log('An error has occurred');
    });
  }





}]);
