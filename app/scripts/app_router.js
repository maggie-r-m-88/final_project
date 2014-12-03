(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function () {
      // Light the Fire
      Parse.history.start();
    },

    routes: {
      '' : 'home',
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
        new App.Views.HomeView();
    },

    // rideCalc: function(){
    //   new App.Views.rideCalcView();
    // },

    matches: function(){

      new App.Views.PublicListRiders({ collection: App.riders });
    },

    matchesCalc: function(){

      new App.Views.matchesView({collection: App.riders});
      $('#test').html('hello hello');

      currentUser = App.riders.find( function (a) {
          return a.attributes.user.id == App.user.id;
        });

      var results = _.map(collection, function(other) {
        return currentUser.findDistance(other);
      });

      function isBigEnough(element) {
             return element.miles >  0 && element.miles < 12
                     && element.work_miles < 12 ;
          }

      var homefilter = results.filter(isBigEnough);

      console.log(homefilter);


      var neighbors = _.each(homefilter, function(x) {
       $('.testresults').append("<li class='matcher'>" + "<a href='"+ '#/allriders/' + x.objectId +"' >"  + "<img class='matchpic' src='" + x.picture + "'/>" + x.username + ' house ' + ' is ' + x.miles + ' miles away' + x.work_miles + 'work mi away' + "</a>" + "</li>");
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
