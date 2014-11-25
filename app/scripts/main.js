Parse.initialize("ZlXURNfISFDfQJfjyDJITna1XYOTSsJiH3EVw1Sv", "NM4JnHAME4e35LZKbq1sVIcw0Lu9dO9Bo5qZ5UqY");

(function () {

  // Create Instance of Collection
  App.riders = new App.Collections.Riders();

  // Fetch any server-side coffees
  App.riders.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

  });


}());
