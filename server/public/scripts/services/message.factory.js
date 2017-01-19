app.factory('MessageFactory', ['$http', function($http){
  console.log('MessageFactory running');

 // var messages = {};
 var currentMessage = {};

 function setMessage(item){
   currentMessage.thing = item;
   console.log('message factory currentMessage: ', currentMessage);
 }


 var publicApi = {
  //  messages: messages,
   currentMessage: currentMessage,
   setMessage: function(item){
     return setMessage(item);
   }
 };

 return publicApi;



}]);
