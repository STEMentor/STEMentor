app.controller('SearchController', ['$http', '$mdDialog', 'BioFactory', function($http, $mdDialog, BioFactory) {
  console.log('SearchController running');
  var self = this;

  self.mentors = [];
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

  self.test = function() {
    console.log(self.newSearch);
  };

  self.getMentors = function() {
    console.log(self.newSearch);
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
      console.log("Mentors list:", self.mentors);
    }),
    function(err) {
      console.log("Error with search get request ", err);
    };
  };

}]);
