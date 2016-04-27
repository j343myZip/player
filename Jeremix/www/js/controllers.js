angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,Lists,Shows) {
  $scope.input={
    search:""
  };
  $scope.alert=function(){
          Shows.query({keywords:$scope.input.search},function(data){
            $scope.$broadcast('seriesSearch', data.MovieList);
          });
  }
})

.controller('InitCtrl', function($scope,$stateParams) {

})
.controller('TvSeriesCtrl', function($scope, $stateParams,Shows) {
  var data =Shows.query(function(data){
    $scope.series = data.MovieList;
   });
   $scope.$on('seriesSearch', function (event, data) {
     $scope.series = data; // 'Data to send'
   });
}).controller('ItemCtrl', function($scope, $stateParams,Lists,Item,$ionicModal) {
  $scope.item={
    title:$stateParams.title
  };
  Item.show({imdb:$stateParams.imdb},function(data){
    $scope.seasons=data;
  });
  $scope.open=function(episode){
    var WebTorrent = require('webtorrent');
    var client = new WebTorrent()

    // Sintel, a free, Creative Commons movie
    var torrentId = episode.items[0].torrent_magnet;

    client.add(torrentId, function (torrent) {
      // Torrents can contain many files. Let's use the first.

      var indice = 0;
      for(var x=0;torrent.files.length>x;x++){
        var extension = torrent.files[x].name.split(".");
         extension = extension[extension.length-1];
         var VIDEOSTREAM_EXTS = ['.mp4', '.m4a', '.m4v', '.webm', '.mkv'];
         if(VIDEOSTREAM_EXTS.indexOf("."+extension)!=-1)
         {
           indice = x;
           break;
         }
      }
        var file = torrent.files[indice];
      // Display the file by adding it to the DOM.
      // Supports video, audio, image files, and more!
      console.log(torrent);
      $scope.modal.show();

      file.appendTo('#videoEtiqueta',function(err,data){
        console.log(err);
        console.log(data);
      });
    })
  };
  $ionicModal.fromTemplateUrl('video.html', {
     scope: $scope,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.modal = modal;
   });
}).controller('MoviesCtrl', function($scope, $stateParams,Lists) {
  var data =Lists.query(function(data){
    $scope.movies = data.MovieList;
   });
   $scope.$on('moviesSearch', function (event, data) {
     $scope.series = data; // 'Data to send'
   });
});
