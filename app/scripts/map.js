/*
function find_distance(other) {
// Magic happens here.
  var distance = ...?
  return {user: other.name, distance: distance};
}

var neighbors = _.filter(results, function(x) {
  if(x.distance < 5) return true;
});
// var results = _.map(collection, function(other) {
//   currentUser.findDistance(other);
// });
// console.log(results);
*/

var geocoder;
var map;
var Data = {};
var CurrentUser;
var currentUser;
var findDistance;

// function initialize() {
//    geocoder = new google.maps.Geocoder();
//    var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
//    var mapOptions = {
//      zoom: 10,
//      center: latlng
//    }
//    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//
//    collection = App.riders.models;
//
// /**********define our current user*********** this is global*******/
// currentUser = App.riders.find( function (a) {
//     return a.attributes.user.id == App.user.id;
//   });
//
//       }
//
// google.maps.event.addDomListener(window, 'load', initialize);

 geocoder = new google.maps.Geocoder();


window.getCoordinates = function ( address, callback) {
  var coordinates;

  geocoder.geocode({ address: address}, function (results, status){
    console.log(results)
     coords_obj = results[0].geometry.location;
     coordinates = [coords_obj.k, coords_obj.D];
     callback(coordinates);
  })

}
