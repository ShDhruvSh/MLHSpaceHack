var map, infoWindow;
var region = "Region 0";
var prevLat;
var prevLong;
var currLat;
var currLong;
var distanceTravelled;
var score;
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyCshzo4pnxHj7zkaDrR4tthwotTleGS4JY',
  authDomain: 'space-65ce3.firebaseapp.com',
  projectId: 'space-65ce3'
});

var db = firebase.firestore();

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

function updateScore() {
  var txtOutput = document.getElementById("scoreTracker");
  txtOutput = "Score: " + score;
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

      prevLat = position.coords.latitude;
      prevLong = position.coords.longitude;
      currLat = position.coords.latitude;
      currLong = position.coords.longitude;
      distanceTravelled = calcDistanceTravelled(prevLat, currLat, prevLong, currLong);
      score = 100;
      updateScore();

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
