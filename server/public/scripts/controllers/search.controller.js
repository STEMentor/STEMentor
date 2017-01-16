app.controller('SearchController', ['$http', function($http) {
  console.log('SearchController running');
  var self = this;

  self.mentors = [];
  
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

/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/
