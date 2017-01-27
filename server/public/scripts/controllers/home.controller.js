app.controller('HomeController', ['$http', 'AuthFactory', '$mdDialog', function($http, AuthFactory, $mdDialog) {
  // console.log('HomeController running');
  var self = this;

  self.userStatus = AuthFactory.userStatus;

  self.dataArray = [
    { src: '../assets/images/carousel/genome-sm.jpg' },
    { src: '../assets/images/carousel/falkirk-wheel-sm.jpg' },
    { src: '../assets/images/carousel/iss-sm.jpg' },
    { src: '../assets/images/carousel/shark-sm.jpg' },
    { src: '../assets/images/carousel/snowflake-sm.jpg' },
    { src: '../assets/images/carousel/virus-sm.jpg' },
    { src: '../assets/images/carousel/rock-formation-sm.jpg' },
    { src: '../assets/images/carousel/circuit-board-sm.jpg' }
  ];

  self.logInModal = function(ev) {
    $mdDialog.show({
        controller: 'LoginController as login',
        templateUrl: '../../views/mentor-login-modal.html',
        targetEvent: ev,
        clickOutsideToClose: true
      });
  };

}]);
