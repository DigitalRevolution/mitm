'use strict';

var locationOne; 
var locationTwo; 
var centerPoint = {}; 
var coords = [];
var i = 0; 


$("#locationInput").submit(function(e) {
	e.preventDefault();
	assignURLs();
	retreive();
});

function assignURLs(){
	locationOne = encodeURIComponent(document.getElementById('locationOne').value);
	locationTwo = encodeURIComponent(document.getElementById('locationTwo').value);
};

function retreive(){
	retreiveCoords(locationOne); 
	retreiveCoords(locationTwo); 
};

function retreiveCoords(location){
	var locationJSON = $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+ location +'&key=AIzaSyDhEvi1ghIVk_3yQZElcWLblzpMpAH2Ios', callback);

function callback(){
	var lat = locationJSON.responseJSON.results[0].geometry.location.lat;
	var lng = locationJSON.responseJSON.results[0].geometry.location.lng;
	coords.push(new coordsConstructor(lat, lng));
	console.log(lat + " ," + lng);
	i++;
	if (i === 2) {
		calcCenterpoint();
	} 
	}; 
};

var calcCenterpoint = function() {
	var centerLat = (coords[0].lat + coords[1].lat)/2;
	var centerLng = (coords[0].lng + coords[1].lng)/2;
	centerPoint = {"lat":centerLat, "lng":centerLng}
	console.log(centerPoint); 
};

function coordsConstructor(lat, lng){
	this.lat = lat;
	this.lng = lng; 
}; 