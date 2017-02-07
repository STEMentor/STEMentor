app.controller('MessageController', ['$http', 'AuthFactory', 'MessageFactory', '$mdDialog', 'BioFactory', function($http, AuthFactory, MessageFactory, $mdDialog, BioFactory) {
  // console.log('MessageController running');
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

  //Student sending message
  self.sendStudentMessage = function() {
    // Makes sure that currentUser is set
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      sendMessage(currentUser);
    });
  };

  //Mentor sending message
  self.sendMentorMessage = function() {
    // Makes sure that currentUser is set
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
        console.log('messageInfo:', messageInfo);

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
          self.cancel();
          self.messages = response.data;
          sendEmail('mentor', messageInfo.id);
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
          sendEmail('student', self.currentMessage.student_id);
          self.cancel();
          self.messages = response.data;
        }),
        function(error) {
          console.log('Error with messages POST request: ', error);
        };
      });
    }
  }

  //Send email alerting that message has been sent
  function sendEmail(userType, receiverId){
    return $http({
      method: 'POST',
      url: '/email',
      data: {
        receiverId: receiverId,
        userType: userType
      }
    })
    .then(function(response) {
      // console.log(response);
    }),
    function(error) {
      console.log('Error with messages POST request: ', error);
    };
  }

}]);
