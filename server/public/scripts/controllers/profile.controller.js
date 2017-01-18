app.controller('ProfileController', ['$http', '$mdDialog', function($http, $mdDialog, $scope) {
  console.log('ProfileController running');

  var self = this;

  self.imagePath = '../server/public/assets/images/cooldog.jpeg';

  self.fields = {
    bio: ""
  };




  self.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
'WY').split(' ').map(function(state) {
    return {abbrev: state};
  });


  self.createMessage = function(ev) {
    $mdDialog.show({
      controller: 'MessageController as message',
      templateUrl: '../../views/message-modal.html',
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

//   $scope.test = 'Test Message';
// }).directive("ngPortlet", function ($compile) {
// return {
// template: '<div>{{test}}</div>   ',
// restrict: 'E',
// link: function (scope, elm) {
//     scope.add = function(){
//         console.log(elm);
//        elm.after($compile('<ng-portlet></ng-portlet>')(scope));
//     }
// }
// };

}]);
