Parse.initialize("ZlXURNfISFDfQJfjyDJITna1XYOTSsJiH3EVw1Sv", "NM4JnHAME4e35LZKbq1sVIcw0Lu9dO9Bo5qZ5UqY");

(function () {

  // Create Instance of Collection
  App.riders = new App.Collections.Riders();

  // Fetch any server-side coffees
  App.riders.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

    //adding this here hopefully it wont mess anything up but i dont have errors
    //  currentUser = App.riders.find( function (a) {
    //      return a.attributes.user.id == App.user.id;
    //    });
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
 var neighbors = _.each(found, function(x) {
     $('.hoodResults').append("<li>" +  "<img class='hoodprofile' src='" + x.attributes.picture._url + "'/>" + "</li>");
   });



}); //homeSearch  neighborhooods thing

}());
