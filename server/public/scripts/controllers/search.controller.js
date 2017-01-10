app.controller('SearchController', ['$http', function($http) {
  console.log('SearchController running');

  self.newSearch = {};

  self.mentors = [];

  self.getMentors = function() {
    return $http({
          method: 'GET',
          url: '/mentors',
          headers: {
            newSearch: newSearch
          }
        })
        .then(function (response) {
          self.mentors = response.data;
          console.log(mentors);

        });
    .catch(function (error) {
      console.log('An error has occurred');
    });
  }

}]);
