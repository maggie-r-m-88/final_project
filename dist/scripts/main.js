var geocoder;
var map;
var Data = {};
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(33.89307300000001, -84.339921);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
    position:  latlng,
    map: map,
    title: 'home'

  })
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location

      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

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

//function below spits me out lat and long coordinates
//window.getCoordinates('1045 mission street', function(coordinates) {console.log(coordinates) })
//window.getCoordinates($('#address_input').value, function(coordinates) {console.log(coordinates) })

$( "#submit_address" ).click(function() {


   var addy_home = home_address_input.value;
   window.getCoordinates(addy_home,
        function(coordinates_home)
        {
          Data.homeCords = coordinates_home;
          console.log(Data.homeCords)

        });
  var addy_work = work_address_input.value;
  window.getCoordinates(addy_work,
       function(coordinates_work)
       {
         Data.workCords = coordinates_work;
         console.log(Data.workCords)
       });


});




// var lat = results[0].geometry.location.lat();
// var lng = results[0].geometry.location.lng();

(function () {

  App.Models.Rider = Parse.Object.extend({

    className: 'Rider',

    idAttribute: 'objectId',

    defaults: {
      name: '',
      work_address: '',
      home_address: '',
      home_latlong: '',
      work_latlong: ''
    },

    initialize: function () {
      var t = this.get('name');
      //console.log(t + " has been added");
    }

  });

}());


(function () {

  App.Collections.Riders = Parse.Collection.extend({
    model: App.Models.Rider
  });

}());

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

(function () {

  App.Views.SingleRider = Parse.View.extend({

    tagName: 'ul',
    className: 'riderSingle',

    events: {
      'submit #updateRider' : 'updateRider',
      'click #delete' : 'deleteRider'
    },

    template: _.template($('#singleTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();



      // Get our Element On Our Page
      $('#riderList').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.rider.toJSON()));

    },

    updateRider: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.rider.set({
        name: $('#update_name').val(),
        home_address: $('#update_home_address').val(),
        work_address: $('#update_work_address').val()
      });

      // Save Instance
      this.options.rider.save();


      App.router.navigate('', {trigger: true});

    },

    deleteRider: function (e) {
      e.preventDefault();

      // Remove Coffee
      this.options.rider.destroy();

      // Go home ET
      App.router.navigate('', {trigger: true});

    }

  });

}());

(function () {

  App.Views.AddRider = Parse.View.extend({

    events: {
      'submit #addRider' : 'addRider'
    },

    initialize: function () {
      this.render();

      $('#riderList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());
    },

    addRider: function (e) {
      e.preventDefault();

      var addy_home =  $('#rider_home').val();
        window.getCoordinates(addy_home,
            function(coordinates_home)
            {
              Data.homeCords = coordinates_home;

            });

      var addy_work =  $('#rider_work').val();
      window.getCoordinates(addy_work,
           function(coordinates_work)
           {
             Data.workCords = coordinates_work;
             console.log(Data.workCords)
           });

      var c = new App.Models.Rider({
        name: $('#rider_name').val(),
        home_address: $('#rider_home').val(),
        work_address: $('#rider_work').val(),
        home_latlong: Data.homeCords,
        work_latlong: Data.workCords


      });

      c.save(null, {
        success: function () {
          App.riders.add(c);
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());

(function () {

  App.Views.ListRiders = Parse.View.extend({

    tagName: 'ul',
    className: 'allRiders',

    events: {},

    template: _.template($('#listTemp').html()),

    initialize: function (options) {

      this.options = options;

      this.render();

      this.collection.off();
      this.collection.on('sync', this.render, this);

      // Get our Element On Our Page
      $('#riderList').html(this.$el);



    },

    render: function () {
      var self = this;

      // Empty out
      this.$el.empty();


        // Sort from our default comparator in our collection constructor
  
        this.collection.each(function (c) {
          self.$el.append(self.template(c.toJSON()));
        });
      }


  });

}());

Parse.initialize("ZlXURNfISFDfQJfjyDJITna1XYOTSsJiH3EVw1Sv", "NM4JnHAME4e35LZKbq1sVIcw0Lu9dO9Bo5qZ5UqY");

(function () {

  // Create Instance of Collection
  App.riders = new App.Collections.Riders();

  // Fetch any server-side coffees
  App.riders.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

  });


}());
