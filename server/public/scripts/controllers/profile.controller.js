app.controller('ProfileController', ['$http', '$mdDialog', 'BioFactory', function($http, $mdDialog, BioFactory) {
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

  // function getMentorId(){
  //   console.log(BioFactory.mentor.id);
  // }
  getFaqs();

  function getFaqs(){
    var id = BioFactory.mentor.id;
    console.log(id);
    return $http.get('/faq/' + id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log('An error has occurred');
    });
  }





}]);
