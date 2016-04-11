'use strict';
var map;
var infowindow;

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: centerPoint,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch({
    location: centerPoint,
    radius: 1000,
    type: ['restaurant']
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      addPlaceToList(results[i]);
    }
    addHoverEffects();  
  }
}

function addPlaceToList(place){
  var output = ''; 
  output = '<p class = "place" data = "place'+iterator+'">Name: ' + place.name + '</br>'; 
  output += 'Address: ' + place.vicinity + '</br>'; 
  output += 'Rating: ' + place.rating + '</p>'; 
  $(output).appendTo('.list'); 
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('Name: ' + place.name + '</br>' + 
                          'Address: ' + place.vicinity + '</br>' + 
                          'Rating: ' + place.rating + '</br>' +
                          '<a href = "https://www.google.com/maps/place/' + encodeURIComponent(place.name) + '" target = _blank>Get Directions</a>   --   <a href = "http://protolocal.com">Review on Protolocal</a>'
                          );
    infowindow.open(map, this);
  });
}

// TODO: Create hover event handler for each item in the list. 
function addHoverEffects(){
  $('.place').hover(function(){
    console.log($('.place').data()); 
})};

// TODO: Create hover event handler for each item on map. 

// TODO: link event handlers to highlight place in list or add beacon to map on hover. 


