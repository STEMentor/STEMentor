var app = angular.module('stementor', ['ngRoute', 'ngMaterial', 'jkAngularCarousel', 'firebase', 'ngMessages', 'material.svgAssetsCache', 'angular-flippy' ]);

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
  .when('/nav', {
    templateUrl: '/views/nav.html',
    controller: 'NavController',
    controllerAs: 'nav'
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
  .when('/settings', {
    templateUrl: '/views/settings.html',
    controller: 'SettingsController',
    controllerAs: 'settings'
  })
  .otherwise({
    redirectTo: 'home'
  });
}]);
