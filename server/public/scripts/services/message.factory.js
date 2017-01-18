app.factory('MessageFactory', ['$http', function($http){
  console.log('MessageFactory running');

 var messages = {};
 var currentMessage = {};




 var publicApi = {
   messages: messages,
   currentMessage: currentMessage,
   
 };

 return publicApi;



}]);
