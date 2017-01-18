app.controller('ProfileController', ['$http', '$mdDialog', 'BioFactory', function($http, $mdDialog, BioFactory) {
  console.log('ProfileController running');

  var self = this;

  self.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
    return {
      abbrev: state
    };
  });

  self.createMessage = function(ev) {
    $mdDialog.show({
      controller: 'MessageController as message',
      templateUrl: '../../views/message-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

}]);

// var userData = {
//   id: null,
//   first_name: null,
//   last_name: null,
//   email: null,
//   avatar: null,
//   company: null,
//   job_title: null,
//   zip: null,
//   race: null,
//   gender: null,
//   orientation: null,
//   birthday: null,
//   school: null,
//   degree: null,
//   major: null,
//   languages: null
// };
