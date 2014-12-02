/*
var other_users = _.filter(App.users, {id: App.user.id});
var results = _.map(other_users, function(other) {
  App.currentUser.find_distance(other);
});

function find_distance(other) {
// Magic happens here.
  var distance = ...?
  return {user: other.name, distance: distance};
}

var neighbors = _.filter(results, function(x) {
  if(x.distance < 5) return true;
});
*/
var geocoder;
var map;
var Data = {};
var CurrentUser;
var currentUser;
var findDistance;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  collection = App.riders.models;

/*define our current user*/
currentUser = App.riders.find( function (a) {
    return a.attributes.user.id == App.user.id;
  });

var currentUserData = currentUser.attributes.home_latlong;

x1=((currentUserData)[0])
y1=((currentUserData)[1])


var Rm = 3961;
var Rk = 6373;
var otherUserData;

    findDistance = function(otherUser) {

    var dlat, dlon, a, c, dm, dk, mi, km;
    /* define our other user*/
    otherUserDataLat = otherUser.attributes.home_latlong[0];
    otherUserDataLong = otherUser.attributes.home_latlong[1];
    dlat= deg2rad(otherUserDataLat) - deg2rad(x1);
    dlon= deg2rad(otherUserDataLong) - deg2rad(y1);

		// here's the heavy lifting
		a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(x1) * Math.cos(otherUserDataLat) * Math.pow(Math.sin(dlon/2),2);
		c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
		dm = c * Rm; // great circle distance in miles
		dk = c * Rk; // great circle distance in km

		// round the results down to the nearest 1/1000
		mi = round(dm);
		km = round(dk);
    console.log(mi + ' mi');
	  console.log(km + ' km');
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
