var geocoder;
var map;
var Data = {};




function initialize() {

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // getYogaStudios(function (data){
  //   var studios = data.studios;
  //   var studio, latLng;
  //
  //   for (i in studios) {
  //     studio = studios[i];
  //     latLng = new google.maps.LatLng(studio.latitude, studio.longitude);
  //
  //     var marker = new google.maps.marker({
  //       position: latLng,
  //       map: map,
  //       title: studio.name
  //     });
  //   }
  //
  // })


App.riders.fetch({

 success: function(collection) {
       console.log(collection.models)


    collection.each(function(object) {


       }); //end of for each
     } //end of success
   }); //end of app.riders.fetch
} //end of initialize



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
