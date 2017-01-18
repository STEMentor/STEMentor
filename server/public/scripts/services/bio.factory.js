app.factory('BioFactory', ['$http', function($http){
  console.log('BioFactory running');

  var mentors = {};
  var mentorBio = {};
  var mentorId;

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

  // gets profiles associated with the mentor

  function getProfiles(){
    console.log(mentorId);
    return $http.get('/profile/' + mentorId)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log('An error has occurred');
    });
  }


// Attach the chosen mentor object to the info property on mentorBio.
// This will be accessed by the profile controller
  function setMentor(mentor){
    mentorBio.info = mentor;
    mentorId = mentorBio.info.id;
    console.log("MENTOR:", mentorBio.info);
  }

  function setMentorId(id){

    mentorId = id;
    console.log('MENTOR ID:', mentorId);
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
    getProfiles: function(){
      return getProfiles();
    },
    setMentorId: function(id){
      return setMentorId(id)
    }
    // getMentorId: function(){
    //   return getMentorId();
    // }
  };

  return publicApi;



}]);
