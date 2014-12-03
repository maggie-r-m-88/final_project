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


      //console.log(t + " has been added");
    },

     findDistance: function (rider, location) {

     var  a, c, dm, dk, mi, km;
     var Rm = 3961; var Rk = 6373;
     var coords_property;

     if (location == 'home') {
       coords_property = 'home_latlong';
     } else {
       coords_property = 'work_latlong';
     }

     var x2 = rider.get(coords_property)[0];
     var y2 = rider.get(coords_property)[1];
     var x1 = currentUser.get(coords_property)[0];
     var y1=  currentUser.get(coords_property)[1];

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
    
    //console.log(rider.attributes.user.id + ' is the user ID ');
    return { username: rider.get('name'),
             miles: mi,
             kilometers: km,
             work: rider.get('work_address'),
             userId: rider.attributes.user.id,
             objectId: rider.id,
             picture: rider.attributes.picture._url


             };
      }




  });

}());
