(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function () {
      // Light the Fire
      Parse.history.start();
    },

    routes: {
      '' : 'home',
      'hoodSearch' : 'hoods',
      'matches': 'matches',
      'allriders/:riderID': 'riderProfile',
      'myCommute' : 'myCommute',
      'edit/:riderID' : 'editRider',
      'add' : 'addRider',
      'signUp' : 'userSignUp',
      'login' : 'userLogin',
       'matchesCalc' : 'matchesCalc'

    },

    home: function () {
    //  new App.Views.PublicListRiders({ collection: App.riders });
      //new App.Views.ListRiders({ collection: App.riders });
    //  new App.Views.ListRiders({ collection: App.riders });
        new App.Views.HomeView();
    },


    matches: function(){

      new App.Views.PublicListRiders({ collection: App.riders });
    },

    matchesCalc: function(){

      new App.Views.matchesView({collection: App.riders});
      $('#test').html('hello hello');

      toy = $('#toy').val();


      currentUser = App.riders.find( function (a) {
          return a.attributes.user.id == App.user.id;
        });

      var results = _.map(collection, function(other) {
        return currentUser.findDistance(other);
      });

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


      var sorted = results.sort(dynamicSort("miles"));
           console.log(sorted);

      function isBigEnough(element) {
             return element.miles >  0 && element.miles < 10
                     && element.work_miles < 10 ;
          }

      var homefilter = sorted.filter(isBigEnough);

    //  console.log(homefilter);
      if (homefilter.length === 0) {
        $('.testresults').append("<li>" + 'No Current Matches Found' + "</li>");
      };

      var neighbors = _.each(homefilter, function(x) {
       $('.testresults').append("<li class='matcher'>" + "<a href='"+ '#/allriders/' + x.objectId +"' >"  + "<p class='stats'>"+'Home:  ' + x.miles +'mi' +'    '+ 'Work:  ' +  x.work_miles + 'mi' + "</p>" + "<img class='matchpic' src='" + x.picture + "'/>" + "<h3>" + x.username + "</h3>" +   "</a>" + "</li>");
       });


    },

     myCommute: function () {

       new App.Views.ListRiders({ collection: App.riders });

     },

    riderProfile: function (riderID) {
      var c = App.riders.get(riderID);
      new App.Views.riderProfileListing({ rider: c });
    },

    editRider: function (riderID) {
      var c = App.riders.get(riderID);
      new App.Views.SingleRider({ rider: c });
    },

    addRider: function () {

      new App.Views.AddRider();

    },

    userSignUp: function(){
      new App.Views.SignUpView();
    },

    userLogin: function(){
      new App.Views.LoginView();
    },

  });

}());
