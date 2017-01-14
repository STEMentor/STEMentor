/*----------------------------------------------------------------------------//
MESSAGING RULES:

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
//----------------------------------------------------------------------------*/

app.controller('InboxController', ['$http', function($http) {
  console.log('InboxController running');



}]);
