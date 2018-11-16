angular.module("MapQuestAPP", [])
    .controller('MapController', function($scope, $http) {

        $scope.showDirection = function() {

            var API_KEY = "13aTiMMtSDePWYoITG95I5skp900AcGS";

            var mFromLocation = encodeURIComponent($scope.fromLocation);
            var mToLocation = encodeURIComponent($scope.toLocation);

            $http.jsonp("http://open.mapquestapi.com/directions/v2/route?key=" + API_KEY + "&from=" + mFromLocation + "&to=" + mToLocation + "&callback=JSON_CALLBACK").success(function(data) {

                    $scope.info = "Distance: " + data.route.distance + " miles\t Time: " + data.route.formattedTime;

                    $scope.maneuvers = data.route.legs[0].maneuvers;

            });


        }
    });
