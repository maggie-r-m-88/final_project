Parse.initialize("ZlXURNfISFDfQJfjyDJITna1XYOTSsJiH3EVw1Sv", "NM4JnHAME4e35LZKbq1sVIcw0Lu9dO9Bo5qZ5UqY");

(function () {

  // Create Instance of Collection
  App.riders = new App.Collections.Riders();

  // Fetch any server-side coffees
  App.riders.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

//
// console.log(App.riders.models[0].attributes.home_latlong)
// console.log(App.riders.models[1].attributes.home_latlong)
// console.log(App.riders.models[2].attributes.home_latlong)

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
    App.router.navigate('', {trigger: true});
  });


  //  Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user === null){
      currUsr = '';
      $('#pattern').hide();
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
       $('#pattern').show();
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();

// 
// $('#login-link').on('click', function(e){
//   e.preventDefault();
//   $('#loginField').show();
//
// });




}());
