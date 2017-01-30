app.factory('BioFactory', ['$http', 'AuthFactory', function($http, AuthFactory){
  // console.log('BioFactory running');

  var mentors = {};
  var mentor = {};
  var mentorBio = {};
  var mentorFAQs = [];
  var mentorId;

  //----- Gets all the mentors that match the newSearch selected fields ------//
  function getMentors(newSearch){
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
    }),
    function(err) {
      console.log("Error with search get request ", err);
    };
  }
  //--------------------------------------------------------------------------//

  //---------------- Gets profiles associated with the mentor ----------------//
  function getProfiles(){
    return $http.get('/profile/' + mentorId)
    .then(function (response) {
      response.data.result[0].id = response.data.userId;
      mentorBio.info = response.data.result[0];
      mentorBio.faqs = [];
      for(var key in response.data.result) {
        mentorBio.faqs.push(
          {
            question: response.data.result[key].question,
            answer: response.data.result[key].answer,
            faq_id: response.data.result[key].faq_id
          }
        );
      }
    })
    .catch(function (error) {
      console.log('An error has occurred');
    });
  }
  //--------------------------------------------------------------------------//

  //--------------------------------------------------------------------------//
  // Attach the chosen mentor object to the info property on mentorBio to be
  // accessed by the profile controller
  function setMentor(mentor){
    mentorBio.info = mentor;
    mentorId = mentorBio.info.id;
    getProfiles();
  }
  //--------------------------------------------------------------------------//

  //--------------------------- Sets the mentor ID ---------------------------//
  function setMentorId(id){
    mentorId = id;
    getProfiles();
  }
  //--------------------------------------------------------------------------//

  //-------------------------- Edit bio information --------------------------//
  function editBio(userData) {
    // Makes sure that currentUser is set
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      if(currentUser){
        return currentUser.getToken().then(function(idToken) {
          return $http({
            method: 'PUT',
            url: '/profile-edit/update/'+ mentorId,
            headers: {
              id_token: idToken
            },
            data: {
              userData: userData
            }
          })
          .then(function(response) {
            getProfiles();
          }),
          function(error) {
            console.log('Error with messages POST request: ', error);
          };
        });
      }
    });
  }
  //--------------------------------------------------------------------------//

  //-------------------------- Create new FAQ entry --------------------------//
  function postFaq(faqData){
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      if(currentUser){
        return currentUser.getToken().then(function(idToken) {
          return $http({
            method: 'POST',
            url: '/profile-edit/new-faq',
            headers: {
              id_token: idToken
            },
            data: {
              faqData: faqData
            }
          })
          .then(function(response) {
            getProfiles();
          }),
          function(error) {
            console.log('Error with messages POST request: ', error);
          };
        });
      }
    });
  }
  //--------------------------------------------------------------------------//

  //------------------------ Edit user's FAQ entires -------------------------//
  function editFaqs(faqArray) {
    // Makes sure that currentUser is set
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      if(currentUser){
        return currentUser.getToken().then(function(idToken) {
          return $http({
            method: 'PUT',
            url: '/profile-edit/edit-faq/'+faqArray.faq_id,
            headers: {
              id_token: idToken
            },
            data: {
              faqArray: faqArray
            }
          })
          .then(function(response) {
            getProfiles();
          }),
          function(error) {
            console.log('Error with messages POST request: ', error);
          };
        });
      }
    });
  }
  //--------------------------------------------------------------------------//

  //----------------------- Delete user's FAQ entires ------------------------//
  function deleteFaq(faqId) {
    // Makes sure that currentUser is set before getting messages from the server
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      if(currentUser){
        return currentUser.getToken().then(function(idToken) {
          return $http({
            method: 'DELETE',
            url: '/profile-edit/delete-faq/' + faqId,
            headers: {
              id_token: idToken
            }
          })
          .then(function(response) {
            getProfiles();
          }),
          function(error) {
            console.log('Error with messages POST request: ', error);
          };
        });
      }
    });
  }
  //--------------------------------------------------------------------------//

  // Delete an existing user and their associated FAQs and messages ----------//
  function deleteUser(userData) {
    // Makes sure that currentUser is set before getting messages from the server
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {

      if(currentUser){
        currentUser.getToken().then(function(idToken) {
          return $http({
            method: 'DELETE',
            url: '/profile-edit/delete-user/' + mentorId,
            headers: {
              id_token: idToken
            },
            data: {
              userData: userData
            }
          })
          .then(function(response) {
            getProfiles();
          }),
          function(error) {
            console.log('Error with user DELETE request: ', error);
          };
        });
      }
    });
  }
  //--------------------------------------------------------------------------//


  //--------------------------------------------------------------------------//
  var publicApi = {
    mentors: mentors,
    mentor: mentor,
    mentorBio: mentorBio,
    getMentors: function(newSearch){
      return getMentors(newSearch);
    },
    getProfiles: function(){
      return getProfiles();
    },
    setMentor: function(mentor){
      return setMentor(mentor);
    },
    setMentorId: function(id){
      return setMentorId(id);
    },
    postFaq: function(faqData){
      return postFaq(faqData);
    },
    editBio: function(userData){
      return editBio(userData);
    },
    editFaqs: function(faqData){
      return editFaqs(faqData);
    },
    deleteUser: function(userData){
      return deleteUser(userData);
    },
    deleteFaq: function(faqId){
      return deleteFaq(faqId);
    }
  };

  return publicApi;

}]);
//----------------------------------------------------------------------------//
