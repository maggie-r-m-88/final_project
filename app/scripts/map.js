var geocoder;
var map;
var Data = {};
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(33.89307300000001, -84.339921);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
    position:  latlng,
    map: map,
    title: 'home'

  })
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location

      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
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

//function below spits me out lat and long coordinates
//window.getCoordinates('1045 mission street', function(coordinates) {console.log(coordinates) })
//window.getCoordinates($('#address_input').value, function(coordinates) {console.log(coordinates) })

$( "#submit_address" ).click(function() {


   var addy_home = home_address_input.value;
   window.getCoordinates(addy_home,
        function(coordinates_home)
        {
          Data.homeCords = coordinates_home;
          console.log(Data.homeCords)

        });
  var addy_work = work_address_input.value;
  window.getCoordinates(addy_work,
       function(coordinates_work)
       {
         Data.workCords = coordinates_work;
         console.log(Data.workCords)
       });


});




// var lat = results[0].geometry.location.lat();
// var lng = results[0].geometry.location.lng();
