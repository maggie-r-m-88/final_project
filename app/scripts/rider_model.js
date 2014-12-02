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


    //   return {miles: mi, kilometers: km};
      }



  });

}());
