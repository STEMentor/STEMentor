app.controller('MessageController', ['$http', 'AuthFactory', 'MessageFactory', '$mdDialog', 'BioFactory', function($http, AuthFactory, MessageFactory, $mdDialog, BioFactory) {
  console.log('MessageController running');
  var self = this;

  var authInfo = AuthFactory.auth;
  var userStatus = AuthFactory.userStatus;
  var messageInfo = {};

  self.newMessage = [];
  self.newReply = [];
  self.userStatus = AuthFactory.userStatus;
  self.mentor = BioFactory.mentorBio.info;
  self.currentMessage = MessageFactory.currentMessage.thing;

  self.cancel = function() {
    $mdDialog.cancel();
  };

  self.sendStudentMessage = function() {
    // Makes sure that currentUser is set before getting messages from the server
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      sendMessage(currentUser);
    });
  };

  self.sendMentorMessage = function() {
    // Makes sure that currentUser is set before getting messages from the server
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      sendReply(currentUser);
    });
  };

  // User (student) creating a new message
  function sendMessage(currentUser) {
    if(currentUser){
      return currentUser.getToken().then(function(idToken) {
        messageInfo = self.mentor;
        messageInfo.msgName = self.newMessage.name;
        messageInfo.msgSubject = self.newMessage.subject;
        messageInfo.msgBody = self.newMessage.body;
        console.log('messageInfo: ', messageInfo);
        return $http({
          method: 'POST',
          url: '/message/new-message',
          headers: {
            id_token: idToken
          },
          data: {
            message_info: messageInfo
          }
        })
        .then(function(response) {
          self.messages = response.data;
          sendEmail();
          console.log('Adding new message, messageInfo: ', messageInfo);
        }),
        function(error) {
          console.log('Error with messages POST request: ', error);
        };
      });
    }
  }

  // Mentor sending response message (updating field in db)
  function sendReply(currentUser) {
    if(currentUser){
      return currentUser.getToken().then(function(idToken) {
<<<<<<< HEAD
        messageInfo = self.mentor;
        console.log('messageInfo', messageInfo);
        messageInfo.msgName = self.newMessage.name;
        messageInfo.msgSubject = self.newMessage.subject;
        messageInfo.msgBody = self.newMessage.body;
=======
>>>>>>> dev
        messageInfo.msgId = self.currentMessage.id;
        messageInfo.msgReply = self.newReply.reply;
        return $http({
          method: 'PUT',
          url: '/message/reply',
          headers: {
            id_token: idToken
          },
          data: {
            message_info: messageInfo
          }
        })
        .then(function(response) {
          self.messages = response.data;
          console.log('Adding new message, messageInfo: ', messageInfo);
        }),
        function(error) {
          console.log('Error with messages POST request: ', error);
        };
      });
    }
  }

<<<<<<< HEAD
  function sendEmail(){
    return $http({
      method: 'POST',
      url: '/email',
    })
    .then(function(response) {
      console.log(response)
    }),
    function(error) {
      console.log('Error with messages POST request: ', error);
    };
  };



  //   // Reply to message
  //   self.replyToMessage = function() {
  //     var messageId; // TODO: Need to get the message's ID somehow
  //
  //     return $http({
  //       method: 'PUT',
  //       url: '/message/reply',
  //       data: {
  //         messageId: messageId,
  //         authInfo: authInfo
  //       }
  //     })
  //     .then(function(response) {
  //       console.log('Response from the server: ', response);
  //     }),
  //     function(error) {
  //       console.log('Error with the reply PUT request: ', error);
  //     };
  //   };



=======
>>>>>>> dev
}]);
