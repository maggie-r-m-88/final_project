var geocoder;
var map;
var Data = {};

//
// var collection = [];
//
// var home_collection=[];
// var work_collection=[];

function initialize() {

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


 collection = App.riders.models;

 home_collection = _.map(collection, function(object){return object.attributes.home_latlong; });
  work_collection = _.map(collection, function(object){return object.attributes.work_latlong; });

 Array.prototype.long = function () {
    return this[1];
};
Array.prototype.lat = function (){
  return this[0];
}

//here i am just calculating between my first and second rider
var x1 = home_collection[1].lat()
var y1 = home_collection[1].long()
var x2 = home_collection[2].lat()
var y2 = home_collection[2].long()

  //this will stay constant
	var Rm = 3961; // mean radius of the earth (miles) at 39 degrees from the equator
	var Rk = 6373; // mean radius of the earth (km) at 39 degrees from the equator

	/******* main function *********/
	function findDistance() {
		var t1, n1, t2, n2, lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km;

		// get values for lat1, lon1, lat2, and lon2
		t1 = x1;
		n1 = y1;
		t2 = x2;
		n2 = y2;

		// convert coordinates to radians
		lat1 = deg2rad(t1);
		lon1 = deg2rad(n1);
		lat2 = deg2rad(t2);
		lon2 = deg2rad(n2);

		// find the differences between the coordinates
		dlat = lat2 - lat1;
		dlon = lon2 - lon1;

		// here's the heavy lifting
		a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
		c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
		dm = c * Rm; // great circle distance in miles
		dk = c * Rk; // great circle distance in km

		// round the results down to the nearest 1/1000
		mi = round(dm);
		km = round(dk);
    console.log(mi);
	  console.log(km);
	}


	// convert degrees to radians
	function deg2rad(deg) {
		rad = deg * Math.PI/180; // radians = degrees * pi/180
		return rad;
	}


	// round to the nearest 1/1000
	function round(x) {
		return Math.round( x * 1000) / 1000;
	}

findDistance();


//end initialize
    }


google.maps.event.addDomListener(window, 'load', initialize);

geocoder = new google.maps.Geocoder();

window.getCoordinates = function ( address, callback) {
  var coordinates;

  geocoder.geocode({ address: address}, function (results, status){
     coords_obj = results[0].geometry.location;
     coordinates = [coords_obj.k, coords_obj.B];
     callback(coordinates);
  })

}
