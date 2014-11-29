(function () {

  App.Models.Rider = Parse.Object.extend({

    className: 'Rider',

    idAttribute: 'objectId',

    defaults: {
      name: '',
      work_address: '',
      home_address: ''

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
      'add' : 'addRider',
      'signUp' : 'userSignUp',
      'login' : 'userLogin'

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

    },

    userSignUp: function(){
      new App.Views.SignUpView();
    },

    userLogin: function(){
      new App.Views.LoginView();
    },

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

      var c = new App.Models.Rider({
        name: $('#rider_name').val(),
        home_address: $('#rider_home').val(),
        work_address: $('#rider_work').val()
      });

       
      var addy_home =  $('#rider_home').val();
      var addy_work =  $('#rider_work').val();

      // Get our home coordinates
      window.getCoordinates(addy_home,
        function(coordinates_home) {

          // Set our home coordinates
          c.set('home_latlong', coordinates_home);

          // Get our work coordinates
          window.getCoordinates(addy_work,
            function(coordinates_work) {

              // Set our work coordinates
              c.set('work_latlong', coordinates_work);

              // Save our entire object
              c.save(null, {
                success: function () {
                  App.riders.add(c);
                  App.router.navigate('', { trigger: true });
                }
            });
          });

        }
      );





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

(function(){

  App.Views.SignUpView = Parse.View.extend({

    events: {

      'submit #signUp' : 'addUser'
    },
    initialize: function(){
      this.render();

      $('#signUpField').html(this.$el);
    },

    render: function(){
      this.$el.html($('#SignUpTemp').html());
    },

    addUser: function(e){
      e.preventDefault();
      var user = new Parse.User({
      username: $('#signUpUser').val(),
      password: $('#signUpPassword').val()

      });
      user.signUp(null, {
        success: function(user) {
          App.router.navigate('', {trigger: true});
          $('#signUpField').hide();
        }
        // error: function(user, error) {
        // //   // Show the error message somewhere and let the user try again.
        //    alert("Error: " + error.code + " " + error.message);
        //  }
      });
    
    }
  });
}());

(function(){

  App.Views.LoginView = Parse.View.extend({
    //classNAme???
    events: {
      'submit #login' : 'userLogin'
      //'click .js-btn' : 'userLogin'
    },
    initialize: function(){
      this.render();

      $('#loginField').html(this.$el);

    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#loginTemp').html());
    },

    userLogin: function(e) {
      e.preventDefault();

      var username = $('#username').val();
      var password = $('#password').val();


      Parse.User.logIn(username, password, {
        success: function (user) {
          App.user = user;
          App.router.navigate('', {trigger: true});
          console.log('were logged in');
        

        }
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


    // Update User
  App.updateUser = function (){
    App.user = Parse.User.current();
    var currUsr;
    if (App.user == null){
      currUsr = '';
      //$('#logOut').text('Log In');
    } else {
      currUsr = 'Welcome ' + App.user.attributes.username;
    //  $('#logOut').text('Log Out');
    }
    $('#loggedIn').html(currUsr);
  };
  App.updateUser();

}());

var geocoder;
var map;
var Data = {};




function initialize() {

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // getYogaStudios(function (data){
  //   var studios = data.studios;
  //   var studio, latLng;
  //
  //   for (i in studios) {
  //     studio = studios[i];
  //     latLng = new google.maps.LatLng(studio.latitude, studio.longitude);
  //
  //     var marker = new google.maps.marker({
  //       position: latLng,
  //       map: map,
  //       title: studio.name
  //     });
  //   }
  //
  // })


App.riders.fetch({

 success: function(collection) {
       console.log(collection.models)


    collection.each(function(object) {


       }); //end of for each
     } //end of success
   }); //end of app.riders.fetch
} //end of initialize



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
