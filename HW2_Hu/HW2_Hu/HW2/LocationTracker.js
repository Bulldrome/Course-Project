$(function() {

    $("#Start-Button").click(function() {

        var update_counter = 0;


        var options = {
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(initLocation, handleError, options);

        var current_marker = null;

        function initLocation(position) {

            var start_latitude = position.coords.latitude;
            var start_longitude = position.coords.longitude;
            var current_latitude = position.coords.latitude;
            var current_longitude = position.coords.longitude;

            $("#Update-Number").html(update_counter);
            $("#Start-Latitude").html(start_latitude);
            $("#Start-Longitude").html(start_longitude);
            $("#Current-Latitude").html(current_latitude);
            $("#Current-Longitude").html(current_longitude);

            var flightPlanCoordinates = [
                { lat: start_latitude, lng: start_longitude },
                { lat: current_latitude, lng: current_latitude }
            ];


            function updateLocation() {

                if (update_counter >= 1)
                    current_marker.setMap(null);

                update_counter++;

                if (update_counter == 50) {
                    clearInterval(this);
                }

                var latitude_change = Math.random() / 100;
                var longitude_change = Math.random() / 100;

                flightPlanCoordinates[0].lat = current_latitude;
                flightPlanCoordinates[0].lng = current_longitude;

                current_latitude += latitude_change;
                current_longitude += longitude_change;

                current_position = { latitude: current_latitude, longitude: current_longitude };
                // 
                flightPlanCoordinates[1].lat = current_latitude;
                flightPlanCoordinates[1].lng = current_longitude;

                $("#Update-Number").html(update_counter);
                $("#Current-Latitude").html(current_latitude);
                $("#Current-Longitude").html(current_longitude);


                var flightPath = new google.maps.Polyline({
                    path: flightPlanCoordinates,
                    geodesic: true,
                    strokeColor: '#0000FF',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                flightPath.setMap(map);

                current_marker = addMarker(map,
                    new google.maps.LatLng(current_latitude, current_longitude),
                    'Location Details',
                    "Lat: " + current_latitude + ", Long: " + current_longitude);


            }

            setInterval(updateLocation, 1000);

            // Show the google map with the position  
            showOnMap(position.coords);

        }


        function handleError(error) {
            switch (error.code) {
                case 1:
                    updateStatus("The user denied permission");
                    break;
                case 2:
                    updateStatus("Position is unavailable");
                    break;
                case 3:
                    updateStatus("Timed out");
                    break;
            }
        }



        // initialize the map and show the position
        function showOnMap(pos) {

            var googlePosition =
                new google.maps.LatLng(pos.latitude, pos.longitude);

            var mapOptions = {
                zoom: 10,
                center: googlePosition,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var mapElement = document.getElementById("map");
            map = new google.maps.Map(mapElement, mapOptions);

            // add the marker to the map
            var title = "Location Details";
            var content = "Lat: " + pos.latitude +
                ", Long: " + pos.longitude;

            current_marker = addMarker(map, googlePosition, title, content);
        }

        // add position marker to the map
        function addMarker(map, latlongPosition, title, content) {

            var options = {
                position: latlongPosition,
                map: map,
                title: title,
                clickable: true
            };

            var marker = new google.maps.Marker(options);

            var popupWindowOptions = {
                content: content,
                position: latlongPosition
            };

            var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

            google.maps.event.addListener(marker, 'click', function() {
                popupWindow.open(map);
            });

            return marker;
        }


    });

});

function initMap() {

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        // center: {lat: -34.397, lng: 150.644},
        scrollwheel: false,
        zoom: 10
    });
}
