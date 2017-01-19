app.factory('BioFactory', ['$http', function($http){
  console.log('BioFactory running');

  var mentors = {};
  var mentor = {};
  var mentorBio = {};
  var mentorFAQs = [];
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
  }

  // gets profiles associated with the mentor

  function getProfiles(){
    console.log("MENTOR ID IN getProfiles()", mentorId);
    return $http.get('/profile/' + mentorId)
    .then(function (response) {
      // console.log("getProfiles result:", response.data);
      // mentorBio.info = response.data[0];
      // console.log(mentorBio.info);

      mentorBio.info = {
        id: response.data[0].id,
        first_name: response.data[0].first_name,
        last_name: response.data[0].last_name,
        email: response.data[0].email,
        avatar: response.data[0].avatar,
        company: response.data[0].company,
        job_title: response.data[0].job_title,
        zip: response.data[0].zip,
        race: response.data[0].race,
        gender: response.data[0].gender,
        orientation: response.data[0].orientation,
        birthday: response.data[0].birthday,
        school: response.data[0].school,
        degree: response.data[0].degree,
        major: response.data[0].major,
        languages: response.data[0].languages,
        bio: response.data[0].bio,
        blurb: response.data[0].blurb

      };
      mentorBio.faqs = [];
      for(var key in response.data) {
        mentorBio.faqs.push(
          {
            question: response.data[key].question,
            answer: response.data[key].answer
          }
        );
      }
      console.log(mentorBio.faqs);
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
    getProfiles();
  }

  function setMentorId(id){
    mentorId = id;
    getProfiles();
    console.log('MENTOR ID:', mentorId);
  }



  var publicApi = {
    mentors: mentors,
    mentor: mentor,
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
      return setMentorId(id);
    }
    // getMentorId: function(){
    //   return getMentorId();
    // }
  };

  return publicApi;



}]);
