var app = angular.module('stementor', ['ngRoute', 'ngMaterial', 'jkAngularCarousel', 'firebase', 'ngMessages', 'material.svgAssetsCache', 'angular-flippy']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('grey')
    .accentPalette('grey');
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: '/views/home.html',
    controller: 'HomeController',
    controllerAs: 'home'
  })
  .when('/about', {
    templateUrl: '/views/about.html',
    controller: 'AboutController',
    controllerAs: 'about'
  })
  .when('/inbox', {
    templateUrl: '/views/inbox.html',
    controller: 'InboxController',
    controllerAs: 'inbox'
  })
  .when('/message', {
    templateUrl: '/views/message.html',
    controller: 'MessageController',
    controllerAs: 'message'
  })
  .when('/profile', {
    templateUrl: '/views/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profile'
  })
  .when('/search', {
    templateUrl: '/views/search.html',
    controller: 'SearchController',
    controllerAs: 'search'
  })
  .otherwise({
    redirectTo: 'home'
  });
}]);
