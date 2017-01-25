app.factory('MessageFactory', ['$http', 'AuthFactory', function($http, AuthFactory){
  console.log('MessageFactory running');

  var currentMessage = {};
  var unreadMessages = {};

  function setMessage(item){
    currentMessage.thing = item;
    console.log('message factory currentMessage: ', currentMessage);
  }

  // Get request to retrieve the user's unread messages
  function getUnreadMessages(){
    console.log('IN THE getUnreadMessages FUNCTION!');
    console.log('USER STATUS IN', self.userStatus);
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      if(currentUser){
        return currentUser.getToken().then(function(idToken) {
          return $http({
            method: 'GET',
            url: '/message/unread-messages',
            headers: {
              id_token: idToken
            }
          })
          .then(function(response) {
            console.log('unread-messages', response.data.length);
            unreadMessages.unread = response.data.length;
            console.log("UNREAD MESSAGES:", unreadMessages);
          }),
          function(error) {
            console.log('Error with messages POST request: ', error);
          };
        });
      }
    });
  }

  var publicApi = {
    currentMessage: currentMessage,
    unreadMessages: unreadMessages,
    setMessage: function(item){
      return setMessage(item);
    },
    getUnreadMessages: function(){
      return getUnreadMessages();
    }
  };

  return publicApi;

}]);
