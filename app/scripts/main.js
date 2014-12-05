Parse.initialize("ZlXURNfISFDfQJfjyDJITna1XYOTSsJiH3EVw1Sv", "NM4JnHAME4e35LZKbq1sVIcw0Lu9dO9Bo5qZ5UqY");

(function () {

  // Create Instance of Collection
  App.riders = new App.Collections.Riders();

  // Fetch any server-side coffees
  App.riders.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

        var collection = App.riders.models
  });


var divs = $('.logo');
$(window).scroll(function(){
   if($(window).scrollTop()<100){
         divs.stop(true,true).fadeIn("slow");
   } else {
         divs.stop(true,true).fadeOut("slow");
   }
});



  $('#logOut').on('click', function (e) {
    e.preventDefault();
    Parse.User.logOut();
    App.updateUser();
    console.log('user has logged out');
    $('.topnavlinks').show();
    App.router.navigate('', {trigger: true});
  });


  //  Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user === null){
      currUsr = '';
      $('#logOut').hide();
      $('#pattern').hide();


    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
       $('#pattern').show();
       $('.topnavlinks').hide();
    }

    //$('#loggedIn').html(currUsr);
  };

  App.updateUser();

App.addButton = function(){
  App.user = Parse.User.current();
  if (App.user.id === null){
    $('#adder').show();
  }
  else{
    $('#adder').hide();
  }

};

var geocoder;
var map;
var marker_array = [
    ['maggie', 33.848688, -84.37332900000001],
    ['tim', 33.848688, -84.37332900000001],
    ['erin', 33.8460287, -84.3718806]
  ];

// function showMap() {
//   geocoder = new google.maps.Geocoder();
//   var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
//   var mapOptions = {
//     zoom: 14,
//     center: latlng
//   }
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//
//   var markers = [
//       ['maggie', 33.848688, -84.37332900000001],
//       ['tim', 33.848688, -84.37332900000001],
//       ['erin', 33.8460287, -84.3718806]
//     ];
//
//    var markersset = _.each(test, function (x) {
//
//     var latlng = new google.maps.LatLng(x[1], x[2]);
//     new google.maps.Marker({
//     position: latlng,
//     map: map
//             });
//
//         });
//
//
// } //this is the end of initialize
 //showMap();


  window.getCoordinates = function ( address, callback) {
    var coordinates;

    geocoder.geocode({ address: address}, function (results, status){
       coords_obj = results[0].geometry.location;
       coordinates = [coords_obj.k, coords_obj.B];
       callback(coordinates);
    });
  }

$('#homeSearchButton').on('click', function(){
 $('.hoodResults').empty();
 var home_hood =  $('#home_hood').val();
 var work_hood =  $('#work_hood').val();

   var collection = App.riders.models;
   var found = _.filter(collection, function(item){
    return item.get('home_neighborhood') === home_hood &&
           item.get('work_neighborhood') === work_hood
});
     console.log(found)

     var found_points = _.map(found, function(item){
      return item.get('work_latlong')

  });
   console.log(found_points);


    function showMap() {
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
      var mapOptions = {
        zoom: 14,
        center: latlng
      }
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

       var markersset = _.each(found_points, function (x) {

        var latlng = new google.maps.LatLng(x[0], x[1]);
        new google.maps.Marker({
        position: latlng,
        map: map
                });

            });


    }




    showMap();

 //
 // var neighbors = _.each(found, function(x) {
 //     $('.hoodResults').append("<li>" +  "<img class='hoodprofile' src='" + x.attributes.picture._url + "'/>" + "</li>");
  //  });







}); //homeSearch  neighborhooods thing-->

}());
