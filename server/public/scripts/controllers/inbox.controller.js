/*----------------------------- MESSAGING RULES ------------------------------*\
|------------------ This note created by Isaac on 2017-01-14 ------------------|

  When a user views their inbox, all of their messages will be returned from the
  database. The front end logic will then decide how to display each message.
  Below is a guide to the logic required.

  For a message to appear in a student's inbox, it must:
  - Have the student's id in the 'student_id' column

  For a message to appear in a student's inbox, but have a 'replied' status:
  - Have text in the 'reply' column
  - Have a date in the 'date_replied' column

  For a message to appear in a mentor's inbox, it must:
  - Have the mentor's id in the 'mentor_id' column
  - Have text in the 'message' column
  - Have a date in the 'date_sent' column

  For a message to appear in a mentor's inbox, but have a 'replied' status:
  - Have text in the 'reply' column

  For a message to appear in a mentor's inbox, but have a 'read but not replied'
  status:
  - Not have text in the 'reply' column
  - Have 'TRUE' in the 'read' column

\*----------------------------------------------------------------------------*/

/*------------------------------- AJAX REQUESTS ------------------------------*\
|------------------ This note created by Isaac on 2017-01-14 ------------------|

  To retreive all messages for a user
  - Send a `GET` request to `/message`
    - Must send token to be decoded
    - Must send user `type` on headers (or query)

  To create a new message when a student clicks "Send Message"
  - Send a `POST` request to `/message/new-message`
    - Must send token to be decoded
    - Must send a `message` object on data following this template:
      message {
        mentorEmail: 'mentor's email address',
        subject: 'subject text',
        body: 'body text',
        studentName: 'optional student name'
      }

  To mark a message as read, send a `PUT` request to `/message/read-message`
  - Must send token to be decoded
  - Must send `message.id` on headers

  To reply to a message, send a `PUT` request to `/message/reply`
  - Must send token to be decoded
  - Must send `message` object on `data` following this template:
    message {
      mentorEmail: 'mentor's email address',
      messageId: 'message's ID',
      reply: 'reply text',
    }

\*----------------------------------------------------------------------------*/

app.controller('InboxController', ['$http', 'AuthFactory', '$mdDialog', function($http, AuthFactory, $mdDialog) {
  console.log('InboxController running');
  var self = this;
  self.userStatus = AuthFactory.userStatus;
  self.messages = [];

  // Makes sure that currentUser is set before getting messages from the server
  AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
    getMessages(currentUser);
  });

  // Get all messages from the database for a specific user
  function getMessages(currentUser) {
    if(currentUser){
      return currentUser.getToken().then(function(idToken) {
        return $http({
          method: 'GET',
          url: '/message/get-all-messages',
          headers: {
            id_token: idToken
          }
        })
        .then(function(response) {
          self.messages = response.data;
          console.log('Messages list: ', self.messages);
        }),
        function(error) {
          console.log('Error with messages GET request: ', error);
        };
      });
    }
  }

  // Mark message as read
  self.markRead = function(message){
    return $http({
      method: 'PUT',
      url: '/message/read-message',
      data: {
        message: message.item
      }
    })
    .then(function(response) {
      console.log('Response from server: ', response);
    }),
    function(error) {
      console.log('Error with message-read PUT request: ', error);
    };
  };

  self.openMessage = function(message){
    
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

}]);
