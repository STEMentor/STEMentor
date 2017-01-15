app.controller('MessageController', ['$http', function($http) {
  console.log('MessageController running');
  var self = this;
  self.newMessage = [];

  self.sendMessage = function(){
    console.log('newMessage: ', self.newMessage);
    
  }

}]);
