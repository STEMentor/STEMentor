app.controller('MessageController', ['$http', 'AuthFactory', '$mdDialog', function($http, AuthFactory, $mdDialog) {
  console.log('MessageController running');
  var self = this;
  self.newMessage = [];
  var authInfo = AuthFactory.auth;
  var userStatus = AuthFactory.userStatus;
  // var messageInfo =

  // console.log(InboxController.selectedMessage);

  self.userStatus = AuthFactory.userStatus;

  self.sendMessage = function(message){
    console.log('newMessage: ', self.newMessage);
    console.log('authInfo: ', authInfo);
    console.log('userStatus: ', userStatus);
    // $http.post('/message/new-message', self.newMessage);
    //   .then(function(response) {
    //     console.log('response: ', response);
    //   });
  // };

  };

  self.cancel = function() {
    $mdDialog.cancel();
  };



}]);




// To create a new message when a student clicks "Send Message"
// 	- Send a `POST` request to `/message/new-message`
// 		- Must send token to be decoded
// 		- Must send a `message` object on data following this template:
// 			message {
// 				mentorEmail: 'mentor's email address',
// 				subject: 'subject text',
// 				body: 'body text',
// 				studentName: 'optional student name'
// 			}
