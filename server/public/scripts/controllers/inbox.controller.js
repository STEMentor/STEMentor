app.controller('InboxController', ['$http', function($http) {
  console.log('InboxController running');

var self = this;
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



}]);
