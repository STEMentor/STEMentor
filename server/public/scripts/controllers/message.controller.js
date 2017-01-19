app.controller('MessageController', ['$http', 'AuthFactory', 'MessageFactory', '$mdDialog', 'BioFactory', function($http, AuthFactory, MessageFactory, $mdDialog, BioFactory) {
  console.log('MessageController running');
  var self = this;
  self.newMessage = [];
  var authInfo = AuthFactory.auth;
  var userStatus = AuthFactory.userStatus;
  var messageInfo = {};

  // console.log(InboxController.selectedMessage);

  self.userStatus = AuthFactory.userStatus;

  self.mentor = BioFactory.mentorBio.info;

  self.currentMessage = MessageFactory.currentMessage.thing;

  self.cancel = function() {
    $mdDialog.cancel();
  };

  self.sendStudentMessage = function() {
    console.log('newMessage: ', self.newMessage);
    console.log('authInfo: ', authInfo);
    console.log('userStatus: ', userStatus);
    console.log('self.mentor: ', self.mentor);

    // Makes sure that currentUser is set before getting messages from the server
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      sendMessage(currentUser);
    });
  };

  self.sendMentorMessage = function() {
    console.log('newMessage: ', self.newMessage);
    console.log('authInfo: ', authInfo);
    console.log('userStatus: ', userStatus);
    console.log('self.mentor: ', self.mentor);
    console.log('self.currentMessage: ', self.currentMessage);

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
          console.log('Adding new message, messageInfo: ', messageInfo);
        }),
        function(error) {
          console.log('Error with messages POST request: ', error);
        };
      });
    }
  }

  //Mentor sending response message (updating field in db)
  function sendReply(currentUser) {
    if(currentUser){
      return currentUser.getToken().then(function(idToken) {
        messageInfo = self.mentor;
        messageInfo.msgName = self.newMessage.name;
        messageInfo.msgSubject = self.newMessage.subject;
        messageInfo.msgBody = self.newMessage.body;
        messageInfo.msgId = self.currentMessage.id;
        console.log('messageInfo: ', messageInfo);
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


}]);
