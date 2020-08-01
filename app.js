var map, infoWindow;
var region = "Region 0";
var nearby = [];
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
        lat:39.709451,
        lng: -105.084629
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

      var request = {
      location: pos,
      radius: '10',
      query: 'store'
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback, pos);
    var service = new google.maps.DistanceMatrixService();
    for(var i = 0; i < nearby.length; i++){
      console.log(nearby[i]);
    service.getDistanceMatrix(
      {
        origins: [pos, nearby[i]],
        destinations: ["curr", "store"],
        travelMode: 'DRIVING',
        transitOptions: TransitOptions,
        drivingOptions: DrivingOptions,
        unitSystem: UnitSystem,
        avoidHighways: Boolean,
        avoidTolls: Boolean,
      }, callback);

    }


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

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      nearby[i] = results[i];
    }
  }
}

function callback_distance(response, status) {
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        console.log(distance);
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
}
