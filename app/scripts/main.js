console.log('The Iron Yard Rocks');
var map;
function initialize() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(33.7550, -84.3900)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
