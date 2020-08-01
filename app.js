var map, infoWindow;
var region = "Region 0";

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

function calcDistanceTravelled(lat1, lat2, long1, long2) {
  lat1 = lat1/(180/Math.PI);
  lat2 = lat2/(180/Math.PI);
  long1 = long1/(180/Math.PI);
  long2 = long2/(180/Math.PI);

  dLong = long2-long1;

  a = 3963.0 * Math.acos((Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLong));

  window.alert("You have travelled " + a + " miles!");
}

function updatePrevCoords(){
  if (currLat != prevLat) prevLat = currLat;
  if (currLong != prevLong) prevLong = currLong;
}

function selectRedTeam(){
  isRedTeam = true;
  window.alert(isRedTeam);
}

function selectBlueTeam(){
  isRedTeam = false;
  window.alert(isRedTeam);
}

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

      var prevLat = position.coords.latitude;
      var prevLong = position.coords.longitude;
      var currLat = position.coords.latitude;
      var currLong = position.coords.longitude;
      var distanceTravelled = calcDistanceTravelled(prevLat, currLat, prevLong, currLong);
      var score = score + (distanceTravelled * 100);

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
