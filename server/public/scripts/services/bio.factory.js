app.factory('BioFactory', ['$http', function($http){
  console.log('BioFactory running');

  var mentorInfo = {};
  var mentors = {};
  var mentor = {};


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

        console.log("--------------------------------------");
        mentors.info = response.data;
        console.log("Mentors list:", mentors);


      }),
      function(err) {
        console.log("Error with search get request ", err);
      };
  };

  function setMentorId(mentorId){
    mentor.id = mentorId;
  }



  var publicApi = {
    mentors: mentors,
    mentor: mentor,
    getMentors: function(newSearch){
      return getMentors(newSearch);
    },
    setMentorId: function(mentorId){
      return setMentorId(mentorId);
    },
    // getMentorId: function(){
    //   return getMentorId();
    // }
  };

  return publicApi;



}]);
