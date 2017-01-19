app.controller('SearchController', ['$http', '$mdDialog', 'BioFactory', function($http, $mdDialog, BioFactory) {
  console.log('SearchController running');
  var self = this;

  self.mentors = BioFactory.mentors;

  self.newSearch = {
    first_name: null,
    last_name: null,
    email: null,
    company: null,
    job_title: null,
    zip: null,
    race: null,
    gender: null,
    orientation: null,
    birthday: null,
    school: null,
    degree: null,
    major: null,
    language: null
  };

  self.setMentor = function(mentor){
    console.log(mentor.id);
    BioFactory.setMentor(mentor);
  };

  self.getMentors = function() {
    console.log("SEARCH controller new.Search:", self.newSearch);
    BioFactory.getMentors(self.newSearch);
  };

  self.createMessage = function(ev) {
    $mdDialog.show({
      controller: 'MessageController as message',
      templateUrl: '../../views/message-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };



}]);
