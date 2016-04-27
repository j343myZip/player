// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngResource','dataService'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.init', {
    url: '/init',
    views: {
      'menuContent': {
        templateUrl: 'templates/init.html',
        controller: 'InitCtrl'
      }
    }
  })
  .state('app.movies', {
      url: '/movies',
      views: {
        'menuContent': {
          templateUrl: 'templates/movies.html',
          controller: 'MoviesCtrl'
        }
      }
    })
    .state('app.tvseries', {
        url: '/tvseries',
        views: {
          'menuContent': {
            templateUrl: 'templates/tvseries.html',
            controller: 'TvSeriesCtrl'
          }
        }
    })
    .state('app.item', {
              url: '/item/:imdb/:title',
              views: {
                'menuContent': {
                  templateUrl: 'templates/item.html',
                  controller: 'ItemCtrl'
                }
              }
            });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/init');
}).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
}).filter('escape', function() {
  return window.encodeURIComponent;
});
