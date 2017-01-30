app.controller('InboxController', ['$http', 'AuthFactory', 'MessageFactory', '$mdDialog', 'BioFactory', function($http, AuthFactory, MessageFactory, $mdDialog, BioFactory) {
  // console.log('InboxController running');
  var self = this;

  self.userStatus = AuthFactory.userStatus;
  self.messages = [];
  self.person = BioFactory.mentorBio;
  self.selectedMessage = MessageFactory.currentMessage;

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
        }),
        function(error) {
          console.log('Error with messages GET request: ', error);
        };
      });
    }
  }

  //Bring up message creation modal
  self.createMessage = function(ev, clickedMessage) {
    // MessageFactory.setMessage(clickedMessage.item);
    $mdDialog.show({
      controller: 'MessageController as message',
      templateUrl: '../../views/message-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  //Bring up message modal
  self.viewMessage = function(ev, clickedMessage) {
    MessageFactory.setMessage(clickedMessage.item);
    if (clickedMessage.item.reply || self.userStatus.userType === 'student'){
      $mdDialog.show({
        controller: 'MessageController as message',
        templateUrl: '../../views/message-modal-static.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
    } else {
      $mdDialog.show({
        controller: 'MessageController as message',
        templateUrl: '../../views/message-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
    }
  };

  self.markAsRead = function() {
    AuthFactory.auth.$onAuthStateChanged(function(currentUser) {
      markRead(currentUser);
    });
  };

  // Mark message as read
  function markRead(currentUser) {
    if(currentUser){
      return currentUser.getToken().then(function(idToken) {
        return $http({
          method: 'PUT',
          url: '/message/read-message',
          headers: {
            id_token: idToken
          },
          data: {
            message: self.selectedMessage.thing
          }
        })
        .then(function(response) {
          MessageFactory.getUnreadMessages();
          getMessages(currentUser);
        }),
        function(error) {
          console.log('Error with message-read PUT request: ', error);
        };
      });
    }
  }

}]);
