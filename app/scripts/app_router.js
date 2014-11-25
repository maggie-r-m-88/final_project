(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function () {
      // Light the Fire
      Parse.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:riderID' : 'editRider',
      'add' : 'addRider'

    },

    home: function () {
      new App.Views.ListRiders({ collection: App.riders });
    },

    editRider: function (riderID) {

      var c = App.riders.get(riderID);
      new App.Views.SingleRider({ rider: c });
    },

    addRider: function () {

      new App.Views.AddRider();

    }

  });

}());
