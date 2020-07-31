var map, infoWindow;
var region = "Region 1";
var prevLocation = 0;

//Radar work
Radar.initialize("prj_live_pk_5542d11954928326db9982907c69162e5c73160d");

Radar.setUserId("ID");

Radar.trackOnce(function(err, result) {
  if (!err) {
    console.log(result.location);
  }
});

// default
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.673370, lng: 255.036621},
    zoom: 600
  });
  infoWindow = new google.maps.InfoWindow;

  // get location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Homebase');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
