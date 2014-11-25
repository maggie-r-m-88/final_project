console.log('The Iron Yard Rocks');


var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(33.7550, -84.3900);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
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


//geocoder.geocode({address: '4203 las palmas drive austin'}, function(results, status){ console.log(results); console.log(status)})

geocoder = new google.maps.Geocoder();

window.getCoordinates = function ( address, callback) {
  var coordinates;
  geocoder.geocode({ address: address}, function (results, status)
     coordinates = results[0].geometry.location;
     callback(coordinates);

  })

}
