'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    resolve: {
        coordinates: function (geoLocationApi) {
            return geoLocationApi;
        }
    }
  });
}])

.factory('geoLocationApi', ['$http', function ($http) {
    return {
        getTemperature: function(latitude, longitude) {
            return $http.get('http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=d3fb1a3b435cb49519920caa47a5c9b7');
        },
        getTemperatureByLocation: function(location) {
            return $http.get('http://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID=d3fb1a3b435cb49519920caa47a5c9b7');
        }
    };
}])

.controller('View1Ctrl', ['$http', '$scope', 'geoLocationApi',function($http, $scope, geoLocationApi) {

    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log('latitude: ' +latitude +', longitude: ' + longitude);
        var handleSuccess = function(data, status) {
            $scope.variableName = data.main.temp;
            console.log($scope.variableName);
        };
        geoLocationApi.getTemperature(latitude, longitude).success(handleSuccess);
    };
    function error() {
        alert('unable to retrieve location');
        $scope.$apply(function () {
            $scope.showInputBox = true;
        });
    };
    $scope.searchEnter = function(event) {
        if(event.which == 13) {
            console.log($scope.location);
            var handleSuccess = function(data, status) {
                $scope.variableName = data.main.temp;
                console.log($scope.variableName);
            };
            geoLocationApi.getTemperatureByLocation($scope.location).success(handleSuccess);
            return true;
        }
    };
}]);