app.controller('SearchController', ['$http', '$mdDialog', 'BioFactory', 'AuthFactory', function($http, $mdDialog, BioFactory, AuthFactory) {
  // console.log('SearchController running');
  var self = this;

  self.mentors = [];
  self.userStatus = AuthFactory.userStatus;
  self.field = true;

  self.newSearch = {
    generic_search: null,
    first_name: null,
    last_name: null,
    email: null,
    company: null,
    job_title: null,
    zip: null,
    race: null,
    sex: null,
    orientation: null,
    birthday: null,
    school: null,
    degree: null,
    major: null,
    language: null
  };

  self.theStates = (
    'AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV ' +
    'WI WY'
  ).split(' ').map(function(state) {
    return {
      abbreviation: state
    };
  });

  self.setMentor = function(mentor){
    BioFactory.setMentor(mentor);
  };

  self.getMentors = function() {
    var newSearchString = JSON.stringify(self.newSearch);
    return $http({
      method: 'GET',
      url: '/mentor-search/search',
      headers: {
        newSearchString: newSearchString
      }
    })
    .then(function(response) {
      self.mentors = response.data;
    }),
    function(err) {
      console.log("Error with search get request ", err);
    };
  };

  self.createMessage = function(ev) {
    if(self.userStatus.isLoggedIn) {
      $mdDialog.show({
        controller: 'MessageController as message',
        templateUrl: '../../views/message-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
    } else {
      $mdDialog.show({
        controller: 'WarningController as warning',
        templateUrl: '../../views/warning-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }
  };

}]);
