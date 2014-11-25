geocoder = new google.maps.Geocoder();

window.getCoordinates = function ( address, callback) {
  var coordinates;
  geocoder.geocode({ address: address}, function (results, status){
     coords_obj = results[0].geometry.location;
     coordinates = [coords_obj.k, coords_obj.B];
     callback(coordinates);
  })

}

//function below spits me out lat and long coordinates
window.getCoordinates('1045 mission street', function(coordinates) {console.log(coordinates) })
