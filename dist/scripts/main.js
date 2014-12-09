(function () {

  App.Models.Rider = Parse.Object.extend({

    className: 'Rider',

    idAttribute: 'objectId',

    defaults: {
      name: '',
      work_address: '',
      home_address: '',
      home_neighborhood: '',
      work_neighborhood: '',
      info: '',
      linked_in: '',
      twitter: '',
      employer: ''

    },

    initialize: function () {
      var t = this.get('name');
      collection = App.riders.models;


      //console.log(t + " has been added");
    },

     findDistance: function (rider) {

     var  a, c, dm, dk, mi, km;
     var  a1, c1, dm1, dk1, mi1, km1;

     var Rm = 3961; var Rk = 6373;

    var x2= rider.attributes.home_latlong[0];
    var y2= rider.attributes.home_latlong[1];
    var x1= currentUser.attributes.home_latlong[0];
    var y1= currentUser.attributes.home_latlong[1];

    var k2= rider.attributes.work_latlong[0];
    var j2= rider.attributes.work_latlong[1];
    var k1= currentUser.attributes.work_latlong[0];
    var j1= currentUser.attributes.work_latlong[1];


     var deg2rad = function(deg) {
       rad = deg * Math.PI/180; // radians = degrees * pi/180
       return rad;
     }

    var dlat= deg2rad(x2) - deg2rad(x1);
    var dlon= deg2rad(y2) - deg2rad(y1);

    var dlat1= deg2rad(k2) - deg2rad(k1);
    var dlon1= deg2rad(j2) - deg2rad(j1);

    var round = function(x) {
          return Math.round( x * 10) / 10;
    }

    // here's the heavy lifting
    a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(x1) * Math.cos(y1) * Math.pow(Math.sin(dlon/2),2);
    c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
    dm = c * Rm; // great circle distance in miles
    dk = c * Rk; // great circle distance in km

    mi = round(dm);
    km = round(dk);

    // here's the heavy lifting
    a1  = Math.pow(Math.sin(dlat1/2),2) + Math.cos(k1) * Math.cos(j1) * Math.pow(Math.sin(dlon1/2),2);
    c1  = 2 * Math.atan2(Math.sqrt(a1),Math.sqrt(1-a1)); // great circle distance in radians
    dm1 = c1 * Rm; // great circle distance in miles
    dk1 = c1 * Rk; // great circle distance in km


    mi1 = round(dm1);
    km1 = round(dk1);



    //console.log(rider.attributes.user.id + ' is the user ID ');
    return { username: rider.get('name'),
             miles: mi,
             work_miles: mi1,
             kilometers: km,
             work_kilometers: km1,
             work_latlong: rider.get('work_latlong'),
             work: rider.get('work_address'),
             userId: rider.attributes.user.id,
             objectId: rider.id,
             picture: rider.attributes.picture._url
             };
      },

      sendMessage: function (rider) {
        var collection = App.riders.models;
        console.log( 'Hello ' + rider.attributes.name + ' I am ' + currentUser.attributes.name);
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
        new App.Views.HomeView();
    },

    // hoods: function(){
    //
    //   new App.Views.HomeSearchView();
    //
    // },


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

(function(){

  App.Views.matchesView = Parse.View.extend({

  //tagName: 'ul'  ,
  //className: 'myMatches',
    events: {
       'click #matchesCalc' : 'matchesCalc',
       'click #filter' : 'filter'
    },

    initialize: function(){
      this.render();

      $('#riderList').html(this.$el);
      collection = App.riders.models;

    //google maps template initialize//
    // function initialize() {
    //   geocoder = new google.maps.Geocoder();
    //   var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
    //   var mapOptions = {
    //     zoom: 10,
    //     center: latlng
    //   }
    //   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //
    //   collection = App.riders.models;
    //
    // /**********define our current user*********** this is global*******/
    // currentUser = App.riders.find( function (a) {
    //     return a.attributes.user.id == App.user.id;
    //   });
    //
    //
    //      }
    //
    // google.maps.event.addDomListener(window, 'load', initialize);
    //
    // geocoder = new google.maps.Geocoder();


    window.getCoordinates = function ( address, callback) {
      var coordinates;

      geocoder.geocode({ address: address}, function (results, status){
         coords_obj = results[0].geometry.location;
         coordinates = [coords_obj.k, coords_obj.B];
         callback(coordinates);
      })

    }
    //end google maps intialize

    },

    filter: function(filternumber){
      filternumber = $('#filternumber').val();

      $('.testresults').empty();

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

      //sort by will go here
      function isBigEnough(element) {
             return element.miles >  0 && element.miles < filternumber
                     && element.work_miles < filternumber ;

          }
      var homefilter = sorted.filter(isBigEnough);
      console.log(homefilter);
      if (homefilter.length === 0) {
        $('.testresults').append("<li>" + 'No Current Matches Found' + "</li>");
      };

    var neighbors = _.each(homefilter, function(x) {
     $('.testresults').append("<li class='matcher'>" + "<a href='"+ '#/allriders/' + x.objectId +"' >"  + "<p class='stats'>"+'Home:  ' + x.miles +'mi' +'    '+ 'Work:  ' +  x.work_miles + 'mi' + "</p>" + "<img class='matchpic' src='" + x.picture + "'/>" + "<h3>" + x.username + "</h3>" +   "</a>" + "</li>");
     });


    }
    ,
    matchesCalc: function(){



    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#matchesTemp').html());
    }



  });
}());

(function () {

  App.Views.riderProfileListing = Parse.View.extend({

    tagName: 'ul',
    className: 'allRiders',

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

    //  var user_email = App.user.attributes.email;
    //  console.log(user_email);

    },

    render: function () {

      this.$el.empty();

      App.currentUser = App.riders.find( function (a) {
            return a.attributes.user.id == App.user.id;
          });
       console.log(App.currentUser.attributes.info);

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
    className: 'allRiders',

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
        email: $('#update_email').val(),
        info: $('#update_info').val(),
        home_address: $('#update_home_address').val(),
        work_address: $('#update_work_address').val(),
        home_neighborhood: $('#update_home_hood').val(),
        work_neighborhood: $('#update_work_hood').val()
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
        App.router.navigate('#/myCommute', {trigger: true});
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

      $('#homeSearch').html(this.$el);
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
        //name: App.user.attributes.name,
        home_address: $('#rider_home').val(),
        work_address: $('#rider_work').val(),
        info: $('#rider_info').val(),
        home_neighborhood:$('#rider_home_neighborhood').val(),
        work_neighborhood:$('#rider_work_neighborhood').val(),
        picture: parseFile,
        employer: $('#rider_employer').val(),
        linked_in: $('#rider_linked_in').val(),
        user: App.user,
        email: App.user.attributes.email

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

      $('#homeSearch').html(this.$el);
    },

    render: function(){
      this.$el.html($('#SignUpTemp').html());
    },

    addUser: function(e){
      e.preventDefault();
      var user = new Parse.User({
      username: $('#signUpEmail').val(),
      email: $('#signUpEmail').val(),
      password: $('#signUpPassword').val()
      //name: $('#signUpN')
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

      $('#homeSearch').html(this.$el);

    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#loginTemp').html());
    },

    userLogin: function(e) {
      e.preventDefault();

      var username = $('#email').val();
      //var email = $('#email').val();
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

// (function(){
//
//   App.Views.HoodSearchView = Parse.View.extend({
//     //classNAme???
//     events: {
//
//     },
//
//     initialize: function(){
//       this.render();
//
//       $('#homeSearch').html(this.$el);
//
//     },
//
//     render: function(){
//       this.$el.empty();
//       this.$el.html($('#homeTemp').html());
//     }
//
//
//
//
//   });
// }());


Parse.initialize("ZlXURNfISFDfQJfjyDJITna1XYOTSsJiH3EVw1Sv", "NM4JnHAME4e35LZKbq1sVIcw0Lu9dO9Bo5qZ5UqY");

(function () {

  // Create Instance of Collection
  App.riders = new App.Collections.Riders();

  // Fetch any server-side coffees
  App.riders.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

        var collection = App.riders.models
  });


$('#logout2').on('click', function (e) {
  e.preventDefault();
  Parse.User.logOut();
  App.updateUser();
  console.log('user has logged out');
  //$('.topnavlinks').show();
  App.router.navigate('', {trigger: true});
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

var geocoder;
var map;
var marker_array = [
    ['maggie', 33.848688, -84.37332900000001],
    ['tim', 33.848688, -84.37332900000001],
    ['erin', 33.8460287, -84.3718806]
  ];



  window.getCoordinates = function ( address, callback) {
    var coordinates;

    geocoder.geocode({ address: address}, function (results, status){
       coords_obj = results[0].geometry.location;
       coordinates = [coords_obj.k, coords_obj.B];
       callback(coordinates);
    });
  }

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

     var found_points = _.map(found, function(item){
      return item.get('work_latlong')

  });
   console.log(found_points);


    function showMap() {
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
      var mapOptions = {
        zoom: 12,
        center: latlng
      }
      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

       var markersset = _.each(found_points, function (x) {

        var latlng = new google.maps.LatLng(x[0], x[1]);
        new google.maps.Marker({
        position: latlng,
        map: map
                });

            });

    }

    showMap();

}); //homeSearch  neighborhooods thing



}());

/*
function find_distance(other) {
// Magic happens here.
  var distance = ...?
  return {user: other.name, distance: distance};
}

var neighbors = _.filter(results, function(x) {
  if(x.distance < 5) return true;
});
// var results = _.map(collection, function(other) {
//   currentUser.findDistance(other);
// });
// console.log(results);
*/

var geocoder;
var map;
var Data = {};
var CurrentUser;
var currentUser;
var findDistance;

// function initialize() {
//    geocoder = new google.maps.Geocoder();
//    var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
//    var mapOptions = {
//      zoom: 10,
//      center: latlng
//    }
//    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//
//    collection = App.riders.models;
//
// /**********define our current user*********** this is global*******/
// currentUser = App.riders.find( function (a) {
//     return a.attributes.user.id == App.user.id;
//   });
//
//       }
//
// google.maps.event.addDomListener(window, 'load', initialize);

 geocoder = new google.maps.Geocoder();


window.getCoordinates = function ( address, callback) {
  var coordinates;

  geocoder.geocode({ address: address}, function (results, status){
     coords_obj = results[0].geometry.location;
     coordinates = [coords_obj.k, coords_obj.B];
     callback(coordinates);
  })

}


