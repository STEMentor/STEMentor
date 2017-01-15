app.controller('MessageController', ['$http', function($http) {
  console.log('MessageController running');
  var self = this;
  self.newMessage = [];

  self.sendMessage = function(){
    console.log('newMessage: ', self.newMessage);
    
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
