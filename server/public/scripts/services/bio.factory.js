app.factory('BioFactory', ['$http', function($http){
  console.log('BioFactory running');

  var mentors = {};
  var mentorBio = {};


  // gets all the mentors that match the newSearch selected fields
  function getMentors(newSearch){
    console.log("NEW SEARCH:", newSearch);
    var newSearchString = JSON.stringify(newSearch);
    return $http({
        method: 'GET',
        url: '/mentor-search/search',
        headers: {
          newSearchString: newSearchString
        }
      })
      .then(function(response) {
        mentors.info = response.data;
        console.log("Mentors list:", mentors);
      }),
      function(err) {
        console.log("Error with search get request ", err);
      };
  };


// Attach the chosen mentor object to the info property on mentorBio.
// This will be accessed by the profile controller
  function setMentor(mentor){
    mentorBio.info = mentor;
    console.log("MENTOR:", mentorBio.info);
  }



  var publicApi = {
    mentors: mentors,
    mentorBio: mentorBio,
    getMentors: function(newSearch){
      return getMentors(newSearch);
    },
    setMentor: function(mentor){
      return setMentor(mentor);
    },
    // getMentorId: function(){
    //   return getMentorId();
    // }
  };

  return publicApi;



}]);
