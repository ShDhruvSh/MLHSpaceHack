var map, infoWindow;
var region = "Region 0";
var prevLat = 0;
var prevLong = 0;
var currLat = 0;
var currLong = 0;
var distanceTravelled = 0; //should be in miles
var score = distanceTravelled * 100;

//Radar work
Radar.initialize("prj_test_pk_c3a8e42cc392005ceac13fb535867c684ee1b208");

Radar.setUserId(Date.now);


Radar.trackOnce(function(err, result) {
  if (!err) {
    document.getElementById("info").innerHTML = "yeet";
  } else {
    console.log(err);
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
      infoWindow.setContent(region);
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

function calcDistanceTravelled(lat1, lat2, long1, long2){
  var lat1Radians = lat1/(180/Math.PI);
  var lat2Radians = lat2/(180/Math.PI);
  var long1Radians = long1/(180/Math.PI);
  var long2Radians = long2/(180/Math.PI);

  a = (Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) *
    Math.cos(long2 – long1))
  distanceTravelled = 3963.0 * Math.arccos(a)
}
