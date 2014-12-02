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
      collection = App.riders.models;

      //rider = App.riders.model;
      //console.log(t + " has been added");
    },

     findDistance: function (rider) {

     var  a, c, dm, dk, mi, km;
     var Rm = 3961; var Rk = 6373;
     var x2 = rider.attributes.home_latlong[0];
     var y2 = rider.attributes.home_latlong[1];
     var x1 = currentUser.attributes.home_latlong[0]
     var y1=  currentUser.attributes.home_latlong[1]

     var deg2rad = function(deg) {
       rad = deg * Math.PI/180; // radians = degrees * pi/180
       return rad;

     }

    var dlat= deg2rad(x2) - deg2rad(x1);
    var dlon= deg2rad(y2) - deg2rad(y1);

    var round = function(x) {
          return Math.round( x * 1000) / 1000;
    }

    // here's the heavy lifting
    a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(x1) * Math.cos(y1) * Math.pow(Math.sin(dlon/2),2);
    c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
    dm = c * Rm; // great circle distance in miles
    dk = c * Rk; // great circle distance in km

    mi = round(dm);
    km = round(dk);

    console.log(rider.attributes.name + 'is ' + km + ' km away');

    //   var lat1, lon1, lat2, lon2;
    //
    //   lat1 = deg2rad(this.get('home_latlong')[0]);
    //   lon1 = this.get('home_latlong')[1];
    //   lat2 = rider.get('home_latlong')[0];
    //   ....
    //   return {miles: mi, kilometers: km};
      }



// currentUser.findDistance2(collection[4])
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
      'matches': 'matches',
      'allriders/:riderID': 'riderProfile',
      'myCommute' : 'myCommute',
      'edit/:riderID' : 'editRider',
      'add' : 'addRider',
      'signUp' : 'userSignUp',
      'login' : 'userLogin'

    },

    home: function () {
    //  new App.Views.PublicListRiders({ collection: App.riders });
      //new App.Views.ListRiders({ collection: App.riders });
        new App.Views.HomeView();
    },

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

(function(){

  App.Views.HomeView = Parse.View.extend({
    //classNAme???
    events: {

    },

    initialize: function(){
      this.render();

      $('#riderList').html(this.$el);

    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#homeTemp').html());
    }



    //}

  });
}());

(function () {

  App.Views.riderProfileListing = Parse.View.extend({

    tagName: 'ul',
    className: 'riderprofileSingle',

    events: {
      // 'submit #updateRider' : 'updateRider',
      // 'click #delete' : 'deleteRider'
    },

    template: _.template($('#riderprofileTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();



      // Get our Element On Our Page
      $('#riderList').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.rider.toJSON()));

    }

    // updateRider: function (e) {
    //   e.preventDefault();
    //
    //   // Update our Model Instance
    //   this.options.rider.set({
    //     name: $('#update_name').val(),
    //     home_address: $('#update_home_address').val(),
    //     work_address: $('#update_work_address').val()
    //   });
    //
    //   // Save Instance
    //   this.options.rider.save();
    //
    //
    //   App.router.navigate('', {trigger: true});
    //
    // },
    //
    // deleteRider: function (e) {
    //   e.preventDefault();
    //
    //   // Remove Coffee
    //   this.options.rider.destroy();
    //
    //   // Go home ET
    //   App.router.navigate('', {trigger: true});
    //
    // }

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


    var addy_home =  $('#update_home_address').val();
    var addy_work =  $('#update_work_address').val();

    var x = this.options.rider;
    window.getCoordinates(addy_home, function(coordinates_home){

    // Set our home coordinates
    x.set('home_latlong', coordinates_home);

      //Get our work coordinates
      window.getCoordinates(addy_work, function(coordinates_work){

        //set work coordinates
      x.set('work_latlong', coordinates_work);

        //save object
        x.save();
        App.router.navigate('', {trigger: true});
      });


    });

      // Save Instance
      //this.options.rider.save();


    //  App.router.navigate('', {trigger: true});

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

      var fileUploadControl = $("#profilePhotoFileUpload")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = "photo.jpg";

          var parseFile = new Parse.File(name, file);
        }
      parseFile.save()


      var c = new App.Models.Rider({
        name: $('#rider_name').val(),
        home_address: $('#rider_home').val(),
        work_address: $('#rider_work').val(),
        picture: parseFile,
        user: App.user


      });

       // Set Access Control List
      //c.setACL(new Parse.ACL(App.user));

      var postACL = new Parse.ACL(Parse.User.current());
      postACL.setPublicReadAccess(true);
      c.setACL(postACL);

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
                  App.updateUser();
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

      //this.render();

      this.collection.off();
      this.collection.on('sync', this.riderQuery, this);

      // Get our Element On Our Page
      $('#riderList').html(this.$el);

      //render our page
      this.riderQuery();
    },

    riderQuery: function(){
      var self= this;

      //query parse for specific rider per user
      var user_rider = new Parse.Query(App.Models.Rider);
      user_rider.equalTo('user', App.user);
      user_rider.find({
        success: function (results) {
          self.collection = results;
          self.render();

        }
        

      });
    },

    render: function () {
      var self = this;

      // Empty out
      this.$el.empty();

      var local_collection = this.collection;
      if (this.options.sort != undefined) {
        // Setting up a localized collection to sort by our sort param
         local_collection = _.sortBy(this.collection, function (model){
          return model[self.options.sort];
        });
      }
       //else {
      //    local_collection = _.sortBy(this.collection, function (model){
      //     return -parseInt(model.rating);
      //   });
       //
      //  }
        _.each(local_collection, function (c) {
          self.$el.append(self.template(c.toJSON()));
       });
        // Sort from our default comparator in our collection constructor

        // this.collection.each(function (c) {
        //
        //   var profilePhoto = c.get("picture");
        //
        //   var imageURL = profilePhoto.url();
        //
        //   $('.profilepic').src = imageURL;
        //
        //   self.$el.append(self.template(c.toJSON()));
        // });

      return this;

      }


  });

}());

(function () {

  App.Views.PublicListRiders = Parse.View.extend({

    tagName: 'ul',
    className: 'allpublicRiders',

    events: {},

    template: _.template($('#publiclistTemp').html()),

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

          var profilePhoto = c.get("picture");

          var imageURL = profilePhoto.url();

          $('.profilepic').src = imageURL;

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

      $('#riderList').html(this.$el);
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
          App.user = user;

          App.router.navigate('add', {trigger: true});
          $('#signUpField').hide();
        },
         error: function(user, error) {
        // //   // Show the error message somewhere and let the user try again.
           alert("Error: " + error.code + " " + error.message);
          }
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

      $('#riderList').html(this.$el);

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
          $('#pattern').show();
          $('.topnavlinks').hide();
          $('#logOut').show();
          //$('#loginField').hide();
          console.log('were logged in');
        },
        error: function(user, error) {
       // //   // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
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




$('#distance_calc').on('click', function (e) {
  e.preventDefault();

  currentUser.findDistance2(collection[2]);

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

//App.addButton();

}());

/*
var other_users = _.filter(App.users, {id: App.user.id});
var results = _.map(other_users, function(other) {
  App.currentUser.find_distance(other);
});

function find_distance(other) {
// Magic happens here.
  var distance = ...?
  return {user: other.name, distance: distance};
}

var neighbors = _.filter(results, function(x) {
  if(x.distance < 5) return true;
});
*/
var geocoder;
var map;
var Data = {};
var CurrentUser;
var currentUser;
var findDistance;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  collection = App.riders.models;

/**********define our current user*********** this is global*******/
currentUser = App.riders.find( function (a) {
    return a.attributes.user.id == App.user.id;
  });


var currentUserData = currentUser.attributes.home_latlong;

x1=((currentUserData)[0])
y1=((currentUserData)[1])


var Rm = 3961;
var Rk = 6373;
var otherUserData;

    findDistance2 = function(otherUser) {

    var dlat, dlon, a, c, dm, dk, mi, km;
    /* define our other user*/
    otherUserDataLat = otherUser.attributes.home_latlong[0];
    otherUserDataLong = otherUser.attributes.home_latlong[1];
    dlat= deg2rad(otherUserDataLat) - deg2rad(x1);
    dlon= deg2rad(otherUserDataLong) - deg2rad(y1);

		// here's the heavy lifting
		a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(x1) * Math.cos(otherUserDataLat) * Math.pow(Math.sin(dlon/2),2);
		c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
		dm = c * Rm; // great circle distance in miles
		dk = c * Rk; // great circle distance in km

		// round the results down to the nearest 1/1000
		mi = round(dm);
		km = round(dk);
    alert(mi + ' mi');
	  console.log(km + ' km');
}
	// convert degrees to radians
	function deg2rad(deg) {
		rad = deg * Math.PI/180; // radians = degrees * pi/180
		return rad;
	}
	// round to the nearest 1/1000
	function round(x) {
		return Math.round( x * 1000) / 1000;
	}

//end initialize
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


