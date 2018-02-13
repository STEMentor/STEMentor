app.controller('SignUpController', ['$scope', '$mdDialog', '$firebaseAuth', 'AuthFactory', '$http', 'MessageFactory', '$location', function ($scope, $mdDialog, $firebaseAuth, AuthFactory, $http, MessageFactory, $location) {
    //console.log('Signup Controller Loaded');
    var self = this;
    var auth = $firebaseAuth();

    self.registerNewUser = function (newUser) {
        //console.log('New User details: ', newUser.email, newUser.password);
        var newUserToSave = {
            email: newUser.email,
            password: newUser.password,
            userType: newUser.userType
        }
        AuthFactory.registerNewUser(newUserToSave);
    }

    self.openFirstLoginModal = function (ev) {
        $mdDialog.show({
            controller: 'FirstLoginModalController as first',
            templateUrl: '../../views/first-login-modal.html',
            targetEvent: ev,
            clickOutsideToClose: false
        });
        // .then(function(answer) {
        //   $scope.status = 'You said the information was "' + answer + '".';
        // }, function() {
        //   $scope.status = 'You cancelled the dialog.';
        // });
    };

    //Check if mentor is logging in for the first time
    function firstTimeMentor() {
        if (AuthFactory.userStatus.newUser === true && AuthFactory.userStatus.userType == 'mentor') {
            // launchPopup();
            self.openFirstLoginModal();
        }
        MessageFactory.getUnreadMessages();
    }

    self.googleLogIn = function (userType, ev) {
        AuthFactory.logIn(userType).then(function (response) {
            // console.log('Logged In: ', AuthFactory.userStatus.isLoggedIn);
        })
            .then(function () {
                setTimeout(firstTimeMentor, 2000);
                self.cancel();
                $location.path('home');
            });
    };

    self.cancel = function () {
        $mdDialog.cancel();
    };
}]);