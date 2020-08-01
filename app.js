var region = "Astronaut (You)";
var all_markers = [];
var marker2;
var isRedTeam;
var isWearingMask;
var prevLat;
var prevLong;
var currLat;
var currLong;
var distanceTravelled;
var score;
var firebaseConfig = {
  apiKey: "AIzaSyCshzo4pnxHj7zkaDrR4tthwotTleGS4JY",
  authDomain: "space-65ce3.firebaseapp.com",
  databaseURL: "https://space-65ce3.firebaseio.com",
  projectId: "space-65ce3",
  storageBucket: "space-65ce3.appspot.com",
  messagingSenderId: "62019877260",
  appId: "1:62019877260:web:115d17a6348d265027bea9",
  measurementId: "G-C9NHYCEZCR"
};


// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const docRef = db.doc("samples/users");


function calcDistanceTravelled(lat1, lat2, long1, long2) {
  lat1 = lat1/(180/Math.PI);
  lat2 = lat2/(180/Math.PI);
  long1 = long1/(180/Math.PI);
  long2 = long2/(180/Math.PI);

  dLong = long2-long1;

  a = 3963.0 * Math.acos((Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLong));

  //window.alert("You have travelled " + a + " miles!");
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

function updateYes(){

  docRef.set({
    hotDogStatus: 0
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
});
}


function updateNo(){

  docRef.set({
    hotDogStatus: 0
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
});
}

function selectMask(){
  isWearingMask = true;
  updateYes();
  window.alert("You are a good soul and an amazing human being thank you for existing on this planet I feel very safe now because of you!")
}

function notWearingMask(){
  isWearingMask = false;
  document.body.style.background = "none";
  document.body.style.backgroundColor = "rgba(255,0,0,0.9)";
  document.body.style.backgroundSize = "200% 200%";
  updateNo();
  window.alert("You're a terrible human being REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
}

function updateScore() {
  document.getElementById("scoreTracker").innerHTML = "Score: " + score;
}



// default
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.673370, lng: 255.036621},
    zoom: 600,
    styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#242f3e"
                }
              ]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#242f3e"
                }
              ]
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#746855"
                }
              ]
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563"
                }
              ]
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [
                {
                  color: "#263c3f"
                }
              ]
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#6b9a76"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#38414e"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#212a37"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#9ca5b3"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#746855"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#1f2835"
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#f3d19c"
                }
              ]
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [
                {
                  color: "#2f3948"
                }
              ]
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#17263c"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#515c6d"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#17263c"
                }
              ]
            }
          ]
  });
  infoWindow = new google.maps.InfoWindow;

  // get location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        //lat:39.709451,
        //lng: -105.084629
        lat:position.coords.latitude,
        lng: position.coords.longitude
      };

      prevLat = position.coords.latitude;
      prevLong = position.coords.longitude;
      currLat = position.coords.latitude;
      currLong = position.coords.longitude;
      distanceTravelled = calcDistanceTravelled(prevLat, currLat, prevLong, currLong);
      score = score + distanceTravelled * 100;
      updateScore();

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
    service.textSearch(request, callback);

    var astronaut = "https://img.icons8.com/officel/80/000000/astronaut.png";

    marker2 = new google.maps.Marker({position: pos, map: map, icon: astronaut});

    if(document.getElementById("main_title").innerHTML != "Spacing Out! (Earth)"){
      //the user is at the store
    } else {
      //the user is at home
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
    var title = "Spacing Out! (Earth)";
    for(var i = 0; i < results.length; i++){
      if(createMarker(results[i]) < .02){
        title = "Spacing Out! (USS " + results[i].name + ")";
      }
    }

    document.getElementById("main_title").innerHTML = title;

  }
}

function createMarker(place) {
  var shuttle = "https://img.icons8.com/color/96/000000/launched-rocket.png";
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    icon: shuttle,
    title: place.name
  });

  return haversine_distance(marker, marker2);
}

function haversine_distance(mk1, mk2) {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
      var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
    }
