app.factory('MessageFactory', ['$http', function($http) {
  console.log('MessageFactory running');

  var currentMessage = {};

  function setMessage(item) {
    // console.log('item: ', item);
    currentMessage.thing = item;
    // console.log('message factory currentMessage: ', currentMessage);
  }

  var publicApi = {
    currentMessage: currentMessage,
    setMessage: function(item) {
      return setMessage(item);
    }
  };

  return publicApi;

}]);
