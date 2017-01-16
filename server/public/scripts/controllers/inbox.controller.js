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
  var authInfo = AuthFactory.auth;
  var userType; // TODO: Where will this come from?
  self.messages = [];

  self.isLoggedIn = AuthFactory.userStatus.isLoggedIn;
  console.log(self.isLoggedIn);

  // Get all messages from the database for a specific user
  self.getMessages = function() {
    return $http({
      method: 'GET',
      url: '/message',
      headers: { userInfo: authInfo } // TODO: Not sure what would go here
    })
    .then(function(response) {
      self.messages = response.data;
      console.log('Messages list: ', self.messages);
    }),
    function(error) {
      console.log('Error with messages GET request: ', error);
    };
  };

  // Mark a message as read
  self.setMessageRead = function() {
    var messageId; // TODO: Need to get the message's ID somehow

    return $http({
      method: 'PUT',
      url: '/message/read-message',
      data: {
        messageId: messageId,
        authInfo: authInfo
      }
    })
    .then(function(response) {
      console.log('Response from server: ', response);
    }),
    function(error) {
      console.log('Error with message-read PUT request: ', error);
    };
  };

  // Reply to message
  self.replyToMessage = function() {
    var messageId; // TODO: Need to get the message's ID somehow

    return $http({
      method: 'PUT',
      url: '/message/reply',
      data: {
        messageId: messageId,
        authInfo: authInfo
      }
    })
    .then(function(response) {
      console.log('Response from the server: ', response);
    }),
    function(error) {
      console.log('Error with the reply PUT request: ', error);
    };
  };

  // call getMessages on page load
  self.getMessages();

//***** Phil's inbox JS *****//

self.messages = [{
      face : 'HEY',
      what: 'WHAT IS SCIENCE?',
      who: 'John Adams',
      when: '3:08PM',
      notes: " I need to know what science is"
    }, {
      face : "SUP",
      what: 'Brunch this weekend?',
      who: 'Cool Dog',
      when: '5:25PM',
      notes: " I'll be in your neighborhood doing errands"
    }, {
      face : "COOL",
      what: 'NASA?',
      who: 'Harry Potter',
      when: '1:45PM',
      notes: "What is NASA"
    }, {
      face : "ROCKIN",
      what: 'Im Hungry',
      who: 'Pepe',
      when: '3:33AM',
      notes: " I need to make some pizza"
    }, {
      face : "SWEET",
      what: 'Pizza Stuff?',
      who: 'Johnny Appleseed',
      when: '7:34PM',
      notes: " REALLY gotta make some pizza"
    }];

    self.createMessage = function(ev) {
      $mdDialog.show({
        controller: 'MessageController as message',
        templateUrl: '../../views/message-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

}]);
