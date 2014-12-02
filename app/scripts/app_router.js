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
      'login' : 'userLogin'
      // 'rideCalc' : 'rideCalc'

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
