app.controller('HomeController', ['$http', function($http) {
  console.log('HomeController running');
  var self = this;

  self.logIn = function() {
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  self.dataArray = [{
      src: 'http://www.scind.org/content_images/full/1422719896Genome.jpg'
    },
    {
      src: 'http://www.technology.org/texorgwp/wp-content/uploads/2015/10/18167.jpg'
    },
    {
      src: 'https://s3.amazonaws.com/classconnection/580/flashcards/6473580/jpg/carcharodon_carcharias-1493631F70B6169541E.jpg'
    },
    {
      src: 'https://s-media-cache-ak0.pinimg.com/originals/4c/0b/23/4c0b2337981a1eb4aab3eb3dc0df5465.jpg'
    },
    {
      src: 'http://www.publicdomainpictures.net/pictures/180000/velka/antelope-canyon-rock-formation.jpg'
    },
    {
      src: 'http://circuits-central.com/wp-content/uploads/2015/09/home-2-1024x631.jpg'
    },
    {
      src: 'https://i.ytimg.com/vi/e6dS6grtt_w/maxresdefault.jpg'
    },
    {
      src: 'http://microbe.net/wp-content/uploads/2016/09/STS132_undocking_iss2.jpg'
    },
  ];
}]);
