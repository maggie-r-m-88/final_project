Parse.initialize("ZlXURNfISFDfQJfjyDJITna1XYOTSsJiH3EVw1Sv", "NM4JnHAME4e35LZKbq1sVIcw0Lu9dO9Bo5qZ5UqY");

(function () {

  // Create Instance of Collection
  App.riders = new App.Collections.Riders();

  // Fetch any server-side coffees
  App.riders.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

    //adding this here hopefully it wont mess anything up but i dont have errors
     currentUser = App.riders.find( function (a) {
         return a.attributes.user.id == App.user.id;
       });
  });


var divs = $('.logo');
$(window).scroll(function(){
   if($(window).scrollTop()<100){
         divs.stop(true,true).fadeIn("slow");
   } else {
         divs.stop(true,true).fadeOut("slow");
   }
});

//
//
// $('#distance_calc').on('click', function (e) {
//   e.preventDefault();
//
//   var results = _.map(collection, function(other) {
//     return currentUser.findDistance(other, 'home');
//   });
//
//    var results2 = _.map(collection, function(other) {
//     return currentUser.findDistance(other, 'work');
//    });
//    console.log(results);
//   console.log('I live at ' + currentUser.attributes.home_address);
//   var neighbors = _.each(results, function(x) {
//     $('.matchresults').append("<li>" + x.username + ' house ' + ' is ' + x.miles + ' miles away' + "</li>");
//   });
//
//   console.log('I work at ' + currentUser.attributes.work_address);
//   var neighbors2 = _.each(results2, function(x) {
//   //  console.log(x.username + ' work ' + ' is ' + x.miles + ' miles away');
//     $('.matchresults2').append("<li>" + x.username + ' work ' + ' is ' + x.miles + ' miles away' + "</li>");
//   });
//
//
//
// });


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

    $('#loggedIn').html(currUsr);
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


}());
