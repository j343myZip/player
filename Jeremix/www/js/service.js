var dataService = angular.module('dataService', ['ngResource']);
var url = "http://api.ukfrnlge.com/";
dataService
.factory('Shows', ['$resource',
  function($resource){
    return $resource(url+'shows', {}, {
      query: {method:'GET', params:{sort:'seed',quality:"720p,1080p,3d",page:1}, isArray:false},

    });
  }])
  .factory('Lists', ['$resource',
    function($resource){
      return $resource(url+'list', {keywords:'@q'}, {
        query: {method:'GET', params:{sort:'seed',quality:"720p,1080p,3d",page:1}, isArray:false},
        search:{method:'GET', params:{sort:'seed',quality:"720p,1080p,3d",page:1}, isArray:false},
      });
    }])
    .factory('Item', ['$resource',
      function($resource){
        return $resource(url+'show', {imdb:'@imdb'}, {
          show: {method:'GET', params:{}, isArray:false},

        });
      }]);
